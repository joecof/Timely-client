import React, { Component } from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
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
    chip: {
      margin: theme.spacing(0.5),
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
          <Grid container direction="column">
            <Typography variant="h4">Assign To Project</Typography>
            <Divider className="supervisorMargin"/>
            <Autocomplete
                className={classes.supervisorMargin}
                options={demoProject}
                getOptionLabel={option => option.number}
                style={{ width: 300 }}
                onChange={(event, value) => setProjectsData(value)}
                renderInput={params => <TextField {...params} label="Project ID" variant="outlined" />}
            />
            <Autocomplete
                multiple
                className={classes.supervisorMargin}
                options={demoEmployee}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                onChange={(event, value) => setEmployeesData(value)}
                renderInput={params => <TextField {...params} label="Search for an employee" variant="outlined" />}
            />
            <Grid>
                {chipData.map(data => {
                    return (
                    <Chip
                        key={data.employeeId}
                        label={data.name}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                    />
                    );
                })}
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
}

export default AssignToProject;
