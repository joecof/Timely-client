import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import ProjectInfo from "./ProjectInfo";
import ProjectDesc from "./ProjectDesc";
import Budget from "./Budget";
import Schedule from "./Schedule";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component will help the user create a new project. Project Creation Wizard
 */

function getSteps() {
  return ["Project Information", "Project Description", "Budget", "Schedule"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProjectInfo />;
    case 1:
      return <ProjectDesc />;
    case 2:
      return <Budget />;
    case 3:
      return <Schedule />;
    default:
      return <ProjectInfo />;
  }
}

const ProjectCreate = () => {
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
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <React.Fragment>{getStepContent(index)}</React.Fragment>
              <div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default ProjectCreate;
