import diagonoseData from '../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagonoseData;

const getDiagnoses = () => {
    return diagnoses;
};

export default {
    getDiagnoses
};