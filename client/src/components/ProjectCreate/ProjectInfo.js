import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextValidator } from 'react-material-ui-form-validator';
import './ProjectCreate.css';

const useStyles = makeStyles(theme => ({
  projInfo: {
    width: "280px"
  }
}));

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for project creation
 */
const ProjectInfo = (props) => {
    const classes = useStyles();

  return (
    <form>
      <TextValidator
        component={'span'} 
        className="margin" 
        label="Project ID" 
        name="projectID" 
        value={props.projectID} 
        onChange={props.handleChange} 
        className={classes.projInfo}
        validators={['isRequired']}
        errorMessages={['Input is required.']}
      />
      <br />
      <TextValidator
        component={'span'} 
        className="margin" 
        label="Project Name" 
        name="projectName" 
        value={props.projectName} 
        onChange={props.handleChange} 
        className={classes.projInfo}
        validators={['isRequired']}
        errorMessages={['Input is required.']}
      />
      <br />
      <TextValidator
        component={'span'} 
        className="margin" 
        label="Project Manager" 
        name="projectManager" 
        value={props.projectManager} 
        onChange={props.handleChange} 
        className={classes.projInfo}
        validators={['isRequired']}
        errorMessages={['Input is required.']}
      />
      <br />
    </form>
  );
};

export default ProjectInfo;
