/**
 * Author: Kang Wang
 * Version: 1
 * Desc: Timesheet Detail Component after user click on a row on Timesheet
 */
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from '@material-ui/core/';
import './TimesheetDetail.css';

// testing id
let idTEST = 1;
// timesheet table css
const timesheetStyle = theme => ({
    table: {
      minWidth: 650
    },
    timesheetTable: {
      marginTop: '20px',
      marginLeft: '4%',
      width: '90%',
      maxHeight: '420px'
    },
    tableTitle: {
      fontWeight: 'bold',
      fontSize: '10pt !important'
    },
    button: {
      margin: '25px 0 0 100px'
    }
});

// create TimesheetRow
function createTimesheetRow(id, proj, wp, sat, sun, mon, tue, wed, thu, fri, notes) {
  const tol = totalHourRow(sat, sun, mon, tue, wed, thu, fri)
  return { id, proj, wp, tol, sat, sun, mon, tue, wed, thu, fri, notes };
}
// work hour data formatting
function ccyFormat(num) {
  return `${num.toFixed(1)}`;
}

// calculating total of each row
function totalHourRow(sat, sun, mon, tue, wed, thu, fri) {
  return sat + sun + mon + tue + wed + thu + fri;
}
// calculating total of Sat
function totalSat(items) {
  return items.map(({ sat }) => sat).reduce((saturday, i) => saturday + i, 0);
}
// calculating total of Sun
function totalSun(items) {
  return items.map(({ sun }) => sun).reduce((sunday, i) => sunday + i, 0);
}
// calculating total of Mon
function totalMon(items) {
  return items.map(({ mon }) => mon).reduce((monday, i) => monday + i, 0);
}
// calculating total of Tue
function totalTue(items) {
  return items.map(({ tue }) => tue).reduce((tuesday, i) => tuesday + i, 0);
}
// calculating total of Wed
function totalWed(items) {
  return items.map(({ wed }) => wed).reduce((weds, i) => weds + i, 0);
}
// calculating total of Thu
function totalThu(items) {
  return items.map(({ thu }) => thu).reduce((thur, i) => thur + i, 0);
}
// calculating total of Fri
function totalFri(items) {
  return items.map(({ fri }) => fri).reduce((friday, i) => friday + i, 0);
}
// calculating total of week
function totalHourWeek(items) {
  return items.map(({ tol }) => tol).reduce((total, i) => total + i, 0);
}
// calculating total overtime of week
function overTimeWeek(items) {
  let sumOvertime = 0;
  items.forEach((element) => {
    sumOvertime += element;
  });
  return sumOvertime;
}
// calculating total overtime of each day
function overTimeDay(items) {
  const overtimeArray = new Array(7);
  items.forEach((element, i) => {
    const overtimeDayDiff = element - 8;
    if(overtimeDayDiff >= 0)
      overtimeArray[i] = overtimeDayDiff;
    else 
    overtimeArray[i] = 0;
  });
  return overtimeArray;
}
// demo date
const rows = [
  createTimesheetRow(idTEST++, 10, 'EJ02', 7, 3, 1, 1, 1, 0, 1, 'haha'),
  createTimesheetRow(idTEST++, 11, 'RT34', 4, 1, 0, 8, 1, 0.5, 1, 'This is great'),
  createTimesheetRow(idTEST++, 12, 'FG23', 1, 1, 6, 7, 0, 1, 1, 'Love this duff'),
];

// calculating total hours of all week
const weekTotal = totalHourWeek(rows);
// array of total hours of each day
const dayTotal = [totalSat(rows), totalSun(rows), totalMon(rows), totalTue(rows), totalWed(rows), totalThu(rows), totalFri(rows)];
// array of overtime hours of each day
const dayOvertime = overTimeDay(dayTotal);
// calculating overtime of all week
const overTotal = overTimeWeek(dayOvertime);

