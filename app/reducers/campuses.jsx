import axios from "axios";

const GET_CAMPUSES = "GET_CAMPUSES";
const POST_CAMPUS = "POST_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const PUT_CAMPUS = "PUT_CAMPUS";

function getCampuses(campuses) {
  return {
    type: GET_CAMPUSES,
    campuses
  };
}

function postCampus(campus) {
  return {
    type: POST_CAMPUS,
    campus
  };
}

function putCampus(campus) {
  return {
    type: PUT_CAMPUS,
    campus
  };
}

function deleteCampus(campus) {
  return {
    type: DELETE_CAMPUS,
    campus
  };
}
export function fetchCampuses() {
  return function(dispatch) {
    return axios
      .get("/api/campuses")
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}
export function postCampusThunk(newCampus, history) {
  return function(dispatch) {
    return axios
      .post("/api/campuses", newCampus)
      .then(res => {
        return res.data;
      })
      .then(newCampus => {
        const action = postCampus(newCampus);
        dispatch(action);
        history.push(`/campuses/${newCampus.id}`);
      });
  };
}

export function putCampusThunk(campus, history) {
  return function(dispatch) {
    return axios
      .put(`/api/campuses/${campus.id}`, campus)
      .then(res => {
        return res.data;
      })
      .then(newCampus => {
        const action = putCampus(newCampus);
        console.log(action);
        dispatch(action);
      })
      .catch(console.log);
  };
}

export function deleteCampusThunk(campusId, history) {
  return function(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`).then(campus => {
      campus.id = +campusId;
      const action = deleteCampus(campus);
      dispatch(action);
      history.push("/campuses");
    });
  };
}

const campusesReducer = function(campuses = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case POST_CAMPUS:
      return [action.campus, ...campuses];
    case DELETE_CAMPUS:
      return campuses.filter(campus => campus.id !== action.campus.id);
    case PUT_CAMPUS:
      const otherCampuses = campuses.filter(
        campus => campus.id !== action.campus.id
      );
      return [action.campus, ...otherCampuses];
    default:
      return campuses;
  }
};

export default campusesReducer;
