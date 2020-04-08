import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "./WorkpackageCreate.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for wp creation
 */
const WorkpackageInfo = props => {
  //ResponsibleEngineerData
  const REdata = [];
  props.project.employees.map(e => {
    var data = {};
    data.value = e.employee_id;
    data.label = e.first_name + " " + e.last_name;
    REdata.push(data);
  });

  const parentWP = [];
  parentWP.push({
    value: 0,
    label: "Project Level"
  })
  props.wpList.map(wp => {
    if (wp.work_package_id.substring(wp.work_package_id.length - 1) !== "L") {
      var data = {};
      data.value = wp.work_package_id;
      data.label = "WP" + wp.work_package_id + ": " + wp.description;
      parentWP.push(data);
    }
  });

  return (
    <form autoComplete="off">
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <TextField
            component={"span"}
            className="WPInfowidth"
            label="Work Package ID"
            name="wpID"
            value={"WP"+props.wpID}
            onChange={props.handleChange}
            disabled={true}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.checkedLower}
                onChange={props.handleCheckboxChange}
                name="checkedLower"
              />
            }
            label="Lowest Work Package"
          />
        </Grid>
        <br />
        <Grid item>
          <TextField
            component={"span"}
            className="WPInfowidth"
            label="Work Package Name"
            name="wpName"
            value={props.wpName}
            onChange={props.handleChange}
          />
        </Grid>
        <br />
        <Grid item>
          <TextField
            select
            label="Responsible Engineer"
            className="WPInfowidth"
            name="wpRE"
            value={props.wpRE}
            onChange={props.handleChange}
          >
            {REdata.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <br />
        <Grid item>
          <TextField
            component={"span"}
            className="WPInfowidth"
            label="Parent Project"
            value={
              props.project.project_code + ": " + props.project.project_name
            }
            onChange={props.handleChange}
            disabled={true}
          />
        </Grid>
        <br />
        <Grid item>
          <TextField
            select
            label="Parent Work Package"
            className="WPInfowidth"
            name="wpParent"
            value={props.wpParent}
            onChange={props.handleChange}
          >
            {parentWP.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
};

export default WorkpackageInfo;
