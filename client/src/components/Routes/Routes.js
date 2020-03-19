import React, { Component } from 'react'
import {Route, Switch} from "react-router-dom";
import Timesheet from '../Timesheet/Timesheet'
import TimesheetDetail from '../TimesheetDetail/TimesheetDetail'
import HR from '../HR/HR'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Projects from '../ProjectsPortal/ProjectsHome/Projects'
import ProjectCreate from '../ProjectCreate/ProjectCreate'

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: Route component. All routing logic goes into this component. 
 * This component takes in a config object, with the key 'option' as a string 
 * that defines the routes that requires rendering. 
 */
export default class Routes extends Component {

  render() {
    let routes; 

    /**
     * A switch statement to render the correct routes depending on the option provided. 
     * this.props.config.option is a string that the developer passes into the Routes component 
     * in order to configure what routes they want rendered. 
     */
    switch(this.props.config.option) {
      case 'dashboard':
        routes = (
          <Switch>
            <Route
              path="/dashboard/timesheet"
              exact
              render = {props => (
                <Timesheet
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/timesheet/:id"
              exact
              render = {props => (
                <TimesheetDetail
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/hr"
              exact
              render = {props => (
                <HR
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/hr/employee/:id"
              exact
              render = {props => (
                <Profile
                  {...props}
                />
              )}
            />
          <Route
          path="/dashboard/Projects"
          exact
          render = {props => (
            <Projects
              {...props}
            />
          )}
        />
        <Route
          path="/createProject"
          exact
          render = {props => (
            <ProjectCreate
              {...props}
            />
          )}
        />
      </Switch>
        )
        break; 

      case 'login': 
        routes = (
          <Switch>
            <Route
              path="/"
              exact
              render = {props => (
                <Login
                  {...props}
                  loginHandler = {this.props.config.loginHandler}
                />
              )}
            />
          </Switch>
        );
        break;

      case 'authentication': 
        routes = (
          <Switch>
            <Route
              path="/dashboard"
              render= {props => (
                <Dashboard
                  {...props} 
                  logoutHandler = {this.props.config.logoutHandler}
                  loadedUser = {this.props.config.loadedUser}
                />
              )}
            />
          </Switch>
        )
        break;

      default: 
        routes = (
          <Switch>
            <Route
              path="/"
              exact
              render = {props => (
                <Login
                  {...props}
                  loginHandler = {this.props.config.loginHandler}
                />
              )}
            />
          </Switch>
        );
    }
    return (
      <div>
        {routes}
      </div>
    )
  }
}
