import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  Diagnosis,
  discharge,
  sickLeave,
  HealthCheckRating,
  EntryTypes,
  BaseEntryWOId
} from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseEntries = (entry: unknown): Entry[] => {
  if (!entry || !isEntry(entry)) {
    throw new Error('Incorrect or missing entry ');
  }
  return entry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry[] => {
  console.log(param);
  return true;
};
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return newPatient;
};

type EntryFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge: unknown;
  employerName: unknown;
  sickLeave: unknown;
  healthCheckRating: unknown;
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  const type = entry.type;
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type ');
  }
  let baseEntry: BaseEntryWOId = {
    description: parseDesctiption(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
  }
  if (entry.diagnosisCodes ) {
    baseEntry.diagnosisCodes  = parseDiagnosisCodes(entry.diagnosisCodes)
    }
  
  switch (type) {
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(entry.discharge),
      };
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case 'OccupationalHealthcare':
      if (entry.sickLeave) {
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),
      };}
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(entry.employerName),
      };

    default:
      return assertNever(type);
  }
};
const parseDesctiption = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};
const isDiagnosisCodes = (
  diagnosisCodes: unknown
): diagnosisCodes is string[] => {
  console.log(diagnosisCodes);
  return true;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosiscodes ');
  }
  return diagnosisCodes;
};
const parseDischarge = (discharge: unknown): discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is discharge => {
  console.log(param);
  if (!param.date || !isString(param.date) || !param.criteria || !isString(param.criteria)) {
    throw new Error('Incorrect or missing discharge');
  }
  return true;

};
const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }
  return employerName;
};
const parseSickLeave = (sickLeave: unknown): sickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return sickLeave;
};
const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return healthCheckRating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is sickLeave => {
  console.log(param);
  if (!param.startDate || !isString(param.startDate) || !param.endDate || !isString(param.endDate)) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return true;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  console.log(param);
  return Object.values(HealthCheckRating).includes(param);
};
const isType = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param: any
): param is 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryTypes).includes(param);
};
