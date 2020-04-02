import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid'
import './WorkpackageCreate.css';

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for wp creation
 */
const WorkpackageInfo = (props) => {

  return (
    <form autoComplete="off">
      <Grid container direction="column" alignItems="flex-start">
        <Grid item>
        <TextField component={'span'} className="margin" label="Work Package ID" name="wpID" 
          value={props.wpID} onChange={props.handleChange} disabled={true}/>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={props.checkedLower} onChange={props.handleCheckboxChange} name="checkedLower" />}
            label="Lowest Work Package"
          />
        </Grid>
      <br />
        <Grid item>
          <TextField component={'span'} className="margin" label="Work Package Name" name="wpName" 
          value={props.wpName} onChange={props.handleChange}/>
        </Grid>
          <br />
        <Grid item>
          <TextField component={'span'} className="margin" label="Responsible Engineer" name="wpRE" 
          value={props.wpRE} onChange={props.handleChange}/>
        </Grid>
          <br />
        <Grid item>
          <TextField component={'span'} className="margin" label="Parent Project" name="projectName" 
          value={props.projectName} onChange={props.handleChange}/>
        </Grid>
          <br />
        <Grid item>
          <TextField component={'span'} className="margin" label="Parent Work Package" name="wpParent" 
          value={props.wpParent} onChange={props.handleChange}/>
        </Grid>
      </Grid>
    </form>
  );
};

export default WorkpackageInfo;
