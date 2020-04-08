import React, { Component } from "react";
import MUIDatatable from "mui-datatables";
import agent from "../../api/agent";
import Alert from "../Alert/Alert";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "./tsApproverPortal.css";

// static columns
const columns = [
  {
    name: "timesheetid",
    label: "Timesheet ID",
    className: "column",
    options: {
      filter: false,
    },
  },
  {
    name: "weeknumber",
    label: "Week Number",
    className: "column",
    options: {
      filter: false,
    },
  },
  {
    name: "weekending",
    label: "Week Ending",
    className: "column",
    options: {
      sort: true,
      filter: false,
      // display false
    },
  },
];

// static options
const options = (props, states, fetchTimesheets) => {
  const data = {
    selectableRows: false,
    search: true,
    print: false,
    download: false,
    rowHover: true,
    onRowClick: (rowData) => {
      props.history.push(
        `/dashboard/tsapprover/${props.match.params.id}/${rowData[0]}`
      );
      localStorage.setItem("timesheetId", rowData[0]);
    },
  };
  return data;
};

/**
 * Author: John Ham
 * Version: 1
 * Desc: Timesheet Approver Portal Component
 * Displays a list of timesheets that need approving for an employee
 */
export default class TimesheetPortal extends Component {
  getCustomTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            padding: "45px",
          },
        },
        MUIDataTableHeadCell: {
          data: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            fontSize: "16px",
          },
        },
        MUIDataTableToolbar: {
          root: {
            padding: "0",
          },
        },
      },
    });

  constructor(props) {
    super(props);

    this.state = {
      timesheets: [],
      loadedUserID: {},
      errorAlert: false,
    };
    this.fetchTimesheets = this.fetchTimesheets.bind(this);
    this.formatWeekEnding = this.formatWeekEnding.bind(this);
  }

  // on page load fetching timesheets data
  componentDidMount() {
    this.fetchTimesheets();
    this.formatWeekEnding();
  }

  // Fetching Timesheets
  async fetchTimesheets() {
    // fetch logined user
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.id;
    try {
      var response = await agent.timesheetsInfo.getAllCloseTimesheetsByEmp(
        userId,
        token
      );
    } catch (e) {
      this.setState({
        errorAlert: true,
      });
      setTimeout(() => {
        this.setState({
          errorAlert: false,
        });
        this.props.history.push(`/dashboard/tsapprover/`);
      }, 1000);
      return [];
    }

    if (response.length != 0) {
      // fetching timesheets
      var timesheetList = [];

      for (let i = 0; i < response.length; i++) {
        let timesheetid = response[i].timesheet_id;
        let weeknumber = response[i].week;
        let weekending = this.formatWeekEnding(response[i].week_ending);

        let eachTimesheet = [];
        eachTimesheet.push(timesheetid);
        eachTimesheet.push(weeknumber);
        eachTimesheet.push(weekending);
        timesheetList.push(eachTimesheet);
      }
      // sorting timesheet list by week number
      timesheetList.sort(function (a, b) {
        return b[1] - a[1];
      });
      // setting the states
      this.setState({
        timesheets: timesheetList,
        loadedUserID: userId,
      });
    } else {
      console.log("no timesheets");
    }
  }

  // converting weekending api from milliseconds to date format
  formatWeekEnding(weekending) {
    var weekEnding_date = new Date(weekending);
    var year = weekEnding_date.getFullYear();
    var month = ("0" + (weekEnding_date.getMonth() + 1)).slice(-2);
    var day = ("0" + weekEnding_date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  // timesheet table UI
  render() {
    return (
      <div className="tsToApprove-container">
        <MuiThemeProvider theme={this.getCustomTheme()}>
          {this.state.errorAlert ? (
            <Alert
              config={{
                message: "An error has occurred. Please try again.",
                variant: "error",
              }}
            />
          ) : null}
          <MUIDatatable
            className="datatable"
            title={<div className="tsToApprove-title">Timesheets To Approve For {localStorage.name}</div>}
            options={options(this.props, this.state, this.fetchTimesheets)}
            columns={columns}
            data={this.state.timesheets}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
