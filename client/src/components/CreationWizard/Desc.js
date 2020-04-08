import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { TextValidator} from 'react-material-ui-form-validator';

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

      <TextValidator
        className={classes.projDesc}
        id="outlined-multiline-static"
        label="Project Description"
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
  );
};

export default Desc;
