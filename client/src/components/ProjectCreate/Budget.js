import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './ProjectCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: Third step for project creation
 */
const ProjectInfo = () => {
  const [cost, setCost] = useState({});
  const [schedule, setSchedule] = useState({});

  return (
    <form autoComplete="off">
      <TextField className="margin" id="standard-basic" label="Cost" />
      <br />
      <TextField className="margin" id="standard-basic" label="Schedule" />
    </form>
  );
};

export default ProjectInfo;
