import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './ProjectCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: Third step for project creation
 */
const ProjectInfo = (props) => {

  return (
    <form autoComplete="off">
      <TextField component="span" className="margin" id="standard-basic" label="Cost" value={props.cost} name="cost" onChange={props.handleChange}/>
    </form>
  );
};

export default ProjectInfo;
