import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { TextValidator} from 'react-material-ui-form-validator';

import './CreationWizard.css';

const useStyles = makeStyles(() => ({
  projDesc: {
    width: "100%",
  },
  projDescContainer: {
    width: "80%",
  },
}));

/**
 * Author: Prabh
 * Version: 1
 * Desc: second step for project creation
 */
const Desc = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.projDescContainer}>
      <form autoComplete="off">
      <TextValidator
        className={classes.projDesc}
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows="8"
        variant="outlined"
        name="Desc"
        value={props.Desc}
        onChange={props.handleChange}
        validators={['isRequired']}
        errorMessages={['Input is required.']}
      />
      </form>
    </div>
  );
};

export default Desc;
