import patients from '../data/patients';
import {
  Patient,
  SecurePatient,
  NewPatient,
  PublicPatient,
  Entry,
  NewEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): SecurePatient => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patientEntry: NewPatient): Patient => {
  const patientToBeAdded = {
    id: uuid(),
    ...patientEntry,
    entries: [],
  };

  patients.push(patientToBeAdded);
  return patientToBeAdded;
};

const addEntry = ({
  id,
  entry,
}: {
  id: string;
  entry: NewEntry;
}): Entry | undefined => {
  const patient = patients.find((p) => p.id === id);
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  if (patient) {
    patient?.entries.push(newEntry);
  }
  return newEntry;
};

console.log(addEntry);

const findById = (id: string): PublicPatient | null => {
  const patient = patients.find((p) => p.id === id);
  return patient ? { ...patient } : null;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry,
};
