import React, { useState } from 'react'

const Field = ({ placeholder, name, value, validate, onChange }) => {
  const [state, setState] = useState({
    value: value,
    error: false
  });
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  return (
    <div>
      <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      />
      <span style={{ color: 'red' }}>{state.error }</span>
    </div>
  )
}
Field.PropTypes = {
    placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func.isRequired
}


export default Field