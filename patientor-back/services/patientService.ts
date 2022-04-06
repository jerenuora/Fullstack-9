import patients from '../data/patients';
import { Patient, SecurePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): SecurePatient => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patientEntry: NewPatient ): Patient => {
    const patientToBeAdded = {
        id: uuid(),
        ...patientEntry
    };

    patients.push(patientToBeAdded);
    return patientToBeAdded;
};

export default {
    getPatients,
    addPatient
};