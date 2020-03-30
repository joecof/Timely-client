import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "./ProjectCreate.css";

const useStyles = makeStyles(theme => ({
  scheduleInfo: {
    width: "280px"
  }
}));

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for project creation
 */
const ProjectInfo = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});

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
          className={classes.scheduleInfo}
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
          className={classes.scheduleInfo}
        />
      </MuiPickersUtilsProvider>
    </form>
  );
};

export default ProjectInfo;
