import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SupervisorList from "./SupervisorList";
import FaceIcon from "@material-ui/icons/Face";
import Chip from "@material-ui/core/Chip";
import LaborGradeSlider from "./LaborGradeSlider";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    padding: "45px",
    width: "350px",
  },
  field: {},
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "20px 0 0 0"
  },
  paper: {
    height: 600,
  },
  input: {
    display: "inline-block",
    width: "100%",
    margin: "10px 0 0 0",
  },
  field: {
    marginTop: 50,
  },
  fieldVacation: {
    marginTop: "25px",
    width: "100%"
  },
  slider: {
    width: "100%",
  },
  supervisorField: {
    marginTop: 20,
    marginBottom: 20,
  },
  supervisorName: {
    display: "inline",
  },
  formControl: {
    width: "50%",
    marginTop: 10,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: CreateEmployeeBasicInfo component.
 */
class BasicInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.field}>
          <div className={classes.title}>Basic Information</div>
          <TextField
            className={classes.input}
            disabled={!this.props.hr}
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
            helperText="Middle Name"
            onChange={(e) => this.props.formHandler(e)}
            name="middleName"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            disabled={!this.props.hr}
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
            marks={this.props.marks}
            getSliderValue={this.props.getSliderValue}
            valueLabelFormat={this.props.valueLabelFormat}
            hr={this.props.hr}
          />
        </div>
        <div className={classes.field}>
          <div className={classes.bottomContainer}>
            <div>
              <SupervisorList
                hr={this.props.hr}
                selectSupervisor={this.props.selectSupervisor}
              />
            </div>
            <div>
              {this.props.supervisorSelected ? (
                <Chip
                  className={classes.chip}
                  icon={<FaceIcon />}
                  label={this.props.supervisorName}
                />
              ) : null}
            </div>
            <div className={classes.fieldVacation}>
              <div className={classes.title}>Vacation Days</div>
              <TextField
                className={classes.input}
                helperText="Vacation Days"
                type="number"
                name="vacation"
                onChange={(e) => this.props.formHandler(e)}
                disabled={!this.props.hr}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BasicInfo);