// TimesheetDetail Component
class TimesheetDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timesheetrows: []
    }
  }

  // onLoad function, where i will be fetch data
  componentDidMount(){
    this.setState({
      timesheetrows: rows
    })
  }

  // handle add row button click
  handleClick = () => {
    let rowID = idTEST++;
    let emptyRow = createTimesheetRow(rowID, null, null, 0, 0, 0, 0, 0, 0, 0, null);
    this.state.timesheetrows.push(emptyRow);
    console.log(this.state.timesheetrows);
  }

  // timesheet row
  timesheetRow = (row, i) => <TableRow key={i}>
                      <TableCell scope="row">
                          {row.proj}
                      </TableCell>
                      <TableCell align="right">{row.wp}</TableCell>
                      <TableCell align="right">{ccyFormat(row.tol)}</TableCell>
                      <TableCell align="right">{row.sat}</TableCell>
                      <TableCell align="right">{row.sun}</TableCell>
                      <TableCell align="right">{row.mon}</TableCell>
                      <TableCell align="right">{row.tue}</TableCell>
                      <TableCell align="right">{row.wed}</TableCell>
                      <TableCell align="right">{row.thu}</TableCell>
                      <TableCell align="right">{row.fri}</TableCell>
                      <TableCell align="right">{row.notes}</TableCell>
                    </TableRow>;

  render() {
    // link css
    const { classes } = this.props;
  
    return (
      <div className="container">
        {/* employee info header */}
        <div className="timesheetTitle">
          <div className="attributeRow">
            <div className="empNumTitle">
              Employee Number:
            </div>
            <div className="empNum">
              1
            </div>
            <div className="weekNumTitle">
              Week Number:
            </div>
            <div className="weekNum">
              23
            </div>
            <div className="weekEndTitle">
                Week Ending:
            </div>
            <div className="weekEnd">
              &nbsp;&nbsp;&nbsp;2020-02-23
            </div>
          </div>
          {this.props.dashboardTimesheet ?  
            null
            :
            <div className="empNameAttribute">
              <div className="empNameTitle">
                Name:
              </div>
              <div className="empName">
                Bruce Link
              </div>
            </div>
          }
        </div>
        {/* add row button */}
        {this.props.dashboardTimesheet ? null :
          <Button
            className={classes.button}
            onClick={this.handleClick} 
            color='primary' 
            variant='contained'> 
              Add Row
          </Button> 
        }

        {/* timesheet table */}
        <TableContainer className={classes.timesheetTable}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell id="proj" className={classes.tableTitle}>Project</TableCell>
                <TableCell id="wp" align="right" className={classes.tableTitle}>WP</TableCell>
                <TableCell id="tol" align="right" className={classes.tableTitle}>Total</TableCell>
                <TableCell id="sat" align="right" className={classes.tableTitle}>Sat</TableCell>
                <TableCell id="sun" align="right" className={classes.tableTitle}>Sun</TableCell>
                <TableCell id="mon" align="right" className={classes.tableTitle}>Mon</TableCell>
                <TableCell id="tue" align="right" className={classes.tableTitle}>Tue</TableCell>
                <TableCell id="wed" align="right" className={classes.tableTitle}>Wed</TableCell>
                <TableCell id="thu" align="right" className={classes.tableTitle}>Thu</TableCell>
                <TableCell id="fri" align="right" className={classes.tableTitle}>Fri</TableCell>
                <TableCell id="notes" align="right" className={classes.tableTitle}>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody timesheetrows={this.state.timesheetrows}>
              {/* timesheet row date mapping */}
              {this.state.timesheetrows.map((x, i) => this.timesheetRow(x, i))}

              {/* total span column */}
              <TableRow>
                <TableCell  className={classes.tableTitle}>Total</TableCell>
                <TableCell colSpan={2} align="right">{ccyFormat(weekTotal)}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[0])}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[1])}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[2])}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[3])}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[4])}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[5])}</TableCell>
                <TableCell align="right">{ccyFormat(dayTotal[6])}</TableCell>
              </TableRow>
              {/* overtime span column */}
              <TableRow>
                <TableCell colSpan={2} className={classes.tableTitle}>Overtime</TableCell>
                <TableCell align="right">{ccyFormat(overTotal)}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[0])}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[1])}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[2])}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[3])}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[4])}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[5])}</TableCell>
                <TableCell align="right">{ccyFormat(dayOvertime[6])}</TableCell>
              </TableRow>
              {/* flex span column */}
              <TableRow>
                <TableCell colSpan={2} className={classes.tableTitle}>Flextime</TableCell>
                <TableCell align="right">20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default withStyles(timesheetStyle, { withTheme: true })(TimesheetDetail);

