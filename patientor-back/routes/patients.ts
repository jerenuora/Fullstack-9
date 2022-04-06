/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/',(req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const patientToAdd = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
    });
  res.json(patientToAdd);
});

export default router;

