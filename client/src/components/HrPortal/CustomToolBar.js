import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core/';


const defaultToolbarStyles = {
  iconButton: {
    marginLeft: 30
  },
};

class CustomToolbar extends React.Component {
  
  handleClick = () => {
    console.log("add an employee!");
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