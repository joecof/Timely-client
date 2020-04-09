import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import "./SideMenu.css";

import DashboardIcon from "@material-ui/icons/Dashboard";
/**
 * Material UI styling JSON object.
 * @param {JSON} theme
 */
const styles = (theme) => ({
  menuItem: {
    // paddingLeft: theme.spacing(1.4),
    // paddingTop: theme.spacing(0.5),
    // paddingBottom: theme.spacing(0.5),
  },
  text: {
    color: "white",
    marginLeft: 50,
    fontSize: "14px",
    fontWeight: "300",
    letterSpacing: "1.5px"
    // font: '14px, Roboto, Helvetica, Arial, sans-serif',
  },
  link: {
    textDecoration: "none",
  },
});

/**
 * Author: Lawrence
 * Version: 1.0
 * Description: MenuItem Component. Component for each menu item.
 */
class MenuItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    const iconFilter = (icon) => {
      switch(icon) {
        case "Dashboard":
          return (<DashboardIcon className="itemIcon"/>)
        case "Timesheet": 
          return (<ListAltIcon className="itemIcon"/>)
        case "Projects":
          return (<AssignmentIcon className="itemIcon"/>)
        default:
          return (<DashboardIcon className="itemIcon"/>)
      }
    }

    return (
      <div className="menuItems">
        <Link className={classes.link} to={this.props.link}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.menuItem}
          >
            <Grid item>
              {iconFilter(this.props.text)}
            </Grid>
            <Grid item onClick={this.props.handleClick}>
              <b>
                {this.props.text && this.props.resize ? (
                  <p className={classes.text}> {this.props.text} </p>
                ) : null}
              </b>
            </Grid>
          </Grid>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MenuItem);
