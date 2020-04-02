import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles"
import './CreationWizard.css';

const useStyles = () => ({
  budgetInfo: {
    width: "280px"
  }
  });  

/**
 * Author: Prabh
 * Version: 1
 * Desc: Third step for project creation
 */
const ProjectInfo = (props) => {

  const classes = useStyles();

  return (
    <form autoComplete="off">
      <TextField component="span" className="margin" id="standard-basic" label="Cost" value={props.cost} name="cost" onChange={props.handleChange} className={classes.budgetInfo}/>
    </form>
  );
};

export default ProjectInfo;
