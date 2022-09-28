import EditorLink from './EditorLink';

const AppointmentForm = () => {
  return (
    <div>
      Edit{' '}
      <EditorLink path="src/components/AppointmentForm.tsx">
        "src/components/AppointmentForm.tsx"
      </EditorLink>{' '}
      to implement Appointment form feature.
    </div>
  );
};

export default AppointmentForm;
