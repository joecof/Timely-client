import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './ProjectCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for project creation
 */
const ProjectInfo = (props) => {

  return (
    <form autoComplete="off">
      <TextField component={'span'} className="margin" label="Project ID" name="projectID" 
      value={props.projectID} onChange={props.handleChange}/>
      <br />
      <TextField component={'span'} className="margin" label="Project Name" name="projectName" 
      value={props.projectName} onChange={props.handleChange}/>
      <br />
      <TextField component={'span'} className="margin" label="Project Manager" name="projectManager" 
      value={props.projectManager} onChange={props.handleChange}/>
    </form>
  );
};

export default ProjectInfo;
