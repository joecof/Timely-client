import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

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
    marginLeft: 50,
    color: "white",
    letterSpacing: "1.5px"
    // fontWeight: "400"
    // font: '14px, Roboto, Helvetica, Arial, sans-serif',
  },
  link: {
    textDecoration: "none",
  },
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: ExpansionMenuHeader component. Menu item component for each item on the expansion menu.
 */
class ExpansionMenuItem extends Component {
  render() {
    const { classes } = this.props;

    const iconFilter = (icon) => {
      switch(icon) {
        case "Lead Engineer":
          return (<EqualizerIcon className="itemIcon"/>)
        case "HR": 
          return (<PeopleAltIcon className="itemIcon"/>)
        case "Supervisor":
          return (<AssignmentIndIcon className="itemIcon"/>)
        case "Approver":
          return (<PlaylistAddCheckIcon className = "itemIcon"/>)
        default:
          return (<DashboardIcon className="itemIcon"/>)
      }
    }

    return (
      <div className="menuItems" id=(this.props.text)>
        <Link className={classes.link} to={this.props.link}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.menuItem}
          >
            <Grid item>
              {/* {this.props.isMenuLogo ? 
              <Avatar variant="circle" className={classes.avatar} src = {logo}/> : <Avatar variant="square" className={classes.avatar}/>} */}

              {/* <DashboardIcon className="itemIcon" /> */}
              {iconFilter(this.props.text)}
            </Grid>
            <Grid item onClick={this.props.handleClick}>
                {this.props.text && this.props.resize ? (
                  <p className={classes.text}> {this.props.text} </p>
                ) : null}
            </Grid>
          </Grid>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuItem);
