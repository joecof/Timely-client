import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Face from '../../Icon/Face'

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  text: {
    marginLeft: 30,
    color: "black"
  },
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
  }
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
        expandIcon={
              <ExpandMoreIcon className={classes.materialIconLight} />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.expansionPanelSummary}
      >
        <div className={classes.expansionMenuHeaderContainer}>
          <div className={classes.expansionMenuHeaderAvatar}>
            <Avatar variant="circle" className={classes.avatar} />
          </div>
          {this.props.resize ? (
            <div className={classes.expansionMenuHeaderProfileName}>
              {" "}
              {this.props.loadedUser.first_name +
                " " +
                this.props.loadedUser.last_name}{" "}
            </div>
          ) : null}
        </div>
      </ExpansionPanelSummary>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuHeader);
