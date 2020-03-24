import React, { useState} from "react";
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
import agent from '../../api/agent.js'
import "./ProjectCreate.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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

  const user = JSON.parse(localStorage.getItem('User'));

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
    const data = {
      "project_code": inputValues.projectID,
      "project_manager_id": {
        "employee_id": user.employee_id
      },
      "project_name": inputValues.projectName,
      "status": "OPEN",
      "start_date": inputValues.startDate.toISOString().split('T', 1)[0],
      "end_date": inputValues.endDate.toISOString().split('T', 1)[0],
      "description": inputValues.projectDesc,
      "budget_dollar": inputValues.cost,
      "employees": [
        {
          "employee_id": user.employee_id
        }
      ]
    };
    const response = agent.projects.createProject(data);
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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
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
            <div>
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
