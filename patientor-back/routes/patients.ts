import toNewPatient from '../utils';

import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patientInfo = patientService.findById(req.params.id)
  return patientInfo ? res.send(patientInfo) : res.sendStatus(400)
}); 

router.post('/',(req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const patientToAdd = toNewPatient({...req.body, entries: []});
    const addedPatient = patientService.addPatient(patientToAdd);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

