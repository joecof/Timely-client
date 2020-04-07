import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import agent from "../../api/agent.js";
import WorkpackageInfo from "./WorkpackageInfo";
import WorkpackageDesc from "../CreationWizard/Desc";
import Budget from "../CreationWizard/Budget";
import Schedule from "../CreationWizard/Schedule";
import SelectEmployees from "./SelectEmployees";
import "./WorkpackageCreate.css";
import WorkpackageList from "../ProjectDetail/WorkpackageList.js";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component let's the user create a new project
 */
const useStyles = makeStyles((theme) => ({
  container: {
    width: "1300px",
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: "1100px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepper: {
    padding: "40px 0",
    border: "1px solid lightgray",
  },
  instructionContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  instructions: {
    backgroundColor: "white",
    width: "450px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    padding: "50px 0 50px 0",
    borderTop: "3px solid lightgray",
    margin: "40px 0 0 0",
    borderRadius: "5px"
  },
  backNextButtonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0 0",
  },
}));

function getSteps() {
  return [
    "Work-Package Information",
    "Work-Package Description",
    "Budget",
    "Schedule",
    "Employees",
  ];
}

function getStepContent(
  step,
  inputValues,
  handleOnChange,
  handleStartDate,
  handleEndDate,
  handleCheckboxChange,
  handleTagsChange
) {
  switch (step) {
    case 0:
      return (
        <WorkpackageInfo
          wpList={inputValues.wpList}
          project={inputValues.project}
          wpID={inputValues.wpID}
          wpName={inputValues.wpName}
          wpRE={inputValues.wpRE}
          wpParent={inputValues.wpParent}
          checkedLower={inputValues.checkedLower}
          handleChange={handleOnChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
    case 1:
      return (
        <WorkpackageDesc
          Desc={inputValues.Desc}
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
    case 4:
      return (
        <SelectEmployees
          handleTagsChange={handleTagsChange}
          project={inputValues.project}
          wpEmps={inputValues.wpEmps}
        />
      );
  }
}

export default function WorkpackageCreate(props) {
  const classes = useStyles();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [inputValues, setInputValues] = useState({
    wpID: "",
    wpName: "",
    wpRE: "",
    wpParent: "",
    Desc: "",
    cost: "",
    startDate: new Date(),
    endDate: new Date(),
    checkedLower: false,
    wpList: props.location.wpList,
    project: props.location.project,
    wpEmps: [],
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });

    // calculating the wp id here
    if (name === "wpParent") {
      var id = -1;
      var list = inputValues.wpList;
      list.sort();
      for (var wp in list) {
        if (
          list[wp].work_package_id.startsWith(value) &&
          list[wp].work_package_id.length === value.length + 1
        ) {
          id = parseInt(list[wp].work_package_id) + 1;
        }
      }
      if (id === -1) {
        id = parseInt(value) * 10 + 1;
      }
      console.log(id);
      setInputValues({ ...inputValues, wpID: id + inputValues.wpID });
    }
  };

  const handleStartDate = (date) => {
    setInputValues({ ...inputValues, startDate: date });
  };

  const handleEndDate = (date) => {
    setInputValues({ ...inputValues, endDate: date });
  };

  const handleCheckboxChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.checked,
      wpID: event.target.checked
        ? inputValues.wpID + "L"
        : inputValues.wpID.replace("L", ""),
    });
  };

  const handleTagsChange = (inputValue) => {
    console.log(inputValue);
    setInputValues({ ...inputValues, wpEmps: inputValue });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    // const data = {
    //   "project_code": inputValues.projectID,
    //   "project_manager_id": {
    //     "employee_id": user.employee_id
    //   },
    //   "project_name": inputValues.projectName,
    //   "status": "OPEN",
    //   "start_date": inputValues.startDate.toISOString().split('T', 1)[0],
    //   "end_date": inputValues.endDate.toISOString().split('T', 1)[0],
    //   "description": inputValues.projectDesc,
    //   "budget_dollar": inputValues.cost,
    //   "employees": [
    //     {
    //       "employee_id": user.employee_id
    //     }
    //   ]
    // };
    // console.log(data);
    // const response = agent.projects.createProject(data, token);
    // console.log(response);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          className={classes.stepper}
          alternativeLabel
        >
          {steps.map((label) => (
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
            <div className={classes.instructionContainer}>
              <Typography component={"span"} className={classes.instructions}>
                {getStepContent(
                  activeStep,
                  inputValues,
                  handleOnChange,
                  handleStartDate,
                  handleEndDate,
                  handleCheckboxChange,
                  handleTagsChange
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
    </div>
  );
}
