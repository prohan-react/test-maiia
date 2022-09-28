import TaskList from './TaskList';
import { useState } from 'react';

type Props = {
  className?: string;
};

const AllTasks = (props: Props) => {
  const { className } = props;
  const [isAllAchievedTasksForm, setIsAllAchievedTasksForm] = useState(false);
  const [isAllAchievedTasksList, setIsAllAchievedTasksList] = useState(false);
  const [isAllAchievedTasksBonus, setIsAllAchievedTasksBonus] = useState(false);

  return (
    <div className={className}>
      <TaskList
        title="Tasks for Appointment Form"
        tasks={[
          'Show the list of practitioners and select one of them',
          'Show the list of patients and select one of them',
          'Show the availabities of the selected practitioner',
          "Choose the date and the time depending of the selected practitioner's availabities",
          'Validate and submit the form',
        ]}
        name="tasks-form"
        onComplete={setIsAllAchievedTasksForm}
      />
      <TaskList
        title="Tasks for Appointment List"
        tasks={[
          'Show the list of all appointments with all mandatory informations',
          'Show practitioner name for each appointment',
          'Update dynamically the list',
        ]}
        name="tasks-list"
        onComplete={setIsAllAchievedTasksList}
      />
      <TaskList
        title="Bonus tasks"
        tasks={[
          '🤖 Cypress: implement end to end test to assess that the app works as expected',
          '✏️ CRUD: enable CRUD operations on the appointment entity',
          '⚙️ Redux slice Generator: build a tool that automaticly generates redux slices including reducers/actions/selectors',
          '✨ Integration: make it shine',
          '🔎 Search: enable search on appointment, practitioner or patient. The solution can either be front-end only or a mix of front-end and back-end',
          `🎉 Something else that we didn't think of`,
        ]}
        expected={2}
        name="tasks-bonus"
        onComplete={setIsAllAchievedTasksBonus}
      />
      {isAllAchievedTasksForm &&
        isAllAchievedTasksList &&
        isAllAchievedTasksBonus && (
          <p>
            You finished the test, congratulation ! Before sending your project,
            make sure that everything works well and that your code is clean.
          </p>
        )}
    </div>
  );
};

export default AllTasks;
