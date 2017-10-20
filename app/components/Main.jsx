import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import store from "../store";
import Navbar from "./Navbar";
import Home from "./Home";
import SingleCampus from "./SingleCampus";
import SingleStudent from "./SingleStudent";
import Students from "./Students";
import Campuses from "./Campuses";
import AddStudent from "./AddStudent";
import AddCampus from "./AddCampus";
import { fetchStudents } from "../reducers/students";
import { fetchCampuses } from "../reducers/campuses";

export default class Main extends Component {
  componentDidMount() {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render() {
    return (
      <div className="container-fluid bg-light">
        <main>
          <Navbar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/campuses/:campusid" component={SingleCampus} />
            <Route exact path="/campuses" component={Campuses} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route exact path="/students" component={Students} />
            <Route path="/addcampus" component={AddCampus} />
            <Route path="/addstudent" component={AddStudent} />
            <Redirect to="/home" />
          </Switch>
        </main>
      </div>
    );
  }
}
