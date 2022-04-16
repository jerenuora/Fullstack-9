import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setEntry, updatePatient, useStateValue } from '../state';
import axios from 'axios';
import AddEntryModal  from '../AddEntryModal/index';
import {
  Patient,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from '../types';
import { apiBaseUrl } from '../constants';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;


const IndividualPatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const { id } = useParams<{ id: string }>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
      const { data: newEntry } = await axios.post<Entry[]>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      
      const patientToEnter = patients[id];
      patientToEnter?.entries.concat(newEntry);
      if (patientToEnter){
      dispatch(setEntry(patientToEnter));}}
      closeModal();
      window.location.reload();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      if (id) {
        const patient = patients[id];
        if (!patient?.ssn) {
          try {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(updatePatient(patientFromApi));
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    void fetchPatient();
  }, [patients]);

  if (id && patients && Object.keys(patients).length !== 0) {
    const patientToShow = patients[id];
    return (
      <div className="App">
        <h2>
          {patientToShow?.name}{' '}
          {patientToShow?.gender === 'male' ? (
            <>{'\u2642'}</>
          ) : patientToShow?.gender === 'other' ? (
            <>{'\u263F'}</>
          ) : (
            <>{'\u2640'}</>
          )}
        </h2>
        <p>
          ssn: {patientToShow?.ssn}
          <br />
          occupation: {patientToShow?.occupation}
        </p>
        <h3>Entries</h3>

        {patientToShow?.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitNewEntry} 
        onClose={closeModal} />

      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

      </div>

    );
  }
  return <div>No Patient</div>;
};
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};
const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card variant="outlined">
      <CardContent>
        <div key={entry.id}>
          <Typography variant="h5" component="div">
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
          Doctor: {entry.specialist}
        </div>
      </CardContent>
    </Card>
  );
};
const OccupationalEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
    <Card variant="outlined">
      <CardContent>
        <div key={entry.id}>
          <Typography variant="h5" component="div">
            {entry.date} <WorkIcon /> 
          </Typography>
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
        </div>
        {entry.sickLeave !== undefined ? (
          <>
            {' '}
            Sick leave from: {entry.sickLeave?.startDate} to:{' '}
            {entry.sickLeave?.endDate}
          </>
        ) : (
          <></>
        )}
        <br />
        Doctor: {entry.specialist}
      </CardContent>
    </Card>
    </div>
  );
};
const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card variant="outlined">
      <CardContent>
        <div key={entry.id}>
          <Typography variant="h5" component="div">
            {entry.date} <HealthAndSafetyIcon />
          </Typography>

          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
          {entry.healthCheckRating === 0 ? (
            <MonitorHeartIcon />
          ) : entry.healthCheckRating === 1 ? (
            <HeartBrokenIcon />
          ) : entry.healthCheckRating === 2 ? (
            <FavoriteBorderIcon />
          ) : (
            <FavoriteIcon />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default IndividualPatientPage;
