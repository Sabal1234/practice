import { useState } from "react";

function App() {
  const [state, setState] = useState({
    fields: {
      name: "",
      email:"",
    },
    fieldErrors: {},
    people:[]
})

  const onInputChange = (evt) => {
     const { name, value } = evt.target;

    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,  // copy existing fields
        [name]: value    // update only the field being typed
      }
    }));
  };

  const onFormSubmit = (evt) => {
        evt.preventDefault();
    const person = state.fields;
    const fieldErrors = validate(person)
    if (Object.keys(fieldErrors).length > 0) {
    setState(prev => ({
        ...prev,
        fieldErrors
      }));
      return;
  }
     setState(prev => ({
       fields: { name: "", email: "" },
      fieldErrors: {}, // reset fields
      people: [...prev.people, person] // add new person
    }));
  };
const validate = (person) => {
const errors = {};
if (!person.name) errors.name = 'Name Required';
if (!person.email) errors.email = 'Email Required';
if (person.email && !isEmail(person.email)) errors.email = 'Invalid Email';
return errors;
};
const isEmail = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <div>
      <h1>Sign Up Sheet</h1>
      <form onSubmit={onFormSubmit}>
        <input
          placeholder="Name"
          name="name"
          value={state.fields.name}
          onChange={onInputChange}
        />
        <span style={{color: 'red'}}>{state.fieldErrors.name}</span>
        <br />
        <input
          placeholder="Email"
          name="email"
          value={state.fields.email}
          onChange={onInputChange}
        />
        <span style={{ color: "red" }}>{state.fieldErrors.email}</span>
        <br />
        <input type="submit" />
      </form>

      <div>
        <h3>People</h3>
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
