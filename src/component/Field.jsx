import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
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
      <input
      placeholder={placeholder}
      value={state.value}
      onChange={handleChange}
      />
      <span style={{ color: 'red' }}>{state.error }</span>
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