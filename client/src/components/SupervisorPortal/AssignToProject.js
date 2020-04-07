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
 * Author: John Ham 
 * Version: 1.0 
 * Description: Supervisor portal component. 
 * Allows a supervisor to select employees and assign them to a project.  
 */
const AssignToProject = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("token");

    const [project, setProject] = React.useState();
    const [employees, setEmployees] = React.useState();

    const [projectsData, setProjectsData] = React.useState([]);
    const [employeesData, setEmployeesData] = React.useState([]);

    const fetchProjectsData = async () => {
      const response = await agent.projects.getAllProjects(token);
      return response;
    }

    const fetchEmployeesData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await agent.employeeInfo.getEmployeesBySupervisor(user.employee_id, token);
      return response;
    }

    useEffect(() => {
      async function fetchData() {
        setProjectsData(await fetchProjectsData());
        setEmployeesData(await fetchEmployeesData());
      }
      fetchData();
    }, []);

    const handleSubmit = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (project == null) {
        return null;
      }
      for (var i = 0; i < employees.length; i++) {
        project.employees.push(employees[i]);
      }
      const response = agent.projects.updateProject(project, token);
      console.log(response);
      props.history.push(`/dashboard/supervisor`);
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.supervisorPaper} elevation={2}>
          <div className={classes.assignToProjectContainer}>
            <div className={classes.AssignToProjectTitle}>Assign To Project</div>
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
                // options={demoEmployee}
                getOptionLabel={option => option.name}
                style={{ width: 500 }}
                onChange={(event, value) => setEmployeesData(value)}
                renderInput={params => <TextField {...params} variant="standard" label="Add employees" placeholder="Search for an employee" />}
            />
            <Button className={classes.assignButton} variant="contained" color="primary" onClick={handleSubmit}>Assign</Button>
          </div>
        </Paper>
      </div>
    )
}

export default AssignToProject;
