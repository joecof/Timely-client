import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "./MenuItem";
import ExpansionMenu from "./ExpansionMenu/ExpansionMenu";
import { NAVBAR_PARAMETERS } from "../../constants/constants";
import sideBarBackgroundImage from "../../images/sideBarBackgroundImage.png";

/**
 * Defined breaking points for drawer size (side menu) upon resizing.
 */
const drawerExpandedWidth = NAVBAR_PARAMETERS.DRAWER_EXPANDED_WIDTH;
const drawerShrinkedWidth = NAVBAR_PARAMETERS.DRAWER_SHRINKED_WIDTH;

/**
 * Material UI styling JSON object.
 * @param {JSON} theme
 */
const styles = theme => ({
  root: {
    display: "flex",
    backgroundSize: "cover",
    backgroundImage: "url(" + sideBarBackgroundImage + ")"
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    width: drawerExpandedWidth,
    height: "100%"
  },
  divider: {
    backgroundColor: "light gray",
    width: "90%",
    margin: "0 auto"
  },
  drawerOpen: {
    backgroundColor: "transparent !important",
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
    })
  },
  paper: {
    // backgroundSize: "cover",
    // backgroundImage: "url(" + sideBarBackgroundImage + ")"
  }
});

/**
 * Author: Lawrence
 * Version: 1.0
 * Description: SideMenu component for dashboard navigation.
 */
class SideMenu extends Component {
  render() {
    const { classes, loadedUser } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={true}
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
          {/* <MenuItem isMenuLogo = {true} />
          <Divider className={classes.divider} /> */}
          <ExpansionMenu
            loadedUser={this.props.loadedUser}
            resize={this.props.resize}
          />
          <Divider className={classes.divider} />
          <div>
            <MenuItem
              text="Dashboard"
              resize={this.props.resize}
              link={`/dashboard/${loadedUser.employee_id}`}
            />
            <MenuItem
              text="Timesheet"
              resize={this.props.resize}
              link="/dashboard/timesheet"
            />
            <MenuItem
              text="Projects"
              resize={this.props.resize}
              link="/dashboard/projects"
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SideMenu);
