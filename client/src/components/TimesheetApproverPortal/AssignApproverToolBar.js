import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core/';

/**
 * Material UI styling JSON object. 
 */
const defaultToolbarStyles = {
  iconButton: {
    marginLeft: 30
  },
};

/**
 * Author: John Ham
 * Version: 1.0 
 * Description: AssignApproverToolBar component for the MUI data table  
 */
class AssignApproverToolBar extends React.Component {

  /**
   * Will be used to assign an employee the privilege to approve timesheets
   */
  clickAssign = () => {
    this.props.history.push(`/dashboard/tsapprover/assign`);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Tooltip title={"Assign an employee to as a timesheet approver"}>
          <Button 
            className={classes.iconButton} 
            onClick={this.clickAssign} 
            color='primary' 
            variant='contained'> 
              Assign or Remove
          </Button> 
        </Tooltip>
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(AssignApproverToolBar);