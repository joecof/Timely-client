import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import TimesheetPortal from '../TimesheetPortal/TimesheetPortal'
import TimesheetDetail from '../TimesheetDetail/TimesheetDetail'
import HrPortal from '../HrPortal/HrPortal'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Projects from '../ProjectsPortal/ProjectsHome/Projects'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import DashboardPortal from '../DashboardPortal/DashBoardPortal'
import SupervisorPortal from '../SupervisorPortal/SupervisorPortal'
import AssignToProject from '../SupervisorPortal/AssignToProject'
import ProjectsAssignedTo from '../SupervisorPortal/ProjectsAssignedTo'
import EmployeeForm from '../Profile/EmployeeForm'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import LeadEngineer from '../LeadEngineerPortal/LeadEngineer'

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
    switch (this.props.config.option) {
      case 'dashboard':
        routes = (
          <Switch>
            <Route
              path="/dashboard/timesheet"
              exact
              render={props => (
                <TimesheetPortal
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/timesheet/:id"
              exact
              render={props => (
                <TimesheetDetail
                  loadedUser={this.props.config.loadedUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/hr"
              exact
              render={props => (
                <HrPortal
                  loadedUser={this.props.config.loadedUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/hr/:id"
              exact
              render={props => (
                <EmployeeForm
                  loadedUser={this.props.config.loadedUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor"
              exact
              render={props => (
                <SupervisorPortal
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor/assign"
              exact
              render={props => (
                <AssignToProject
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor/:id"
              exact
              render={props => (
                <ProjectsAssignedTo
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/profile/:id"
              exact
              render={props => (
                <EmployeeForm
                  loadedUser={this.props.config.loadedUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/profile"
              exact
              render={props => (
                <EmployeeForm
                  loadedUser={this.props.config.loadedUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/projects"
              exact
              render={props => (
                <Projects
                  {...props}
                />
              )}
            />
            <Route
              path="/createProject"
              exact
              render={props => (
                <ProjectCreate
                  {...props}
                />
              )}
            />
            <Route
              path="/projectDetails"
              exact
              render={props => (
                <ProjectDetail
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/lead"
              exact
              render={props => (
                <LeadEngineer
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/:id"
              exact
              render={props => (
                <DashboardPortal
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
              render={props => (
                <Login
                  {...props}
                  loginHandler={this.props.config.loginHandler}
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
              render={props => (
                <Dashboard
                  {...props}
                  logoutHandler={this.props.config.logoutHandler}
                  loadedUser={this.props.config.loadedUser}
                  breadCrumbs={this.props.config.breadCrumbs}
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
              render={props => (
                <Login
                  {...props}
                  loginHandler={this.props.config.loginHandler}
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
