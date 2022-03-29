import diagonoseData from '../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagonoseData;

const getDiagnoses = () => {
    return diagnoses;
};

export default {
    getDiagnoses
};