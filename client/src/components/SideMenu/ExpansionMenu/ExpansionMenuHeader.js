import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Face from '../../Icon/Face'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import '../SideMenu.css'
import { Link } from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import WidgetsIcon from '@material-ui/icons/Widgets';

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  expansionPanelSummary: {
    height: "180px",
    margin: "25px 0 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  expansionMenuHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: "80px",
    height: "80px",
    margin: "0 0 15px 0"
  },
  arrowIconLight: {
    // margin: "0 12px 0 0"
  },
  materialIconLight: {
    // margin: "0 12px 0 0"
  },
  text: {
    marginLeft: 50,
    color: 'white',
    letterSpacing: "1.5px"
    // font: '14px, Roboto, Helvetica, Arial, sans-serif',
  }, 
  link: {
    textDecoration: 'none',
  },
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: ExpansionMenuHeader component. Header component for the expansion menu.
 */
class ExpansionMenuHeader extends Component {
  render() {
    const { classes } = this.props;

    return (

    <ExpansionPanelSummary
      className="expansionHeader-menuItem"
    >
    
      <div className="menuItems" id="menuItems-expansionHeader">
        <Link className = {classes.link} to = { this.props.link }>
          <Grid container direction="row" alignItems="center" className = {classes.menuItem} >
            <Grid item >
              {/* {this.props.isMenuLogo ? 
                <Avatar variant="circle" className={classes.avatar} src = {logo}/> : <Avatar variant="square" className={classes.avatar}/>} */}
              
              <WidgetsIcon className="itemIcon"/>
              
            </Grid>
            <Grid item onClick = {this.props.handleClick}>
                <p className = {classes.text}>Portals </p>
            </Grid>
            <Grid item className="gridIcon">
              <ArrowDropDownIcon className={classes.materialIconLight} className="dropDown-arrow"/>
            </Grid>
          </Grid>
        </Link>
      </div>
     </ExpansionPanelSummary>

    );
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuHeader);