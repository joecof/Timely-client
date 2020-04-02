import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import EmployeeInfo from "./EmployeeInfo";
import BasicInfo from "./BasicInfo";
import ChangePassword from "./ChangePassword";

const styles = () => ({
  container: {
    width: "1300px",
    // height: "600px",
    display: "flex",
    justifyContent: "center"
  },
  root: {
    width: "1000px"
  },
  paper: {
    boxShadow: "none",
    border: "solid 1px lightgray",
    borderRadius: "5px"
  },
  divider: {
    margin: "45px 0",
    height: "420px"
  },
  employeeInfoContainer: {
    display: "flex"
  }
});

class EmployeeForm extends Component {
  render() {
    const { classes, loadedUser } = this.props;
    console.log(loadedUser);

    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={2}>
            <div className={classes.employeeInfoContainer}>
              <EmployeeInfo loadedUser={this.props.loadedUser} />
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <BasicInfo loadedUser={this.props.loadedUser} />
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <ChangePassword loadedUser={this.props.loadedUser} />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeForm);
