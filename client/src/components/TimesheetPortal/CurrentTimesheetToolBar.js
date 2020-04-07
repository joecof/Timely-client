/**
 * Author: Joe, Kang
 * Version: 1
 * Desc: Create Current Timesheet Button Function if employee does not have timesheet for current week
 * Direct to curent week timesheet if it's already been created
 */
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core/';
import agent from "../../api/agent";

/**
 * Material UI styling JSON object. 
 */
const defaultToolbarStyles = {
  iconButton: {
    marginLeft: 30
  },
};

// Current Timesheet Buttion Component
class CurrentTimesheetToolBar extends React.Component {

  // Constructor for props, states and functions
  constructor(props) {
    super(props); 

    this.createCurrentTimesheet = this.createCurrentTimesheet.bind(this);
    this.hasCurrentTimesheet = this.hasCurrentTimesheet.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.currentWeekNumber = this.currentWeekNumber.bind(this);
    this.getFridayOfCurrentWeek = this.getFridayOfCurrentWeek.bind(this);
  }

  // get current date
  currentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    return (year + "-" + month + "-" + day);
  }

  // week ending of every friday
  getFridayOfCurrentWeek() {
    var curr = new Date(); // get current date
    var thisDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 1);
    var first = thisDate.getDate() - thisDate.getDay() - 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    return new Date(curr.setDate(last));
  }

  // generate current weekNumber
  currentWeekNumber() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1.1) / 7);
  }

  // check if fetched timesheets has currentTimesheet
  hasCurrentTimesheet() {
    // current timesheets
    var curTimesheets = this.props.states.timesheets;
    // var current date
    // current week number
    var current_weeknumber = this.currentWeekNumber();
    // most recent timesheet week number on timesheet
    var most_recnt_weeknumber = curTimesheets[0][1];

    // checking if current timesheet is created 
    if(current_weeknumber - most_recnt_weeknumber > 0 ) {
      return false;
    } else {
      return true;
    }
  }

  // create currentTimesheet
  async createCurrentTimesheet() {
    // logged in employee
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = localStorage.getItem("token");
    const userId = user.employee_id;
    const logedInUser = await agent.employeeInfo.getCurrentUser(userId, token);

    // login employee labor grade
    const laborGradeId = logedInUser.labor_grade_id.labor_grade_id;
    // current year
    const currentYear = new Date().getFullYear();
    // current week number
    const currentWeekNumber = this.currentWeekNumber();
    // current week ending
    const currentWeekEnding = this.getFridayOfCurrentWeek();
    // current timesheet creation
    const timesheetCreation = {
      "labor_grade_id": laborGradeId,
      "year": currentYear,
      "week": currentWeekNumber,
      "week_ending": currentWeekEnding,
      "status": "OPEN",
      "approver_id": 3,
      "approve_date": null,
      "attribute1": null,
      "details": [
          {
              "project_code": " ",
              "work_package_id": " ",
              "saturday": 0.0,
              "sunday": 0.0,
              "monday": 0.0,
              "tuesday": 0.0,
              "wednesday": 0.0,
              "thursday": 0.0,
              "friday": 0.0,
              "notes": "",
              "project_wp": "PJT38001_1L"
          }
      ]
    };
    const response = await agent.timesheetsInfo.createCurrentWeekTimesheet(userId, token, timesheetCreation);
    this.props.fetchTimesheets();
  }
  
  /**
   * Will be used to add an employee
   */
  handleClick = () => {
    // if new employee no timesheet 
    if(this.props.states.timesheets.length == 0) {
      this.createCurrentTimesheet();
    } else {
      // create currentTimesheet if doesnt have
      if(!this.hasCurrentTimesheet()) {
        this.createCurrentTimesheet();
      } else {  // go to currentTimesheet Detail
        const tsId = this.props.states.timesheets[0][0];
        const weekNum = this.props.states.timesheets[0][1];
        const weekEnd = this.props.states.timesheets[0][2];
        this.props.history.push(`/dashboard/timesheet/${tsId}`);
        localStorage.setItem("timesheetId", tsId);
        localStorage.setItem("weekNumber", weekNum);
        localStorage.setItem("weekEnding", weekEnd);
      }
    }
  }

  render() {
    // styling
    const { classes } = this.props;
    return (
      <>
        <Tooltip title={"Create Current Timesheet"}>
          <Button 
            className={classes.iconButton} 
            onClick={this.handleClick} 
            color='primary' 
            variant='contained'> 
              Current Timesheet
          </Button> 
        </Tooltip>
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CurrentTimesheetToolBar" })(CurrentTimesheetToolBar);