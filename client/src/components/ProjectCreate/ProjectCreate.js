import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ProjectInfo from "./ProjectInfo";
import ProjectDesc from "./ProjectDesc";
import Budget from "./Budget";
import Schedule from "./Schedule";
import agent from "../../api/agent.js";
import "./ProjectCreate.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component let's the user create a new project
 */
const useStyles = makeStyles(theme => ({
  root: {
    width: "1100px"
  },
  stepper: {
    padding: "40px 0",
    border: "1px solid lightgray"
  },
  backButton: {
    margin: "0 7px 0 0"
  },
  nextButton: {
    margin: "0 0 0 7px"
  },
  instructionsContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "25px 0"
  },
  instructions: {
    backgroundColor: "white",
    width: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "280px",
    padding: "0 0 10px 0",
    borderTop: "3px solid lightgray"
  },
  backNextButtonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0 0"
  },
  endMessage: {
    display: "flex",
    flexDirection: "column"
  },
  createProjAgain: {
    margin: "15px 0",
    padding: "15px"
    // borderTop: "3px solid lightgray"
  }
}));

function getSteps() {
  return ["Project Information", "Project Description", "Budget", "Schedule"];
}

function getStepContent(
  step,
  inputValues,
  handleOnChange,
  handleStartDate,
  handleEndDate
) {
  switch (step) {
    case 0:
      return (
        <ProjectInfo
          projectID={inputValues.projectID}
          projectName={inputValues.projectName}
          projectManager={inputValues.projectManager}
          handleChange={handleOnChange}
        />
      );
    case 1:
      return (
        <ProjectDesc
          projectDesc={inputValues.projectDesc}
          handleChange={handleOnChange}
        />
      );
    case 2:
      return <Budget cost={inputValues.cost} handleChange={handleOnChange} />;
    case 3:
      return (
        <Schedule
          startDate={inputValues.startDate}
          endDate={inputValues.endDate}
          handleStartChange={handleStartDate}
          handleEndChange={handleEndDate}
        />
      );
    default:
      return <></>;
  }
}

export default function ProjectCreate() {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("User"));

  const [inputValues, setInputValues] = useState({
    projectID: "",
    projectName: "",
    projectManager: user.first_name + " " + user.last_name,
    projectDesc: "",
    startDate: new Date(),
    endDate: new Date(),
    cost: ""
  });

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleStartDate = date => {
    setInputValues({ ...inputValues, startDate: date });
  };

  const handleEndDate = date => {
    setInputValues({ ...inputValues, endDate: date });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const data = {
      project_code: inputValues.projectID,
      project_manager_id: {
        employee_id: user.employee_id
      },
      project_name: inputValues.projectName,
      status: "OPEN",
      start_date: inputValues.startDate.toISOString().split("T", 1)[0],
      end_date: inputValues.endDate.toISOString().split("T", 1)[0],
      description: inputValues.projectDesc,
      budget_dollar: inputValues.cost,
      employees: [
        {
          employee_id: user.employee_id
        }
      ]
    };
    console.log(data);
    const response = agent.projects.createProject(data, token);
    console.log(response);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.instructionsContainer}>
        {activeStep === steps.length ? (
          <div className={classes.endMessage}>
            <Typography component={"span"} className={classes.instructions}>
              Project Created.
            </Typography>
            <Button onClick={handleReset}>Create another project</Button>
          </div>
        ) : (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              {getStepContent(
                activeStep,
                inputValues,
                handleOnChange,
                handleStartDate,
                handleEndDate
              )}
            </Typography>
            <div className={classes.backNextButtonContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.nextButton}
                >
                  Finish
                </Button>
              )}
              {activeStep != steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
