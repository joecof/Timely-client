import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CreateEmployeeInfo from "./CreateEmployeeInfo";
import CreateEmployeeBasicInfo from "./CreateEmployeeBasicInfo";
import CreateEmployeePassword from "./CreateEmployeePassword";
import Alert from "../../Alert/Alert";
import agent from "../../../api/agent";
import { HTTP_STATUS } from "../../../constants/constants";
import { ValidatorForm } from "react-material-ui-form-validator";
const laborData = require("./labor");
require("datejs");

const styles = () => ({
  outerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: "1000px",
  },
  paper: {
    height: "780px",
  },
  divider: {
    height: "750px",
    margin: "15px 0 0 0",
  },
  container: {
    display: "flex",
  },
});

class CreateEmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHr: false,
      isAdmin: false,
      isSuperTimesheetApprover: false,
      vacation: 0,
      supervisorId: "",
      labelGradeId: "",
      labelGradeName: "",
      newPassword: "",
      confirmPassword: "",
      supervisorFirstName: "",
      supervisorLastName: "",
      supervisorSelected: false,
      marks: laborData,
    };

    this.valueLabelFormat = this.valueLabelFormat.bind(this);
    this.getSliderValue = this.getSliderValue.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isHrSwitch = this.isHrSwitch.bind(this);
    this.isAdminSwitch = this.isAdminSwitch.bind(this);
    this.isSuperTimesheetApproverSwitch = this.isSuperTimesheetApproverSwitch.bind(
      this
    );
    this.selectSupervisor = this.selectSupervisor.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstName: "",
      middleName: "",
      lastName: "",
      supervisorId: "",
      newPassword: "",
      confirmPassword: "",
      isHr: false,
      isAdmin: false,
      isSuperTimesheetApprover: false,
      vacation: 0,
      laborGradeId: laborData[0].label,
      laborGradeName: "",
      errorAlert: false,
      successAlert: false,
      marks: laborData,
      supervisorSelected: false,
      supervisorFirstName: "",
      supervisorLastName: "",
    });

    ValidatorForm.addValidationRule("isPassword", (value) => {
      return value.length < 6 && value.length > 0 ? false : true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPassword");
  }

  valueLabelFormat(value) {
    return this.state.marks[value].label;
  }

  getSliderValue(value) {
    this.setState({
      laborGradeId: this.state.marks[value].label,
      laborGradeName: this.state.marks[value].name,
    });
  }

  formHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  isHrSwitch() {
    this.setState({
      isHr: !this.state.isHr,
    });
  }

  isAdminSwitch() {
    this.setState({
      isAdmin: !this.state.isAdmin,
    });
  }

  isSuperTimesheetApproverSwitch() {
    this.setState({
      isSuperTimesheetApprover: !this.state.isSuperTimesheetApprover,
    });
  }

  selectSupervisor(value, firstName, lastName) {
    this.setState({
      supervisorId: value,
      supervisorFirstName: firstName,
      supervisorLastName: lastName,
      supervisorSelected: true,
    });
  }

  async handleSubmit() {
    try {
      const token = localStorage.getItem("token");
      const {
        firstName,
        middleName,
        lastName,
        supervisorId,
        laborGradeId,
        laborGradeName,
        confirmPassword,
        isHr,
        isAdmin,
        isSuperTimesheetApprover,
        vacation,
      } = this.state;

      const employee = {
        supervisor_id: supervisorId,
        labor_grade_id: {
          labor_grade_id: laborGradeId,
          labor_grade_name: laborGradeName,
        },
        password: confirmPassword,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        start_date: new Date().getTime(),
        end_date: null,
        is_admin: isAdmin,
        is_hr_staff: isHr,
        is_super_timesheet_approver: isSuperTimesheetApprover,
        is_secondary_approver: false,
        vacation: vacation,
      };

      await agent.employeeInfo.createEmployee(token, employee);

      this.setState({
        successAlert: true,
        errorAlert: false,
      });

      setTimeout(() => {
        this.setState({
          successAlert: false,
          errorAlert: false,
        });
      }, 1000);
    } catch (e) {
      if (e.response.status === HTTP_STATUS.UNAUTHORIZED) {
        this.props.sessionLogoutHandler();
      }
    }
  }

  render() {
    const { classes, hr } = this.props;

    return (
      <div className={classes.outerContainer}>
        <div className={classes.root}>
          {this.state.errorAlert ? (
            <Alert
              config={{ message: "Submission Failed", variant: "error" }}
            />
          ) : null}
          {this.state.successAlert ? (
            <Alert
              config={{ message: "Submission Success!", variant: "success" }}
            />
          ) : null}
          <Paper className={classes.paper} elevation={2}>
            <div className={classes.container}>
              <CreateEmployeeInfo
                hr={hr}
                formHandler={this.formHandler}
                isHrSwitch={this.isHrSwitch}
                isHr={this.state.isHr}
                isAdminSwitch={this.isAdminSwitch}
                isAdmin={this.state.isAdmin}
                isSuperTimesheetApproverSwitch={
                  this.isSuperTimesheetApproverSwitch
                }
                isSuperTimesheetApprover={this.state.isSuperTimesheetApprover}
              />
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <CreateEmployeeBasicInfo
                hr={hr}
                formHandler={this.formHandler}
                valueLabelFormat={this.valueLabelFormat}
                marks={this.state.marks}
                laborGradeId={this.state.laborGradeId}
                selectSupervisor={this.selectSupervisor}
                supervisorName={`${this.state.supervisorFirstName} ${this.state.supervisorLastName}`}
                supervisorSelected={this.state.supervisorSelected}
                getSliderValue={this.getSliderValue}
              />
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <CreateEmployeePassword
                hr={hr}
                formHandler={this.formHandler}
                handleSubmit={this.handleSubmit}
                newPassword={this.state.newPassword}
                confirmPassword={this.state.confirmPassword}
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateEmployeeForm);
