import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const CourseSelect = ({ department: propDepartment, course: propCourse, onChange }) => {
const [department, setDepartment] = useState(propDepartment || null);
const [course, setCourse] = useState(propCourse || null);
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
setDepartment(propDepartment);
setCourse(propCourse);
}, [propDepartment, propCourse]);


const handleDepartmentChange = (evt) => {
const selectedDept = evt.target.value;
setDepartment(selectedDept);
    setCourse(null);
    onChange({name:'department',value:selectedDept})
};

const handleCourseChange = (evt) => {
const selectedCourse = evt.target.value;
setCourse(selectedCourse);
onChange({ name: 'course', value: selectedCourse });
};

const renderDepartmentSelect = () => (
<select value={department || ''} onChange={handleDepartmentChange}> <option value="">Select Department</option> <option value="BCA">BCA</option> <option value="CSIT">CSIT</option>
 </select>
);

const renderCourseSelect = () => (
<select value={course || ''} onChange={handleCourseChange} disabled={!department || loading}> <option value="">Select Course</option><option value="Mathmetic">Mathmetic</option><option value='AI'>AI</option><option value='C-programming'>C-programmin</option><option value='Dot Net'>Dot Net</option>
{courses.map((c) => (
<option key={c.id || c} value={c.id || c}>
{c.name || c} </option>
))} </select>
);

return ( <div>
{renderDepartmentSelect()} <br />
{renderCourseSelect()} </div>
);
};

CourseSelect.propTypes = {
department: PropTypes.string,
course: PropTypes.string,
onChange: PropTypes.func.isRequired,
};

export default CourseSelect;
