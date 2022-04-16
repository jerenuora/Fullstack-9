import React from 'react';
import {  HealthCheckEntry, HealthCheckRating } from '../types';
import { Field, Formik, Form } from 'formik';
import {  useStateValue } from '../state';

import { DiagnosisSelection, TextField, HealthOption, SelectFieldHealth } from '../AddPatientModal/FormField';
import { Grid, Button } from '@material-ui/core';
export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }
const HealthOptions: HealthOption[] = [
  { value: HealthCheckRating['Healthy'] , label: "Healthy" },
  { value: HealthCheckRating['LowRisk'], label: "LowRisk" },
  { value: HealthCheckRating['HighRisk'], label: "HighRisk" },
  { value: HealthCheckRating['CriticalRisk'], label: "CriticalRisk" },
];
export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating['Healthy'],

      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ dirty, isValid, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
             <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
             <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectFieldHealth label="Health" name="healthCheckRating" options={HealthOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
                <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>

            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
