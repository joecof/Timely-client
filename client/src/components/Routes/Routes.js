import React, { Component } from 'react'
import {Route, Switch} from "react-router-dom";
import Timesheet from '../Timesheet/Timesheet'
import TimesheetDetail from '../TimesheetDetail/TimesheetDetail'
import HrPortal from '../HrPortal/HrPortal'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'

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
                <HrPortal
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard/hr/:id"
              exact
              render = {props => (
                <Profile
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
                  breadCrumbs = {this.props.config.breadCrumbs}
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
