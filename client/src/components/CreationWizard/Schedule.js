import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "./CreationWizard.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for project creation
 */
const ProjectInfo = (props) => {

  return (
    <form autoComplete="off">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          label="Start Date"
          name="startDate"
          value={props.startDate}
          onChange={props.handleStartChange}
        />
        <br />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          label="End Date"
          name="endDate"
          value={props.endDate}
          onChange={props.handleEndChange}
        />
      </MuiPickersUtilsProvider>
    </form>
  );
};

export default ProjectInfo;
