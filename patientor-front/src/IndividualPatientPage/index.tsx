import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const IndividualPatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatient = async () => {
          if (id ){
          const patient = patients[id];
          if (!patient?.ssn) {
            try {
              const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
              );
              dispatch(updatePatient(patientFromApi ));
          } catch (e) {
            console.error(e);
          }
        }}
        };
        void fetchPatient();
      }, [patients]);

    if (id && patients && Object.keys(patients).length !== 0){
        const patientToShow = patients[id];
        return (
            <div className="App">
                <h2>{patientToShow?.name} {patientToShow?.gender === "male" 
                ? <>{'\u2642'}</>
                : patientToShow?.gender === "other" ? <>{'\u263F'}</> : <>{'\u2640'}</>}</h2>
                <p>
                ssn: {patientToShow?.ssn}
                <br />
                occupation: {patientToShow?.occupation}
                </p>
            </div>
            );
    }
    return <div>No Patient</div>;
};

export default IndividualPatientPage;