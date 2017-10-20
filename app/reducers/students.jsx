import axios from "axios";

const GET_STUDENTS = "GET_STUDENTS";
const POST_STUDENT = "POST_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";
const DELETE_STUDENTS = "DELETE_STUDENTS";
const PUT = "PUT_STUDENT";

function getStudents(students) {
  return {
    type: GET_STUDENTS,
    students
  };
}

const put = student => ({ type: PUT, student });

function postStudent(student) {
  return {
    type: POST_STUDENT,
    student
  };
}

function deleteStudent(student) {
  return {
    type: DELETE_STUDENT,
    student
  };
}

function deleteStudents(campusId) {
  return {
    type: DELETE_STUDENTS,
    campusId
  };
}

export function fetchStudents() {
  return function(dispatch) {
    return axios
      .get("/api/students")
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  };
}

export function postStudentThunk(student, history) {
  return function(dispatch) {
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
      .catch(console.log);
  };
}

export function deleteStudentThunk(studentId, history) {
  return function(dispatch) {
    return axios
      .delete(`/api/students/${studentId}`)
      .then(student => {
        student.id = +studentId;
        const action = deleteStudent(student);
        dispatch(action);
      })
      .catch(console.error);
  };
}

export function deleteStudentsThunk(campusId) {
  return function(dispatch) {
    const action = deleteStudents(+campusId);
    dispatch(action);
  };
}

export function putStudentThunk(student, history) {
  return function(dispatch) {
    return axios
      .put(`/api/students/${student.id}`, student)
      .then(res => {
        return res.data;
      })
      .then(newStudent => {
        const action = put(newStudent);
        console.log(action);
        dispatch(action);
      })
      .catch(console.log);
  };
}

const studentsReducer = function(students = [], action) {
  switch (action.type) {
    case PUT:
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
