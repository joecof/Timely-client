import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from './MenuItem'
import ExpansionMenu from './ExpansionMenu/ExpansionMenu'
import clsx from "clsx";

const drawerExpandedWidth = 230;
const drawerShrinkedWidth = 100;

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

  class SideMenu extends Component {

    constructor(props) {
      super(props);
    }

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
              <Divider />
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