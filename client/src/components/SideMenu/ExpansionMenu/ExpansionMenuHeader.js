import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  
  text: {
    marginLeft: 30,
    color: 'black'
  },
});


class ExpansionMenuHeader extends Component {

  render() {
    const { classes } = this.props;

    return (
      <ExpansionPanelSummary
        expandIcon={this.props.resize ? <ExpandMoreIcon className={classes.materialIconLight}/> : null}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Avatar variant="circle" className={classes.avatar} />
        </Grid>
        <Grid item>
          {this.props.resize ? 
            <h4 className = {classes.text}> {this.props.loadedUser.first_name + " " + this.props.loadedUser.last_name} </h4> : null
          }
        </Grid>
      </Grid> 
    </ExpansionPanelSummary>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuHeader);