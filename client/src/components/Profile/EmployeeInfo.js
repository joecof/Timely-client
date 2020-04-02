import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    marginTop: "20px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginTop: 30,
    marginBottom: 20,
    width: 100,
    height: 100,
    margin: "0 auto"
  },
  textContainer: {
    margin: "0 auto",
    width: 120,
    padding: 10
  },
  textHeader: {
    color: "gray"
  },
  text: {
    borderBottom: "1px solid lightgray"
  },
  textHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 10px 0"
  }
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: EmployeeInfo component.
 */
class EmployeeInfo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Avatar
          className={classes.avatar}
          alt="employee photo"
          src="https://api4u.azurewebsites.net/images/flintstone/fred.png"
        />
        <div className={classes.textContainer}>
          <div className={classes.textHeader}>Employee ID</div>
          <div className={classes.text}>
            {this.props.loadedUser.employee_id}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeInfo);
