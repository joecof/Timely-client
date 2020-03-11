import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import { withStyles } from '@material-ui/core/styles';
import Timesheet from '../Timesheet/Timesheet'
import Projects from './components/ProjectsPortal/ProjectsHome/Projects';
import { BrowserRouter, Route, Switch} from "react-router-dom";


const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 10,
    padding: theme.spacing(5),
  },
  toolbar: theme.mixins.toolbar,
});

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      loaded_user: {},
      resize: true
    })

    this.resizeDashboard = this.resizeDashboard.bind(this);

  }

  resizeDashboard() {
    this.setState({
      resize: !this.state.resize
    })
  }

  render() {
    const { classes } = this.props;

    let routes = (
      <Switch>
        <Route
          path="/dashboard/timesheet"
          exact
          render = {props => (
            <Timesheet
              {...props}
              loginHandler = {this.loginHandler}
            />
          )}
        />
        <Route
          path="/projects"
          exact
          render = {props => (
            <Projects
              {...props}
            />
          )}
        />
      </Switch>
    );


    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Navbar 
            loadedUser = {this.props.loadedUser} 
            resizeDashboard = {this.resizeDashboard} 
            resize = {this.state.resize} 
            logoutHandler = {this.props.logoutHandler}/>
          <SideMenu 
            loadedUser = {this.props.loadedUser}  
            resizeDashboard = {this.resizeDashboard} 
            resize = {this.state.resize}/>
          <main className={classes.content}>
            <div className={classes.toolbar} />
              {routes}
          </main>
        </div>   
      </BrowserRouter>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
