export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export enum EntryTypes  {
    Hospital = 'Hospital',
    OccupationalHealthcare ='OccupationalHealthcare',
    HealthCheck = 'HealthCheck'
}
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
export interface sickLeave {
    startDate: string;
    endDate: string;
}
export interface discharge {
    date: string;
    criteria: string;
}
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: sickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: discharge;
}
export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
  }


export type SecurePatient = Omit<Patient, 'ssn'>[];

export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type BaseEntryWOId = Omit<BaseEntry, 'id'>;
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
