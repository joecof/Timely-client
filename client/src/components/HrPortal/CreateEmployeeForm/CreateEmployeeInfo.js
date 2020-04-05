import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    display: "flex",
    width: "250px",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    margin: "0 auto"
  },
  textContainer: {
    display: "flex",
    width: 135
  },
  textHeader: {
    color: "black",
    marginBottom: 10,
    marginTop: 10
  },
  textHeaderRole: {
    marginTop: 50,
    marginBottom: 25
  },
  text: {
    borderBottom: "1px solid lightgray"
  },
  faceIcon: {
    width: "100%",
    height: "100%"
  },
  switch: {
    color: "green",
    marginLeft: 100
  }
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: CreateEmployeeInfo component.
 */
class CreateEmployeeInfo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.container}>
          <Avatar className={classes.avatar} alt="employee photo">
            <FaceIcon className={classes.faceIcon} />
          </Avatar>
          <div className={classes.textContainer}>
            <div className={classes.textHeader}>Employee ID</div>
            <TextField
              className={classes.text}
              name="employeeId"
              onChange={e => this.props.formHandler(e)}
              // disabled = {!this.props.hr}
              disabled={true}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>

          <div className={classes.textContainer}>
            <div className={classes.textHeaderRole}>Role</div>
            <div className={classes.innerContainer}>
              <div className={classes.hrTitle}>
                <p>HR</p>
              </div>
              <div className={classes.hrCheckBox}>
                <Switch
                  checked={this.props.isHr}
                  name="isHr"
                  color="primary"
                  onClick={this.props.isHrSwitch}
                />
              </div>
              <div className={classes.adminTitle}>
                <p>Admin</p>
              </div>
              <div className={classes.adminCheckBox}>
                <Switch
                  checked={this.props.isAdmin}
                  name="isHr"
                  color="primary"
                  onClick={this.props.isAdminSwitch}
                />
              </div>
              <div className={classes.superTimesheetApproverTitle}>
                <p>Super Timesheet Approver</p>
              </div>
              <div className={classes.superTimesheetApproverCheckbox}>
                <Switch
                  checked={this.props.isSuperTimesheetApprover}
                  name="isHr"
                  color="primary"
                  onClick={this.props.isSuperTimesheetApproverSwitch}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateEmployeeInfo);
