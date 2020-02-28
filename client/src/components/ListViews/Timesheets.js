import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableSize: {
    marginLeft: '15%',
    width: '70%'
  },
  bold: {
      fontWeight: 'bold',
  },
  // need to use state for these statuses
  Pending: {
    padding: '5px',
    borderRadius: '1rem',
    color: 'white',
    background: 'orange'
  },
  Approved: {
    padding: '5px',
    borderRadius: '1rem',
    color: 'white',
    background: 'green'
  },
  Rejected: {
    padding: '5px',
    borderRadius: '1rem',
    color: 'white',
    background: 'red'
  }
});

function createData(ID, weekNumber, weekEnding, Status) {
  return { ID, weekNumber, weekEnding, Status };
}

const rows = [
  createData("T123", 23, "12/12/2019", "Pending"),
  createData("T123", 22, "06/12/2019", "Approved"),
  createData("T123", 21, "30/11/2019", "Rejected"),
  createData("T123", 19, "07/09/2019", "Approved"),
  createData("T123", 18, "08/10/2019", "Approved")
];

export default function Timesheets() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableSize}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.bold}>Timesheet ID</TableCell>
            <TableCell align="right" className={classes.bold}>Week Number</TableCell>
            <TableCell align="right" className={classes.bold}>Week Ending</TableCell>
            <TableCell align="right" className={classes.bold}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.weekNumber}</TableCell>
              <TableCell align="right">{row.weekEnding}</TableCell>
              {row.Status === "Pending" &&
                <TableCell align="right"><span className={classes.Pending}>{row.Status}</span></TableCell>
              }
              {row.Status === "Approved" &&
                <TableCell align="right"><span className={classes.Approved}>{row.Status}</span></TableCell>
              }
              {row.Status === "Rejected" &&
                <TableCell align="right"><span className={classes.Rejected}>{row.Status}</span></TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
