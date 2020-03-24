import React, { Component } from 'react'
import { BrowserRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import Container from '../Container/Container'
import Routes from '../Routes/Routes'


/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
});

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: Dashboard component. Home of the dynamic resizing navbar/sidemenu logic. 
 * Parent component of sidemenu/navbar/container. State is passed from here. 
 */
class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      loaded_user: {},
      resize: true, 
      breadCrumbs: this.props.location
    })

    this.resizeDashboard = this.resizeDashboard.bind(this);
  }


  /**
   * Resizes the navbar/sidemenu upon event. 
   */
  resizeDashboard() {
    this.setState({
      resize: !this.state.resize
    })
  }

  render() {
    const { classes } = this.props;

    let config = (name) => {
      return ({
        option: name,
        loadedUser: this.props.loadedUser
      })
    }
    /**
     * Defines all routes available to the dashboard.
     */
    let routes = <Routes { ...this.props} config = {config('dashboard')} />
    
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Navbar {...this.props.location }  loadedUser = {this.props.loadedUser} resizeDashboard = {this.resizeDashboard} resize = {this.state.resize} logoutHandler = {this.props.logoutHandler}/>
          <SideMenu  loadedUser = {this.props.loadedUser} resizeDashboard = {this.resizeDashboard} resize = {this.state.resize}/>
          <Container routes = {routes} />
        </div>   
      </BrowserRouter>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
