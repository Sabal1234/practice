import { useState } from "react";
import Field from "./component/Field.jsx";
import styles from "../src/App.module.css"
function App() {
  const [state, setState] = useState({
    fields: {
      name: "",
      email: "",
    },
    fieldErrors: {},
    people: [],
  });

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

    setState((prev) => ({
      fields: { name: "", email: "" },
      fieldErrors: {},
      people: [...prev.people, person],
    }));
  };

  const isEmail = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <div className={styles.mainContainer}>
      <h1>Enter your Name And Email</h1>
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
        <input className={styles.submitButton }type="submit" disabled={validate()} />
      </form>

      <div className={styles.listContainer}>
        <ul>
          {state.people.map(({ name, email }, i) => (
            <li key={i}>
              {name} ({email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
