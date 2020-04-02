/**
 * Author: Kang Wang
 * Version: 1
 * Desc: Timesheet Detail Component after user click on a row on Timesheet
 */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core/";
import "./TimesheetDetail.css";
import agent from "../../api/agent";

// testing id
let idTEST = 1;
// timesheet table css
const timesheetStyle = theme => ({
  table: {
    width: "93%"
  },
  timesheetTable: {
    width: "100%",
    maxHeight: "420px",
    display: "flex",
    justifyContent: "center"
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: "10pt !important"
  },
  button: {}
});

// TimesheetDetail Component
class TimesheetDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timesheetrows: [],
      loadUser: {},
      totalWeek: {},
      totalDay: [],
      totalOver: {},
      totalOverDays: []
    };

    this.fetchTimesheetRows = this.fetchTimesheetRows.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.totalHourRow = this.totalHourRow.bind(this);
    this.totalSat = this.totalSat.bind(this);
    this.totalSun = this.totalSun.bind(this);
    this.totalMon = this.totalMon.bind(this);
    this.totalTue = this.totalTue.bind(this);
    this.totalWed = this.totalWed.bind(this);
    this.totalThu = this.totalThu.bind(this);
    this.totalFri = this.totalFri.bind(this);
    this.totalHourWeek = this.totalHourWeek.bind(this);
    this.ccyFormat = this.ccyFormat.bind(this);
    this.overTimeWeek = this.overTimeWeek.bind(this);
    this.overTimeDay = this.overTimeDay.bind(this);
  }

  // onLoad function, where i will be fetch data
  componentDidMount() {
    this.fetchTimesheetRows();
  }

  // Fetching Timesheet Rows
  async fetchTimesheetRows() {
    // check if its dash board timesheet
    const ifDashboardTs = this.props.dashboardTimesheet;
    var user, userId, token, tsId;

    // setting userId token and tsId for fetching
    if (ifDashboardTs == null) {
      user = JSON.parse(sessionStorage.getItem("user"));
      userId = user.employee_id;
      token = localStorage.getItem("token");
      tsId = localStorage.getItem("timesheetId");
    } else {
      console.log(this.props.userId);
      console.log(this.props.token);
    }

    // fetching timesheetRow
    if (userId != null && token != null && tsId != null) {
      const response = await agent.timesheetsInfo.getTimesheetById(
        userId,
        token,
        tsId
      );
      if (response.details.length != 0) {
        const timesheetDetails = response.details;
        // fetching timesheetRows
        var timesheetRowList = [];

        // id, proj, wp, sat, sun, mon, tue, wed, thu, fri, notes
        for (let i = 0; i < timesheetDetails.length; i++) {
          let id = timesheetDetails[i].timesheet_row_id;
          let proj = timesheetDetails[i].project_code;
          let wp = timesheetDetails[i].work_package_id;
          let sat = timesheetDetails[i].saturday;
          let sun = timesheetDetails[i].sunday;
          let mon = timesheetDetails[i].monday;
          let tue = timesheetDetails[i].tuesday;
          let wed = timesheetDetails[i].wednesday;
          let thu = timesheetDetails[i].thursday;
          let fri = timesheetDetails[i].friday;
          let notes = timesheetDetails[i].notes;
          let proj_wp = timesheetDetails[i].project_wp;
          const tol = this.totalHourRow(sat, sun, mon, tue, wed, thu, fri);

          let eachTimesheetRow = [];
          eachTimesheetRow.push(id);
          eachTimesheetRow.push(proj);
          eachTimesheetRow.push(wp);
          eachTimesheetRow.push(tol);
          eachTimesheetRow.push(sat);
          eachTimesheetRow.push(sun);
          eachTimesheetRow.push(mon);
          eachTimesheetRow.push(tue);
          eachTimesheetRow.push(wed);
          eachTimesheetRow.push(thu);
          eachTimesheetRow.push(fri);
          eachTimesheetRow.push(notes);
          eachTimesheetRow.push(proj_wp);
          timesheetRowList.push(eachTimesheetRow);
        }
        //  setting state
        this.setState({
          timesheetrows: timesheetRowList,
          loadUser: user
        });
        // calculating total hours of all week
        const weekTotal = this.totalHourWeek(this.state.timesheetrows);
        // array of total hours of each day
        const dayTotal = [
          this.totalSat(this.state.timesheetrows),
          this.totalSun(this.state.timesheetrows),
          this.totalMon(this.state.timesheetrows),
          this.totalTue(this.state.timesheetrows),
          this.totalWed(this.state.timesheetrows),
          this.totalThu(this.state.timesheetrows),
          this.totalFri(this.state.timesheetrows)
        ];
        // total overtime of the week
        const overTotal = this.overTimeWeek(weekTotal);
        // array of overtime hours of each day
        const dayOvertime = this.overTimeDay(dayTotal);
        //  setting state
        this.setState({
          timesheetrows: timesheetRowList,
          loadUser: user,
          totalWeek: weekTotal,
          totalDay: dayTotal,
          totalOver: overTotal,
          totalOverDays: dayOvertime
        });
      }
    }
  }

  // work hour data formatting
  ccyFormat(num) {
    return (Math.round(num * 10) / 10).toFixed(1);
  }

  // calculating total of each row
  totalHourRow(sat, sun, mon, tue, wed, thu, fri) {
    return sat + sun + mon + tue + wed + thu + fri;
  }

  // calculating total of Sat
  totalSat(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][4];
    }
    return total;
  }
  // calculating total of Sun
  totalSun(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][5];
    }
    return total;
  }
  // calculating total of Mon
  totalMon(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][6];
    }
    return total;
  }
  // calculating total of Tue
  totalTue(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][7];
    }
    return total;
  }
  // calculating total of Wed
  totalWed(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][8];
    }
    return total;
  }
  // calculating total of Thu
  totalThu(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][9];
    }
    return total;
  }
  // calculating total of Fri
  totalFri(items) {
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i][10];
    }
    return total;
  }
  // calculating total of week
  totalHourWeek(items) {
    var totalWeekHour = 0;
    for (let i = 0; i < items.length; i++) {
      totalWeekHour += items[i][3];
    }
    return totalWeekHour;
  }
  // calculating total overtime of week
  overTimeWeek(item) {
    if (item > 40) {
      return item - 40;
    }
    return 0;
  }
  // calculating total overtime of each day
  overTimeDay(items) {
    const overtimeArray = new Array(7);
    items.forEach((element, i) => {
      const overtimeDayDiff = element - 8;
      if (overtimeDayDiff >= 0) overtimeArray[i] = overtimeDayDiff;
      else overtimeArray[i] = 0;
    });
    return overtimeArray;
  }

  // handle add row button click
  handleClick = () => {
    console.log("create timesheet row");
  };

  // timesheet row
  timesheetRow = (row, i) => (
    <TableRow key={i}>
      <TableCell scope="row">{row[1]}</TableCell>
      <TableCell align="right">{row[2]}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[3])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[4])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[5])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[6])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[7])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[8])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[9])}</TableCell>
      <TableCell align="right">{this.ccyFormat(row[10])}</TableCell>
      <TableCell align="right">{row[11]}</TableCell>
    </TableRow>
  );

  render() {
    // link css
    const { classes } = this.props;
    return (
      <div className="outerContainer">
        <div className="container">
          {/* employee info header */}
          <div className="timesheetTitle">
            <div className="attributeRow">
              <div className="empNumContainer">
                <div className="empNumTitle">Employee Number:</div>
                <div className="empNum">{this.state.loadUser.employee_id}</div>
              </div>
              <div className="weekNumContainer">
                <div className="weekNumTitle">Week Number:</div>
                <div className="weekNum">
                  {localStorage.getItem("weekNumber")}
                </div>
              </div>
              <div className="weekEndContainer">
                <div className="weekEndTitle">Week Ending:</div>
                <div className="weekEnd">
                  {localStorage.getItem("weekEnding")}
                </div>
              </div>
              {this.props.dashboardTimesheet ? null : (
                <Button
                  className={classes.button}
                  onClick={this.handleClick}
                  color="primary"
                  variant="contained"
                >
                  Add Row
                </Button>
              )}
            </div>
            {this.props.dashboardTimesheet ? null : (
              <div className="empNameAttribute">
                <div className="empNameTitle">Name:</div>
                <div className="empName">
                  {this.state.loadUser.first_name}{" "}
                  {this.state.loadUser.last_name}
                </div>
              </div>
            )}
          </div>
          {/* add row button */}

          {/* timesheet table */}
          <TableContainer className={classes.timesheetTable}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell id="proj" className={classes.tableTitle}>
                    Project
                  </TableCell>
                  <TableCell
                    id="wp"
                    align="right"
                    className={classes.tableTitle}
                  >
                    WP
                  </TableCell>
                  <TableCell
                    id="tol"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    id="sat"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Sat
                  </TableCell>
                  <TableCell
                    id="sun"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Sun
                  </TableCell>
                  <TableCell
                    id="mon"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Mon
                  </TableCell>
                  <TableCell
                    id="tue"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Tue
                  </TableCell>
                  <TableCell
                    id="wed"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Wed
                  </TableCell>
                  <TableCell
                    id="thu"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Thu
                  </TableCell>
                  <TableCell
                    id="fri"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Fri
                  </TableCell>
                  <TableCell
                    id="notes"
                    align="right"
                    className={classes.tableTitle}
                  >
                    Notes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* timesheet row date mapping */}
                {this.state.timesheetrows.map((x, i) =>
                  this.timesheetRow(x, i)
                )}

                {/* total span column */}
                <TableRow>
                  <TableCell className={classes.tableTitle}>Total</TableCell>
                  <TableCell colSpan={2} align="right">
                    {this.ccyFormat(this.state.totalWeek)}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[0])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[1])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[2])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[3])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[4])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[5])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalDay[6])}
                  </TableCell>
                </TableRow>
                {/* overtime span column */}
                <TableRow>
                  <TableCell colSpan={2} className={classes.tableTitle}>
                    Overtime
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOver)}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[0])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[1])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[2])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[3])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[4])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[5])}
                  </TableCell>
                  <TableCell align="right">
                    {this.ccyFormat(this.state.totalOverDays[6])}
                  </TableCell>
                </TableRow>
                {/* flex span column */}
                <TableRow>
                  <TableCell colSpan={2} className={classes.tableTitle}>
                    Flextime
                  </TableCell>
                  <TableCell align="right">20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(timesheetStyle, { withTheme: true })(TimesheetDetail);
