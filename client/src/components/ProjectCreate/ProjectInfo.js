import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './ProjectCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for project creation
 */
const ProjectInfo = () => {
  const [projectID, setProjectID] = useState({});
  const [projectName, setProjectName] = useState({});
  const [projectManager, setProjectManager] = useState({});

  return (
    <form autoComplete="off">
      <TextField className="margin" id="standard-basic" label="Project ID" />
      <br />
      <TextField className="margin" id="standard-basic" label="Project Name" />
      <br />
      <TextField className="margin" id="standard-basic" label="Project Manager" />
    </form>
  );
};

export default ProjectInfo;
