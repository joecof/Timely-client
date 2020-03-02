import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const styles = theme => ({
  text: {
    marginLeft: 30,
    color: 'black'
  }
});


class ExpansionMenuItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ExpansionPanelDetails>
        <Grid container direction="row" alignItems="center">
          <Grid item >
            <Avatar variant="circle" className={classes.avatar}/>
          </Grid>

          <Grid item >
            {this.props.resize ? <p className = {classes.text}>{this.props.text}</p> : null}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuItem);

