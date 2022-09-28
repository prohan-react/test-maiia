import { Link } from '@material-ui/core';
import EditorLink from 'components/EditorLink';
import TimeSlots from 'components/TimeSlots';
import Section from 'components/Section';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSlots, timeslotsSelectors } from 'store/timeslots';

const TimeSlotPage = () => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) =>
    timeslotsSelectors.selectAll(state.timeslots),
  );

  useEffect(() => {
    dispatch(getTimeSlots());
  }, []);

  return (
    <div className="page">
      <section datacy="intro">
        <header>
          <h1>Welcome to the timeslot page</h1>
          <h2>
            A basic example of how we make Next.js and Redux work together
          </h2>
        </header>
        <article>
          <h3>File structure</h3>
          <section>
            <h4>Next.js</h4>
            <p>
              <Link href="https://nextjs.org/" target="_blank">
                Next.js
              </Link>{' '}
              is a{' '}
              <Link href="https://reactjs.org/" target="_blank">
                React
              </Link>{' '}
              framework that allows to create both server side and statically
              generated websites.
            </p>
            <p>
              Pages are defined in the "src/pages" folder. Next.js handles all
              the route definitions. For instance you can take a look at
              "/timeslots" page:{' '}
              <EditorLink path="src/pages/timeslots.tsx">
                "src/pages/timeslots.tsx"
              </EditorLink>
              .
            </p>
            <p>
              All the components (except for pages components) are defined in
              the "src/components" folder. For instance you can take a look at
              "TimeSlots.tsx" component:{' '}
              <EditorLink path="src/components/TimeSlots.tsx">
                "src/components/TimeSlots.tsx"
              </EditorLink>
              .
            </p>
          </section>
          <section>
            <h4>Backend</h4>
            <p>
              Our database is managed by Prisma which dynamically generates an
              embeded SQLite database, migrations and typings according to
              schema defined in{' '}
              <EditorLink path="prisma/schema.prisma">
                "prisma/schema.prisma"
              </EditorLink>
              .
            </p>
            <p>
              The endpoints are directly handled by Next.js and are defined in
              the "src/pages/api" directory. For instance you can take a look at
              "/timeslots" endpoint:{' '}
              <EditorLink path="src/pages/api/timeslots.ts">
                "src/pages/api/timeslots.ts"
              </EditorLink>
              .
            </p>
            <p>
              To restore the database, run "yarn seed-db" which is defined in{' '}
              <EditorLink path="package.json:13:54">"package.json"</EditorLink>.
            </p>
          </section>
          <section>
            <h4>Redux store</h4>
            <p>
              You can find everything related to the Redux store in the
              "src/store" directory.
            </p>
            <p>
              The store itself is exported from{' '}
              <EditorLink path="src/store/index.ts">
                "src/store/index.ts"
              </EditorLink>
              .
            </p>
            <p>
              We used{' '}
              <Link href="https://redux-toolkit.js.org/" target="_blank">
                @reduxjs/toolkit
              </Link>{' '}
              to spare some boilerplate code in the example "timeslot" slice
              (see{' '}
              <EditorLink path="src/store/timeslots.ts">
                "src/store/timeslots.ts"
              </EditorLink>{' '}
              for implementation). The library generates extensible reducers,
              actions, and selectors. Asynchronous side effects are handled by
              the{' '}
              <Link
                href="https://github.com/reduxjs/redux-thunk"
                target="_blank"
              >
                redux thunk middleware
              </Link>
              .
            </p>
            <p>
              In order to add a new reducer to your root reducer, add it to{' '}
              <EditorLink path="src/store/reducers.ts:4:32">
                "src/store/reducers.ts"
              </EditorLink>
              .
            </p>
          </section>
          <section>
            <h4>Tests</h4>
            <p>
              The end to end tests are implemented with{' '}
              <Link href="https://www.cypress.io/" target="_blank">
                Cypress
              </Link>{' '}
              and are defined in the "cypress/integration" directory. For
              instance you can take a look at the tests of the "/timeslots"
              page:{' '}
              <EditorLink path="cypress/integration/timeslots.spec.ts">
                "cypress/integration/timeslots.spec.ts"
              </EditorLink>
              .
            </p>
            <p>
              We added a custom cypress command named "pick". It queries one or
              several elements that have the attribute "datacy" matching the
              argument passed to the command. <br />
              Ex: cy.pick('timeslot-list') returns all elements which datacy
              attribute is equal to "timeslot-list". <br />
              The "pick" command is defined in
              <EditorLink path="cypress/support/commands.ts">
                "cypress/support/commands.ts"
              </EditorLink>
              .
            </p>
            <p>
              To execute the tests: run "yarn dev" to launch the app and in
              parallel in an other terminal tab run "yarn test" to launch
              Cypress.
            </p>
          </section>
        </article>
      </section>
      <Section
        name="timeslots"
        title="TimeSlot List"
        className="timeSlot__list"
      >
        <TimeSlots items={timeslots} />
      </Section>
    </div>
  );
};

TimeSlotPage.pageTitle = 'Time slots';
TimeSlotPage.pageSubtitle = 'A simple example';

export default TimeSlotPage;
