import { Link } from '@material-ui/core';
import Section from 'components/Section';
import NextLink from 'next/link';

const Home = () => {
  return (
    <div className="home page">
      <h1>Maiia's technical test</h1>
      <Section name="instructions" title="Instructions">
        <p>
          You have just joined the Maiia Pro team as a front-end developper,
          your first mission is to implement two crucial features for the
          success of the company.{' '}
        </p>
        <p>Here are the features to implement:</p>
        <ul>
          <li>Appointments creation form</li>
          <li>List of appointments</li>
        </ul>
        <p>
          First, visit the time slots page where you will find an exemple of
          implementation, explanations about the libraries used in this project
          and informations about the file structure.
        </p>
        <p>
          Then, you can start working on the appointment page where you will
          find all specifications and the tasks to achieve as well as the
          components to implement.
        </p>
      </Section>
      <Section name="timeslots" title="Time slots">
        <NextLink href="/timeslots">
          <div className="cta">
            <p>
              <Link>Let's take a look at the time slots page</Link>
            </p>
          </div>
        </NextLink>
      </Section>
      <Section name="appointments" title="Appointments">
        <NextLink href="/appointments">
          <div className="cta">
            <p>
              <Link>Let's work on appointments</Link>
            </p>
          </div>
        </NextLink>
      </Section>
    </div>
  );
};

Home.pageTitle = 'Test technique Maiia';

export default Home;
