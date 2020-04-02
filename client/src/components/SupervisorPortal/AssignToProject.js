import React, { Component } from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';

/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const useStyles = makeStyles(theme => ({
    root: {
        width: "1300px",
        display: "flex",
        justifyContent: "center"
    },
    supervisorMargin: {
        margin: 10,
    },
    supervisorPaper: {
      width: "1000px",
        height: "300px",
        padding: "40px",
    },
    supervisorButton: {
      width: "fit-content"
    },
    assignToProjectContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    AssignToProjectTitle: {
      fontSize: "16px",
      fontWeight: "bold"
    },
    assignButton: {
      width: "200px",
      margin: "20px 0 0 0"
    }
}));

/**
 * Demo data for now. 
 */
const demoEmployee = 
    [{ employeeId: "1", name: "John Doe" },
    { employeeId: "2", name: "Jane Kelly" },
    { employeeId: "3", name: "Henry Peter" }]
const demoProject = 
        [{ number: "1" },
        { number: "2" },
        { number: "3" }]

/**
 * Author: John Ham 
 * Version: 1.0 
 * Description: Supervisor portal component. 
 * Allows a supervisor to select employees and assign them to a project.  
 */
const AssignToProject = () => {
    const classes = useStyles();

    const [chipData, setChipData] = React.useState([
        { employeeId: "1", name: "John Doe" },
        { employeeId: "2", name: "Jane Kelly" },
        { employeeId: "3", name: "Henry Peter" }
    ]);

    const [projectsData, setProjectsData] = React.useState();
    const [employeesData, setEmployeesData] = React.useState();

    const handleDelete = chipToDelete => () => {
        setChipData(chips => chips.filter(chip => chip.employeeId !== chipToDelete.employeeId));
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.supervisorPaper} elevation={2}>
          <div className={classes.assignToProjectContainer}>
            <div className={classes.AssignToProjectTitle}>Assign To Project</div>
            <Divider className="supervisorMargin"/>
            <Autocomplete
                className={classes.supervisorMargin}
                options={demoProject}
                getOptionLabel={option => option.number}
                style={{ width: 500 }}
                onChange={(event, value) => setProjectsData(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Project ID" />}
            />
            <Autocomplete
                multiple
                className={classes.supervisorMargin}
                options={demoEmployee}
                getOptionLabel={option => option.name}
                style={{ width: 500 }}
                onChange={(event, value) => setEmployeesData(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Add employees" placeholder="Search for an employee" />}
            />
            <Button className={classes.assignButton} variant="contained" color="primary">Assign</Button>
          </div>
        </Paper>
      </div>
    )
}

export default AssignToProject;
