import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from '../component/Field.module.css'
const Field = ({ placeholder, name, value, validate, onChange }) => {
  const [state, setState] = useState({
    value: value,
    error: false
  });
  useEffect(() => {
    setState(prev => ({ ...prev, value }));
  }, [value]);
  
    const handleChange = (evt) => {
    const newValue = evt.target.value;
    const error = validate ? validate(newValue) : false;
    setState({ value: newValue, error });
    onChange({ name, value: newValue, error });
  };
  return (
    <div>
      <input className={styles.inputField}
      placeholder={placeholder}
      value={state.value}
      onChange={handleChange}
      />
     
      <span className={ styles.err}>{state.error }</span>
    </div>
  )
}
Field.propTypes = {
    placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func.isRequired
}


export default Field