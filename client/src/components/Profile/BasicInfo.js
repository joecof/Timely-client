import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SupervisorList from '../HrPortal/CreateEmployeeForm/SupervisorList'
import FaceIcon from '@material-ui/icons/Face';
import LaborGradeSlider from '../HrPortal/CreateEmployeeForm/LaborGradeSlider';
import Chip from '@material-ui/core/Chip';

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    width: "350px",
    padding: "45px",
  },
  title: {
    margin: "40px 0 0 0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  paper: {
    // height: 500
  },
  input: {
    display: "block",
    width: "100%",
    margin: "5px 0 0 0",
  },
  basicInfoContainer: {
    marginTop: "50px",
  },
  laborGradeContainer: {
    margin: "25px 0 0 0",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  supervisorContainer: {
    margin: "40px 0 0 0",
  },
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: BasicInfo component.
 */
class BasicInfo extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { classes, supervisor } = this.props;

    return (
      <>
        {supervisor ? (
          <div className={classes.container}>
            <div className={classes.field}>
              <div className={classes.title}> Basic Information </div>
              <TextField
                className={classes.input}
                disabled={!this.props.hr}
                defaultValue={this.props.loadedUser.first_name}
                helperText="First Name"
                onChange={(e) => this.props.formHandler(e)}
                name="firstName"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className={classes.input}
                disabled={!this.props.hr}
                defaultValue={this.props.loadedUser.last_name}
                helperText="Last Name"
                name="lastName"
                onChange={(e) => this.props.formHandler(e)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.field}>
              <LaborGradeSlider
                valueLabelFormat={this.props.valueLabelFormat}
                getSliderValue={this.props.getSliderValue}
                marks={this.props.marks}
                hr={this.props.hr}
                marksValue={this.props.marksValue}
              />
            </div>
            <div className={classes.field}>
              <div className={classes.bottomContainer}>
                <div className={classes.supervisorContainer}>
                  <SupervisorList
                    hr={this.props.hr}
                    selectSupervisor={this.props.selectSupervisor}
                  />
                </div>
                <div>
                  <Chip
                    className={classes.chip}
                    icon={<FaceIcon />}
                    label={this.props.supervisorName}
                  />
                </div>
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>
                Vacation Days
              </div>
              <TextField
                className={classes.input}
                disabled={!this.props.hr}
                defaultValue={this.props.loadedUser.vacation}
                helperText="Vacation Days"
                onChange={(e) => this.props.formHandler(e)}
                name="vacation"
                type="number"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BasicInfo);
