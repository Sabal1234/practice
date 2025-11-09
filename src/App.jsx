import { useEffect, useState } from "react";
import styles from "../src/App.module.css";
import apiClient from "./api/apiClient.js";
import CourseSelect from "./component/CourseSelect.jsx";
import Field from "./component/Field.jsx";
function App() {
  const [state, setState] = useState({
    fields: {
      name: "",
      email: "",
      course: null,
      department:null
    },
    fieldErrors: {},
    people: [],
    _loading: false,
    _saveStatus:'READY'
  });
    useEffect(() => {
    setState((prev) => ({ ...prev, _loading: true }));
    apiClient.loadPeople().then((people) => {
      setState((prev) => ({
        ...prev,
        _loading: false,
        people: people,
      }));
    });
  }, []);

  const onInputChange = ({ name, value, error }) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: value,
      },
      fieldErrors: {
        ...prev.fieldErrors,
        [name]: error,
      },
          _saveStatus: 'READY',
    }));
  };

  const validate = () => {
    const { fields, fieldErrors } = state;
    const errMessages = Object.keys(fieldErrors).filter(
      (k) => fieldErrors[k]
    );
    if (!fields.name) return true;
    if (!fields.email) return true;
    if (errMessages.length) return true;
    return false;
  };

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (validate()) return;

  const person = state.fields;
  const people = [...state.people, person];

  setState((prev) => ({
    ...prev,
    _saveStatus: "SAVING",
  }));

  apiClient
    .savePeople(people)
    .then(() => {
      setState((prev) => ({
        ...prev,
        people,
        fields: { name: "", email: "", course: null, department: null },
        _saveStatus: "SUCCESS",
      }));
    })
    .catch((err) => {
      console.error(err);
      setState((prev) => ({
        ...prev,
        _saveStatus: "ERROR",
      }));
    });
};


  const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
  if (state._loading) {
    return <h1>Loading</h1>
  }

  return (
    
    <div className={styles.mainContainer}>
      <h1>Sign Up Sheet</h1>
      <form onSubmit={onFormSubmit} className={styles.formContainer}>
        <Field className={styles.nameField}
          placeholder="Name"
          name="name"
          value={state.fields.name}
          onChange={onInputChange}
          validate={(val) => (val ? false : "Name Required")}
        />
        <br />
        <Field className={styles.emailField}
          placeholder="Email"
          name="email"
          value={state.fields.email}
          onChange={onInputChange}
          validate={(val) => (isEmail(val) ? false : "Invalid Email")}
        />
        <br />
         <CourseSelect
        department={state.fields.department}
        course={state.fields.course}
        onChange={onInputChange}
        />
        <br />
        {
  {
    SAVING: <input className={styles.submitButton} value="Saving..." type="submit" disabled />,
    SUCCESS: <input className={styles.submitButton} value="Saved!" type="submit" disabled />,
    ERROR: (
      <input
        className={styles.submitButton}
        value="Save Failed - Retry?"
        type="submit"
        disabled={validate()}
      />
    ),
    READY: (
      <input
        className={styles.submitButton}
        value="Submit"
        type="submit"
        disabled={validate()}
      />
    ),
  }[state._saveStatus]
}

      </form>

      <div className={styles.listContainer}>
        <ul>
          {state.people.map(({ name, email, department, course }, i) => (
            <li key={i}>
              {[name, email, department, course].join(' - ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
