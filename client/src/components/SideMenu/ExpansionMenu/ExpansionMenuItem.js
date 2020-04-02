import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Link } from "react-router-dom";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  text: {
    color: "black"
  },
  link: {
    textDecoration: "none"
  },
  expansionPanelDetails: {
    display: "flex",
    padding: "10px 0 0 30px"
  },
  avatarRoleContainer: {
    display: "flex",
    alignItems: "center"
  },
  avatarContainer: {
    margin: "0 15px 0 0"
  },
  roleContainer: {

  }
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: ExpansionMenuHeader component. Menu item component for each item on the expansion menu.
 */
class ExpansionMenuItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Link className={classes.link} to={this.props.link}>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <div className={classes.avatarRoleContainer}>
            <div className={classes.avatarContainer}>
              <Avatar variant="circle" className={classes.avatar} />
            </div>
            <div className={classes.roleContainer}>
              {this.props.resize ? (
                <p className={classes.text}>{this.props.text}</p>
              ) : null}
            </div>
          </div>
        </ExpansionPanelDetails>
      </Link>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuItem);
