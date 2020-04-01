import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './WorkpackageCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for wp creation
 */
const WorkpackageInfo = (props) => {

  return (
    <form autoComplete="off">
      <TextField component={'span'} className="margin" label="Work Package ID" name="wpID" 
      value={props.wpID} onChange={props.handleChange}/>
      <br />
      <TextField component={'span'} className="margin" label="Work Package Name" name="wpName" 
      value={props.wpName} onChange={props.handleChange}/>
      <br />
      <TextField component={'span'} className="margin" label="Responsible Engineer" name="wpRE" 
      value={props.wpRE} onChange={props.handleChange}/>
      <br />
      <TextField component={'span'} className="margin" label="Parent Project" name="projectName" 
      value={props.projectName} onChange={props.handleChange}/>
      <br />
      <TextField component={'span'} className="margin" label="Parent Work Package" name="wpParent" 
      value={props.wpParent} onChange={props.handleChange}/>
    </form>
  );
};

export default WorkpackageInfo;
