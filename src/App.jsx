import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../src/App.module.css";
import CourseSelect from "./component/CourseSelect.jsx";
import Field from "./component/Field.jsx";
import { fetchPeople, savePeople, updatePersonField } from "./redux/peopleSlice.js";
function App() {
  const dispatch = useDispatch();
  const { people, person, isLoading, saveStatus } = useSelector((state) => state.people);
  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);
  const onInputChange = ({ name, value }) => {
    dispatch(updatePersonField({ name, value }));
  };
  const validate = () => {
    if (!person.name || !person.email) return true;
    return false;
  };
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (validate()) return;
    const updatedPeople = [...people, person];
    dispatch(savePeople(updatedPeople));
  };
  const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.mainContainer}>
      <h1>Sign Up Sheet</h1>
      <form onSubmit={onFormSubmit} className={styles.formContainer}>
        <Field className={styles.nameField}
          placeholder="Name"
          name="name"
          value={person.name}
          onChange={onInputChange}
          validate={(val) => (val ? false : "Name Required")}
        />
        <br />
        <Field  className={styles.emailField}
          placeholder="Email"
          name="email"
          value={person.email}
          onChange={onInputChange}
          validate={(val) => (isEmail(val) ? false : "Invalid Email")}
        />
        <br />
        <CourseSelect
          department={person.department}
          course={person.course}
          onChange={onInputChange}
        />
        <br />
        {{
          SAVING: <input className={styles.submitButton } value="Saving..." type="submit" disabled />,
          SUCCESS: <input className={styles.submitButton } value="Saved!" type="submit" disabled />,
          ERROR: <input className={styles.submitButton } value="Save Failed - Retry?" type="submit" disabled={validate()} />,
          READY: <input className={styles.submitButton } value="Submit" type="submit" disabled={validate()} />,
        }[saveStatus]
        }
      </form>

      <div className={styles.listContainer}>
        <h3>People</h3>
        <ul>
          {people.map(({ name, email, department, course }, i) => (
            <li key={i}>{[name, email, department, course].join(" - ")}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
