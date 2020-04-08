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
import RemoveFromProject from '../SupervisorPortal/RemoveFromProject'
import AssignToProject from '../SupervisorPortal/AssignToProject'
import ProjectsAssignedTo from '../SupervisorPortal/ProjectsAssignedTo'
import EmployeeForm from '../Profile/EmployeeForm'
import CreateEmployeeForm from '../HrPortal/CreateEmployeeForm/CreateEmployeeForm'
import IterationPlanCreate from '../LeadEngineerDetail/IterationPlanCreate'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import LeadEngineer from '../LeadEngineerPortal/LeadEngineer'
import WorkpackageCreate from '../WorkpackageCreate/WorkpackageCreate';
import WorkpackageDetail from '../ProjectDetail/WorkpackageDetail'
import TimesheetApproverPortal from '../TimesheetApproverPortal/TimesheetApproverPortal';
import TimesheetsToApprove from '../TimesheetApproverPortal/TimesheetsToApprove';
import CheckTimesheet from '../TimesheetApproverPortal/CheckTimesheet';
import AssignApprover from '../TimesheetApproverPortal/AssignApprover';

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
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                />
              )}
            />
            <Route
              path="/dashboard/timesheet/:id"
              exact
              render={props => (
                <TimesheetDetail
                  loadedUser={this.props.config.loadedUser}
                  logoutHandler = {this.props.logoutHandler}
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
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
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/profile/:id"
              exact
              render={props => (
                <EmployeeForm
                  hr={false}
                  loadedUser={this.props.config.loadedUser}
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              exact path="/dashboard/hr/create"
              render={props => (
                <CreateEmployeeForm
                  hr = {true}
                  createEmployee = {true}
                  loadedUser={this.props.config.loadedUser}
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/hr/:id"
              exact
              render={props => (
                <EmployeeForm
                  hr = {true}
                  createEmployee = {false}
                  loadedUser={this.props.config.loadedUser}
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor"
              exact
              render={props => (
                <SupervisorPortal
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor/remove"
              exact
              render={props => (
                <RemoveFromProject
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor/assign"
              exact
              render={props => (
                <AssignToProject
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/supervisor/:id"
              exact
              render={props => (
                <ProjectsAssignedTo
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/tsapprover"
              exact
              render={props => (
                <TimesheetApproverPortal
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/tsapprover/assign"
              exact
              render={props => (
                <AssignApprover
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/tsapprover/:id"
              exact
              render={props => (
                <TimesheetsToApprove
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/tsapprover/:id/:tsid"
              exact
              render={props => (
                <CheckTimesheet
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/projects"
              exact
              render={props => (
                <Projects
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/createProject"
              exact
              render={props => (
                <ProjectCreate
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/projectDetails"
              exact
              render={props => (
                <ProjectDetail
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/createWorkpackage"
              exact
              render={props => (
                <WorkpackageCreate
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/workpackageDetail"
              exact
              render={props => (
                <WorkpackageDetail
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/newIterationPlan"
              exact
              render={props => (
                <IterationPlanCreate
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/lead"
              exact
              render={props => (
                <LeadEngineer
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/:id"
              exact
              render={props => (
                <DashboardPortal
                  sessionLogoutHandler = {this.props.config.sessionLogoutHandler}
                  token={this.props.token}
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
                  token={this.props.token}
                  {...props}
                  sessionLogoutHandler={this.props.config.sessionLogoutHandler}
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
