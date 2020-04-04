import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import './CreationWizard.css';

const useStyles = () => ({
projDesc: {
  width: "310px"
}
});

/**
 * Author: Prabh
 * Version: 1
 * Desc: second step for project creation
 */
const Desc = (props) => {
  const classes = useStyles();

  return (
    <form autoComplete="off">
      <TextField
          className={classes.projDesc}
          id="outlined-multiline-static"
          label="Project Description"
          multiline
          rows="8"
          variant="outlined"
          name="projectDesc"
          value={props.Desc}
          onChange={props.handleChange}
        />
    </form>
  );
};

export default Desc;
