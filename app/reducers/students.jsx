import axios from "axios";

const GET_STUDENTS = "GET_STUDENTS";
const POST_STUDENT = "POST_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";
const DELETE_STUDENTS = "DELETE_STUDENTS";
const PUT_STUDENT = "PUT_STUDENT";

const getStudents = students => ({
  type: GET_STUDENTS,
  students
});

const putStudent = student => ({
  type: PUT_STUDENT,
  student
});

const postStudent = student => ({
  type: POST_STUDENT,
  student
});

const deleteStudent = student => ({
  type: DELETE_STUDENT,
  student
});

const deleteStudents = campusId => ({
  type: DELETE_STUDENTS,
  campusId
});

export const fetchStudents = () => {
  return dispatch => {
    return axios
      .get("/api/students")
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      })
      .catch(console.error);
  };
};

export const postStudentThunk = (student, history) => {
  return dispatch => {
    return axios
      .post("/api/students", student)
      .then(res => {
        return res.data;
      })
      .then(newStudent => {
        const action = postStudent(newStudent);
        dispatch(action);
        history.push(`/students/${newStudent.id}`);
      })
      .catch(console.error);
  };
};

export const deleteStudentThunk = studentId => {
  return dispatch => {
    return axios
      .delete(`/api/students/${studentId}`)
      .then(student => {
        student.id = +studentId;
        const action = deleteStudent(student);
        dispatch(action);
      })
      .catch(console.error);
  };
};

export const deleteStudentsThunk = campusId => {
  return dispatch => {
    const action = deleteStudents(+campusId);
    dispatch(action);
  };
};

export const putStudentThunk = student => {
  return dispatch => {
    return axios
      .put(`/api/students/${student.id}`, student)
      .then(res => {
        return res.data;
      })
      .then(newStudent => {
        const action = putStudent(newStudent);
        dispatch(action);
      })
      .catch(console.error);
  };
};

const studentsReducer = (students = [], action) => {
  switch (action.type) {
    case PUT_STUDENT:
      const otherStudents = students.filter(
        student => student.id !== action.student.id
      );
      return [action.student, ...otherStudents];
    case GET_STUDENTS:
      return action.students;
    case POST_STUDENT:
      return [action.student, ...students];
    case DELETE_STUDENTS:
      return students.filter(student => student.campusId !== action.campusId);
    case DELETE_STUDENT:
      return students.filter(student => student.id !== action.student.id);
    default:
      return students;
  }
};

export default studentsReducer;
