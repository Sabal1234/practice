import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from '../component/CourseSelect.module.css'
const CourseSelect = ({ department: propDepartment, course: propCourse, onChange }) => {
  const [department, setDepartment] = useState(propDepartment || null);
  const [course, setCourse] = useState(propCourse || null);

  useEffect(() => {
    setDepartment(propDepartment);
    setCourse(propCourse);
  }, [propDepartment, propCourse]);

  const handleDepartmentChange = (evt) => {
    const selectedDept = evt.target.value;
    setDepartment(selectedDept);
    setCourse(null);
    onChange({ name: 'department', value: selectedDept });
  };

  const handleCourseChange = (evt) => {
    const selectedCourse = evt.target.value;
    setCourse(selectedCourse);
    onChange({ name: 'course', value: selectedCourse });
  };

  return (
    <div className={styles.container }>
      <select className={styles.departmentOptionList} value={department || ''} onChange={handleDepartmentChange}>
        <option value="">Select Department</option>
        <option value="BCA">BCA</option>
        <option value="CSIT">CSIT</option>
      </select>
      <br />
      <select className={styles.courseOptionList}
        value={course || ''}
        onChange={handleCourseChange}
        disabled={!department }
      >
        <option value="">Select Course</option>
        <option value="Mathmetic">Mathmetic</option>
        <option value="AI">AI</option>
        <option value="C-programming">C-programming</option>
        <option value="Dot Net">Dot Net</option>
      </select>
    </div>
  );
};

CourseSelect.propTypes = {
  department: PropTypes.string,
  course: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CourseSelect;
