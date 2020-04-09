import React, { Component, useEffect } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import agent from "../../api/agent.js";
import Alert from "../Alert/Alert";

/**
 * Material UI styling JSON object.
 * @param {JSON} theme
 */
const useStyles = makeStyles((theme) => ({
  assignToProjContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: "1100px",
    backgroundColor: "white",
    border: "1px solid lightgray",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    padding: "45px"
  },
  innerAssignToProjContainer: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  supervisorButton: {
    width: "fit-content",
  },
  assignToProjTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "15px 0 0 0",
  },
  supervisorMargin: {
    width: "350px !important",
  },
  button: {
    width: "200px",
    margin: "35px 0 35px 0",
  },
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
  const [employees, setEmployees] = React.useState([]);

  const [projectsData, setProjectsData] = React.useState([]);
  const [employeeList, setEmployeeList] = React.useState([]);
  const [employeesData, setEmployeesData] = React.useState([]);

  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);

  const fetchProjectsData = async () => {
    try {
      var response = await agent.projects.getAllProjects(token);
      response = response.filter(function (o) {
        return o.status == "OPEN";
      });
    } catch (e) {
      setSuccessAlert(false);
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
        setSuccessAlert(false);
        props.history.push(`/dashboard/supervisor`);
      }, 1000);
    }
    return response;
  };

  const fetchEmployeesData = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      var response = await agent.employeeInfo.getEmployeesBySupervisor(
        user.employee_id,
        token
      );
    } catch (e) {
      setSuccessAlert(false);
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
        setSuccessAlert(false);
        props.history.push(`/dashboard/supervisor`);
      }, 1000);
      return [];
    }
    return response;
  };

  useEffect(() => {
    async function fetchData() {
      setProjectsData(await fetchProjectsData());
      setEmployeeList(await fetchEmployeesData());
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (project == null) {
      return;
    }
    var empNotInProj = [];
    for (var i = 0; i < employeeList.length; i++) {
      var inProj = false;
      for (var j = 0; j < project.employees.length; j++) {
        if (employeeList[i].employee_id == project.employees[j].employee_id) {
          var inProj = true;
        }
      }
      if (!inProj) {
        empNotInProj.push(employeeList[i]);
      }
    }
    setEmployeesData(empNotInProj);
  }, [project]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (project == null) {
      return null;
    }
    if (employees.length == 0) {
      return null;
    }
    for (var i = 0; i < employees.length; i++) {
      project.employees.push(employees[i]);
    }

    try {
      await agent.projects.updateProject(project, token);
      setSuccessAlert(true);
      setErrorAlert(false);
    } catch (e) {
      setErrorAlert(true);
      setSuccessAlert(false);
    }

    setTimeout(() => {
      setErrorAlert(false);
      setSuccessAlert(false);
      props.history.push(`/dashboard/supervisor`);
    }, 1000);
  };

  return (
    <div className={classes.assignToProjContainer}>
      <div className={classes.root}>
        {errorAlert ? (
          <Alert
            config={{
              message: "An error has occurred. Please try again.",
              variant: "error",
            }}
          />
        ) : null}
        {successAlert ? (
          <Alert config={{ message: `Success!`, variant: "success" }} />
        ) : null}
        <div className={classes.innerAssignToProjContainer}>
          <div className={classes.assignToProjTitle}>Assign To Project</div>
          <Autocomplete
            className={classes.supervisorMargin}
            options={projectsData}
            getOptionLabel={(option) => option.project_code}
            onChange={(event, value) => setProject(value)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Project ID" />
            )}
          />
          <Autocomplete
            multiple
            className={classes.supervisorMargin}
            options={employeesData}
            getOptionLabel={(option) =>
              option.first_name + " " + option.last_name
            }
            onChange={(event, value) => setEmployees(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Add employees"
                placeholder="Search for an employee"
              />
            )}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignToProject;
