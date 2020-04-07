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

class CustomToolbar extends React.Component {
  
  /**
   * Will be used to sumbit the iteration plan
   */
  render() {
    const { classes } = this.props;

    return (
      <>
        <Tooltip title={"Submit the plan"}>
          <Button 
            className={classes.iconButton} 
            // onClick={this.props.handleSubmit} 
            color='primary' 
            variant='contained'> 
              Submit 
          </Button> 
        </Tooltip>
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);