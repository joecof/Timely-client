import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from './MenuItem'
import ExpansionMenu from './ExpansionMenu/ExpansionMenu'
import constants from '../../constants/contants'

/**
 * Defined breaking points for drawer size (side menu) upon resizing. 
 */
const drawerExpandedWidth = constants.DRAWER_EXPANDED_WIDTH;
const drawerShrinkedWidth = constants.DRAWER_SHRINKED_WIDTH;

/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    width: drawerExpandedWidth,
    height: '100%',
  },
  divider: {
    backgroundColor: 'light gray',
    width: '90%',
    margin: '0 auto'
  },
  drawerOpen: {
    width: drawerExpandedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    width: drawerShrinkedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  }
});

  /**
   * Author: Lawrence 
   * Version: 1.0 
   * Description: SideMenu component for dashboard navigation. 
   */
  class SideMenu extends Component {

    render() {
      const { classes } = this.props;

      return(
        <div className={classes.root}>
          <CssBaseline />
          <Drawer 
            variant="permanent" 
            open = {true} 
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.props.resize,
              [classes.drawerClose]: !this.props.resize
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.props.resize,
                [classes.drawerClose]: !this.props.resize
              })
            }}
            >
            <MenuItem isMenuLogo = {true} />
            <Divider className={classes.divider} />
            <ExpansionMenu loadedUser = {this.props.loadedUser} resize = {this.props.resize} />
            <Divider className={classes.divider}/>
            <div>
              <MenuItem text = "Dashboard" resize = {this.props.resize} link = "/dashboard"/>
              <MenuItem text = "Timesheet" resize = {this.props.resize} link = "/dashboard/timesheet"/>
              <MenuItem text = "Projects" resize = {this.props.resize} link = "/dashboard/projects"/>
            </div>
          </Drawer>
        </div>
      )
    }
  }

export default withStyles(styles, { withTheme: true })(SideMenu);