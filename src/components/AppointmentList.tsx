import EditorLink from './EditorLink';

const AppointmentList = () => {
  return (
    <div>
      Edit
      <EditorLink path="src/components/AppointmentList.tsx">
        "src/components/AppointmentForm.tsx"
      </EditorLink>{' '}
      to display the list of appointments.
    </div>
  );
};

export default AppointmentList;
