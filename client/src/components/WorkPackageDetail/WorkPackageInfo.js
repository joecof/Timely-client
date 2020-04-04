import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import './WorkPackageCreate.css';

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
    <form autoComplete="off">
      <TextField component={'span'} className="margin" label="Project ID" name="projectID" 
      value={props.projectID} onChange={props.handleChange} className={classes.projInfo}/>
      <br />
      <TextField component={'span'} className="margin" label="Project Name" name="projectName" 
      value={props.projectName} onChange={props.handleChange} className={classes.projInfo}/>
      <br />
      <TextField component={'span'} className="margin" label="Project Manager" name="projectManager" 
      value={props.projectManager} onChange={props.handleChange} className={classes.projInfo}/>
    </form>
  );
};

export default ProjectInfo;
