import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "./ProjectCreate.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for project creation
 */
const ProjectInfo = () => {
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});

  return (
    <form autoComplete="off">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Start Date"
        />
        <br />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="End Date"
        />
      </MuiPickersUtilsProvider>
    </form>
  );
};

export default ProjectInfo;
