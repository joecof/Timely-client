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
 * Author: Joe
 * Version: 1.0 
 * Description: CustomToolBar component for the MUI data table  
 */
class CustomToolbar extends React.Component {
  
  /**
   * Will be used to add an employee
   */
  handleClick = () => {
    const { history } = this.props;
    history.push(`/dashboard/profile/`);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Tooltip title={"Add an Employee"}>
          <Button 
            className={classes.iconButton} 
            onClick={this.handleClick} 
            color='primary' 
            variant='contained'> 
              Create 
          </Button> 
        </Tooltip>
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);