import React, { useState, useEffect } from "react";
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
import Alert from "../Alert/Alert";
import { ValidatorForm } from "react-material-ui-form-validator";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component let's the user create a new project
 */
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
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
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    borderRadius: "5px",
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
      return (
        <Budget
          cost={inputValues.cost}
          handleChange={handleOnChange}
          isDisabled={!inputValues.checkedLower}
        />
      );
    case 3:
      return (
        <Schedule
          startDate={inputValues.startDate}
          endDate={inputValues.endDate}
          handleStartChange={handleStartDate}
          handleEndChange={handleEndDate}
          isDisabled={!inputValues.checkedLower}
        />
      );
    case 4:
      return (
        <SelectEmployees
          handleTagsChange={handleTagsChange}
          project={inputValues.project}
          wpEmps={inputValues.wpEmps}
          isDisabled={!inputValues.checkedLower}
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

  useEffect(() => {
    ValidatorForm.addValidationRule("isRequired", (value) => {
      console.log(value);

      if (value.length === 0) {
        setValid(false);
        return false;
      } else {
        setValid(true);
        return true;
      }
    });
  }, []);

  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [valid, setValid] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(valid);

    // calculating the wp id here
    if (name === "wpParent") {
      var id = -1;
      var list = inputValues.wpList;
      list.sort();
      for (var wp in list) {
        if (
          list[wp].work_package_id.startsWith(value) &&
          parseInt(list[wp].work_package_id).toString().length ===
            value.length + 1
        ) {
          id = parseInt(list[wp].work_package_id) + 1;
        }
      }

      if (value === 0) {
        list.forEach((x) => {
          if (parseInt(x.work_package_id).toString().length === 1) {
            id = parseInt(x.work_package_id) + 1;
          }
        });
      }

      if (id === -1) {
        id = parseInt(value) * 10 + 1;
      }
      console.log(id);
      var newWPID = id;
      newWPID += inputValues.checkedLower ? "L" : "";
      console.log(newWPID);
      setInputValues({
        ...inputValues,
        wpID: newWPID,
        wpParent: value === "" ? "0" : value,
      });
    }
  };

  const handleStartDate = (date) => {
    setInputValues({ ...inputValues, startDate: date });

    setValid(true);
  };

  const handleEndDate = (date) => {
    setInputValues({ ...inputValues, endDate: date });

    setValid(true);
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
    if (inputValue.length > 0) {
      setValid(true);
    }

    setInputValues({ ...inputValues, wpEmps: inputValue });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    var data;
    if (inputValues.checkedLower) {
      const yearlyRateValues = await agent.yearlyRate.getYearlyRate(token);
      console.log(yearlyRateValues);

      var budget = inputValues.cost;

      var laborGrades = [];
      var gradeObj = {};
      var found;
      for (var item in inputValues.wpEmps) {
        gradeObj = {};
        var id = inputValues.wpEmps[item].labor_grade_id.labor_grade_id;
        found = false;
        laborGrades.forEach((x) => {
          if (x.id === id) {
            x.count++;
            found = true;
          }
        });
        if (!found) {
          gradeObj.id = id;
          gradeObj.count = 1;
          yearlyRateValues.forEach((x) => {
            if (x.labor_grade_id.labor_grade_id === id) {
              gradeObj.rate = x.charge_rate;
            }
          });
          laborGrades.push(gradeObj);
        }
      }
      var hoursForEach = calculateHours(budget, laborGrades);

      var workPackagePlanObj = {};
      var workPackagePlanArray = [];
      laborGrades.forEach((x) => {
        workPackagePlanObj = {};
        workPackagePlanObj.project_code = inputValues.project.project_code;
        workPackagePlanObj.work_package_id = inputValues.wpID;
        workPackagePlanObj.type = "BUDGET";
        workPackagePlanObj.start_date = inputValues.startDate
          .toISOString()
          .split("T", 1)[0];
        workPackagePlanObj.end_date = inputValues.endDate
          .toISOString()
          .split("T", 1)[0];
        workPackagePlanObj.revision = 1;
        workPackagePlanObj.labor_grade_id = x.id;
        workPackagePlanObj.quantity = x.count;
        workPackagePlanObj.plan_hour = hoursForEach;
        workPackagePlanObj.project_wp =
          inputValues.project.project_code + "_" + inputValues.wpID;
        workPackagePlanArray.push(workPackagePlanObj);
      });

      var empArray = [];
      inputValues.wpEmps.forEach((x) => {
        empArray.push(x);
      });

      data = {
        project: inputValues.project,
        work_package_id: inputValues.wpID,
        higher_work_package_id: inputValues.wpParent,
        responsible_person_id: {
          employee_id: inputValues.wpRE,
        },
        is_open: 1,
        description: inputValues.wpName + ": " + inputValues.Desc,
        project_wp: inputValues.project.project_code + "_" + inputValues.wpID,
        workPackagePlanCollection: workPackagePlanArray,
        employees: empArray,
      };
    } else {
      data = {
        project: inputValues.project,
        work_package_id: inputValues.wpID,
        higher_work_package_id: inputValues.wpParent,
        responsible_person_id: {
          employee_id: inputValues.wpRE,
        },
        is_open: 1,
        description: inputValues.wpName + ": " + inputValues.Desc,
        project_wp: inputValues.project.project_code + "_" + inputValues.wpID,
        employees: [],
      };
    }
    console.log(JSON.stringify(data));

    try {
      await agent.workpackages.createWorkpackage(data, token);
      setSuccessAlert(true);
      setErrorAlert(false);
    } catch (e) {
      setSuccessAlert(false);
      setErrorAlert(false);
    }

    setTimeout(() => {
      setErrorAlert(false);
      setSuccessAlert(false);
      props.history.push(`/dashboard/projects`);
    }, 1000);
  };

  const calculateHours = (budget, laborGrades) => {
    var avgRate = 0;
    var count = 0;
    laborGrades.forEach((x) => {
      avgRate += x.rate * x.count;
      count += x.count;
    });
    avgRate = avgRate / count;
    var avgHours = parseInt(budget) / avgRate / count;
    return avgHours.toFixed(2);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setValid(false);
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
        {errorAlert ? (
          <Alert
            config={{
              message: "Work Package Submission Failed",
              variant: "error",
            }}
          />
        ) : null}
        {successAlert ? (
          <Alert
            config={{
              message: `Work Package Submission Successful!`,
              variant: "success",
            }}
          />
        ) : null}
        <ValidatorForm onSubmit={handleSubmit}>
          <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div className={classes.instructionContainer}>
                <Typography component={"span"} className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div className={classes.bottomContainer}>
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
                      disabled={!valid}
                    >
                      Finish
                    </Button>
                  )}
                  {activeStep != steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={!valid}
                    >
                      Back
                    </Button>
                  )}
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
        </ValidatorForm>
      </div>
    </div>
  );
}
