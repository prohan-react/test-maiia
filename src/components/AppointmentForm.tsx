import { Box, Grid, Typography } from '@material-ui/core';
import { Practitioner, Patient } from '@prisma/client';
import { Formik, Form, Field } from 'formik';
import config from 'config';
import { useMemo, useState } from 'react';
import { groupBy } from 'lodash';

interface AppointmentFormProps {
  practitioners: Practitioner[];
  patients: Patient[];
}

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');

const AppointmentForm = ({ practitioners, patients }: AppointmentFormProps) => {
  const [availabilities, setAvailabilities] = useState([]);

  const availabilitiesGroupedByDays = useMemo(() => {
    const newAvailabilities = groupBy(availabilities, (availability) => {
      return availability.startDate.slice(0, 10);
    });
    return newAvailabilities;
  }, [availabilities]);

  return (
    <div style={{ marginTop: 20 }}>
      <Formik
        initialValues={{
          practitionerId: '',
          patientId: '',
          selectedDay: '',
          timeSlotId: '',
        }}
        validate={(values) => {
          const errors = {};
          if (values.practitionerId === '') {
            errors.practitionerId = 'Champ requis';
          }
          if (values.patientId === '') {
            errors.patientId = 'Champ requis';
          }
          if (values.selectedDay === '') {
            errors.selectedDay = 'Champ requis';
          }
          if (values.timeSlotId === '') {
            errors.timeSlotId = 'Champ requis';
          }
          return errors;
        }}
        onSubmit={(values) => {
          const parsedTimeSlot = parseInt(values.timeSlotId);
          const selectedAvailability = availabilities.find(
            (item) => item.id === parsedTimeSlot,
          );
          const valuesForService = {
            patientId: values.patientId,
            practitionerId: values.practitionerId,
            startDate: selectedAvailability.startDate,
            endDate: selectedAvailability.endDate,
          };
          fetch(`${SERVER_API_ENDPOINT}/appointments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(valuesForService),
          });
        }}
      >
        {({ errors, handleChange, values }) => (
          <Form>
            <Grid container spacing={2} style={{ alignItems: 'flex-start' }}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '40px',
                  }}
                >
                  <Typography variant="body1">Praticien</Typography>
                  <Field
                    name="practitionerId"
                    as="select"
                    style={{ width: '100%' }}
                    onChange={async (e) => {
                      handleChange(e);
                      const response = await fetch(
                        `${SERVER_API_ENDPOINT}/availabilities?practitionerId=${e.target.value}`,
                      );
                      const parsedResponse = await response.json();
                      setAvailabilities(parsedResponse);
                    }}
                  >
                    <option disabled hidden value="" />
                    {practitioners.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{`${
                          item.firstName
                        } ${item.lastName.toUpperCase()} : ${
                          item.speciality
                        }`}</option>
                      );
                    })}
                  </Field>
                  <Typography style={{ color: 'red' }} variant="caption">
                    {errors.practitionerId}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '40px',
                  }}
                >
                  <Typography variant="body1">Patient</Typography>
                  <Field name="patientId" as="select" style={{ width: '100%' }}>
                    <option disabled hidden value="" />
                    {patients.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{`${
                          item.firstName
                        } ${item.lastName.toUpperCase()}`}</option>
                      );
                    })}
                  </Field>
                  <Typography style={{ color: 'red' }} variant="caption">
                    {errors.patientId}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '40px',
                  }}
                >
                  <Typography variant="body1">Jour</Typography>
                  <Field
                    name="selectedDay"
                    as="select"
                    style={{ width: '100%' }}
                  >
                    <option disabled hidden value="" />
                    {Object.keys(availabilitiesGroupedByDays).map((item) => {
                      const options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      };
                      const itemToDate = new Date(item);
                      const dateToString = itemToDate.toLocaleDateString(
                        undefined,
                        options,
                      );

                      return (
                        <option key={item} value={item}>
                          {dateToString}
                        </option>
                      );
                    })}
                  </Field>
                  <Typography style={{ color: 'red' }} variant="caption">
                    {errors.selectedDay}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    height: '40px',
                    marginTop: 30,
                  }}
                >
                  <Typography variant="body1">Heure</Typography>
                  <Field
                    name="timeSlotId"
                    as="select"
                    style={{ width: '100%' }}
                  >
                    <option disabled hidden value="" />
                    {values.selectedDay !== '' &&
                      availabilitiesGroupedByDays[values.selectedDay].map(
                        (item) => {
                          const options = {
                            hour: '2-digit',
                            minute: '2-digit',
                          };
                          const itemToDate = new Date(item.startDate);
                          const dateToString = itemToDate.toLocaleDateString(
                            undefined,
                            options,
                          );

                          return (
                            <option key={item.id} value={item.id}>
                              {`${dateToString.slice(
                                11,
                                13,
                              )}h${dateToString.slice(14, 16)}`}
                            </option>
                          );
                        },
                      )}
                  </Field>
                  <Typography style={{ color: 'red' }} variant="caption">
                    {errors.timeSlotId}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <button
              type="submit"
              style={{ width: 300, alignSelf: 'center', marginTop: 100 }}
            >
              Valider le rendez-vous
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
