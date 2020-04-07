import React, { Component, useEffect } from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import agent from '../../api/agent.js'

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
 * Author: John Ham 
 * Version: 1.0 
 * Description: Supervisor portal component. 
 * Allows a supervisor to select employees and remove them from a project.  
 */
const RemoveFromProject = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem('user'));

    const [project, setProject] = React.useState();
    const [employees, setEmployees] = React.useState();

    const [projectsData, setProjectsData] = React.useState();
    var employeesToRemove = [];

    const fetchProjectsData = async () => {
      const response = await agent.projects.getProjectsForSupervisor(user.employee_id, token);
      setProjectsData(response);
      return response;
    }

    const fetchEmployeesData = async () => {
        if (project == null) {
             return;
        }
        for (var i = 0; i < project.employees.length; i++) {
            if (project.employees[i].supervisor_id == user.employee_id) {
                employeesToRemove.push(project.employees[i]);
            }
        }
        return employeesToRemove;
    }

    useEffect(() => {
      async function fetchData() {
        await fetchProjectsData();
      }
      fetchData();
    }, []);

    useEffect(() => {
        fetchEmployeesData();
    }, [project]);

    const handleSubmit = async () => {
      const token = localStorage.getItem("token");
      if (project == null || employees == null) {
          return null;
      }
      project.employees = project.employees.filter(function(o) {
        return employees.indexOf(o) < 0;
      });
      const response = agent.projects.updateProject(project, token);
      console.log(response);
      props.history.push(`/dashboard/supervisor`);
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.supervisorPaper} elevation={2}>
          <Grid container direction="column">
            <Typography variant="h4">Remove From Project</Typography>
            <Divider className="supervisorMargin"/>
            <Autocomplete
                className={classes.supervisorMargin}
                options={projectsData}
                getOptionLabel={(option) => option.project_code}
                style={{ width: 700 }}
                onChange={(event, value) => setProject(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Project ID" />}
            />
            <Autocomplete
                multiple
                className={classes.supervisorMargin}
                options={employeesToRemove}
                getOptionLabel={option => option.first_name + " " + option.last_name}
                style={{ width: 700 }}
                onChange={(event, value) => setEmployees(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Add employees" placeholder="Search for an employee" />}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ width: 700 }}>Remove</Button>
          </Grid>
        </Paper>
      </div>
    )
}

export default RemoveFromProject;
