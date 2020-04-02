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
        flexGrow: 1,
    },
    supervisorMargin: {
        margin: 10,
    },
    supervisorPaper: {
        height: 750,
        padding: 50,
    },
    supervisorButton: {
      width: "fit-content"
    },
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

    const [projectsData, setProjectsData] = React.useState();
    const [employeesData, setEmployeesData] = React.useState();

    return (
      <div className={classes.root}>
        <Paper className={classes.supervisorPaper} elevation={2}>
          <Grid container direction="column">
            <Typography variant="h4">Assign To Project</Typography>
            <Divider className="supervisorMargin"/>
            <Autocomplete
                className={classes.supervisorMargin}
                options={demoProject}
                getOptionLabel={option => option.number}
                style={{ width: 700 }}
                onChange={(event, value) => setProjectsData(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Project ID" />}
            />
            <Autocomplete
                multiple
                className={classes.supervisorMargin}
                options={demoEmployee}
                getOptionLabel={option => option.name}
                style={{ width: 700 }}
                onChange={(event, value) => setEmployeesData(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Add employees" placeholder="Search for an employee" />}
            />
            <Button variant="contained" color="primary" style={{ width: 700 }}>Assign</Button>
          </Grid>
        </Paper>
      </div>
    )
}

export default AssignToProject;
