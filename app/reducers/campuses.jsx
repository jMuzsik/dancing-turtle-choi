import axios from "axios";

const GET_CAMPUSES = "GET_CAMPUSES";
const POST_CAMPUS = "POST_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const PUT_CAMPUS = "PUT_CAMPUS";

const getCampuses = campuses => ({
  type: GET_CAMPUSES,
  campuses
});

const postCampus = campus => ({
  type: POST_CAMPUS,
  campus
});

const putCampus = campus => ({
  type: PUT_CAMPUS,
  campus
});

const deleteCampus = campus => ({
  type: DELETE_CAMPUS,
  campus
});

export const fetchCampuses = () => {
  return dispatch => {
    return axios
      .get("/api/campuses")
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      })
      .catch(console.error);
  };
};
export const postCampusThunk = (newCampus, history) => {
  return dispatch => {
    return axios
      .post("/api/campuses", newCampus)
      .then(res => {
        return res.data;
      })
      .then(newCampus => {
        const action = postCampus(newCampus);
        dispatch(action);
        history.push(`/campuses/${newCampus.id}`);
      })
      .catch(console.error);
  };
};

export const putCampusThunk = campus => {
  return dispatch => {
    return axios
      .put(`/api/campuses/${campus.id}`, campus)
      .then(res => {
        return res.data;
      })
      .then(newCampus => {
        const action = putCampus(newCampus);
        dispatch(action);
      })
      .catch(console.error);
  };
};

export const deleteCampusThunk = campusId => {
  return dispatch => {
    return axios.delete(`/api/campuses/${campusId}`).then(campus => {
      campus.id = +campusId;
      const action = deleteCampus(campus);
      dispatch(action);
    });
  };
};

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
