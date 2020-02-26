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
});

function createData(ID, projectName, manager) {
  return { ID, projectName, manager };
}

const rows = [
  createData("P123", "Temp Project", "Josh Radnor"),
  createData("P123", "Tempify", "Sidhu Moosewala"),
  createData("PT123", "Cordova", "Karan Aujla"),
  createData("P123", "Piccolo Driver", "Diljit Dosanjh"),
  createData("P123", "Android", "Ammy Virk")
];

export default function Projects() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableSize}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.bold}>Project ID</TableCell>
            <TableCell align="right" className={classes.bold}>Project Name</TableCell>
            <TableCell align="right" className={classes.bold}>Project Manager</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.projectName}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
