import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './ProjectCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: second step for project creation
 */
const ProjectDesc = (props) => {

  return (
    <form autoComplete="off">
      <TextField
          className="margin"
          id="outlined-multiline-static"
          label="Project Description"
          multiline
          rows="8"
          variant="outlined"
          name="projectDesc"
          value={props.projectDesc}
          onChange={props.handleChange}
        />
    </form>
  );
};

export default ProjectDesc;
