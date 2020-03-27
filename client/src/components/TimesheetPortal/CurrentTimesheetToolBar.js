/**
 * Author: Joe, Kang
 * Version: 1
 * Desc: Create Current Timesheet Button Function
 */
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core/';
import agent from "../../api/agent";

/**
 * Material UI styling JSON object. 
 */
const defaultToolbarStyles = {
  iconButton: {
    marginLeft: 30
  },
};

class CurrentTimesheetToolBar extends React.Component {

  constructor(props) {
    super(props); 

    this.createCurrentTimesheet = this.createCurrentTimesheet.bind(this);
    this.hasCurrentTimesheet = this.hasCurrentTimesheet.bind(this);
  }

  // check if fetched timesheets has currentTimesheet
  hasCurrentTimesheet() {
    console.log(this.props.states);
    return false;
  }

  // create currentTimesheet
  createCurrentTimesheet() {
    console.log("create current time sheet here");
  }
  
  /**
   * Will be used to add an employee
   */
  handleClick = () => {
    // create currentTimesheet if doesnt have
    if(!this.hasCurrentTimesheet()) {

      this.createCurrentTimesheet();

    } else {  // go to currentTimesheet Detail
      console.log("go to currentTimesheetDetail");
    }
  }

  render() {
    // styling
    const { classes } = this.props;
    return (
      <>
        <Tooltip title={"Create Current Timesheet"}>
          <Button 
            className={classes.iconButton} 
            onClick={this.handleClick} 
            color='primary' 
            variant='contained'> 
              Current Timesheet
          </Button> 
        </Tooltip>
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CurrentTimesheetToolBar" })(CurrentTimesheetToolBar);