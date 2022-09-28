import faker from 'faker';
import prisma from './prisma/client';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function addDays(date, days) {
  return addMinutes(date, days * 1440);
}

function randomDate(inFuture = false) {
  const date = new Date();
  const year = inFuture
    ? randomIntFromInterval(2022, 2023)
    : randomIntFromInterval(2019, 2020);
  const month = randomIntFromInterval(0, 11);
  const day = randomIntFromInterval(1, 28);
  const hour = randomIntFromInterval(0, 23);
  date.setFullYear(year, month, day);
  date.setHours(hour);
  date.setMinutes(randomIntFromInterval(0, 11) * 5);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

const resetDb = async () => {
  await prisma.practitioner.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.timeslot.deleteMany();
};

const initPatients = async () => {
  for (let i = 0; i < 10; i++) {
    let dob = faker.date.past(
      50,
      new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)'),
    );
    dob = dob.getFullYear() + '-' + (dob.getMonth() + 1) + '-' + dob.getDate(); // First month is "1"

    await prisma.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthDate: new Date(dob),
      },
    });
  }
};

const speciality = ['Médecin Généraliste', 'Kinésithérapeute', 'Chirurgien'];

const initPractitioners = async () => {
  for (let i = 0; i < 3; i++) {
    await prisma.practitioner.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        speciality: speciality[i],
      },
    });
  }
};

const initAppointments = async () => {
  const patients = await prisma.patient.findMany();
  const practitioners = await prisma.practitioner.findMany();

  for (let i = 0; i < 5; i++) {
    const startDate = randomDate();

    await prisma.appointment.create({
      data: {
        patientId: patients[randomIntFromInterval(0, patients.length - 1)].id,
        practitionerId:
          practitioners[randomIntFromInterval(0, practitioners.length - 1)].id,
        startDate: startDate,
        endDate: addMinutes(startDate, 15),
      },
    });
  }
};

const initAvailabilities = async () => {
  const practitioners = await prisma.practitioner.findMany();

  const initialDate = randomDate(true);

  await Promise.all(
    practitioners.map(async (practitioner) => {
      // Generate availabilities for 5 days
      for (let i = 0; i < 5; i++) {
        const incrementedDayDate = addDays(initialDate, i);

        // Generate 10 availabilities / day
        for (let j = 0; j < 10; j++) {
          const incrementedMinuteDate = addMinutes(incrementedDayDate, j * 15);

          await prisma.availability.create({
            data: {
              practitionerId: practitioner.id,
              startDate: incrementedMinuteDate,
              endDate: addMinutes(incrementedMinuteDate, 15),
            },
          });
        }
      }
    }),
  );
};

const initTimeSlots = async () => {
  const practitioners = await prisma.practitioner.findMany();

  const initialDate = randomDate(true);

  await Promise.all(
    practitioners.map(async (practitioner) => {
      // Generate timeslots for 5 days
      for (let i = 0; i < 5; i++) {
        const incrementedDayDate = addDays(initialDate, i);

        // Generate 2 availabilities / day
        for (let j = 0; j < 2; j++) {
          const incrementedMinuteDate = addMinutes(incrementedDayDate, j * 60);

          await prisma.timeslot.create({
            data: {
              practitionerId: practitioner.id,
              startDate: incrementedMinuteDate,
              endDate: addMinutes(incrementedMinuteDate, 60),
            },
          });
        }
      }
    }),
  );
};

const main = async () => {
  await resetDb();
  await initPractitioners();
  await initPatients();
  await initAppointments();
  await initAvailabilities();
  await initTimeSlots();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
