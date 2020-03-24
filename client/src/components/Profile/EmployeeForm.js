import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EmployeeInfo from './EmployeeInfo'
import BasicInfo from './BasicInfo'
import ChangePassword from './ChangePassword'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 750,
  },
  divider: {
    margin: 45,
    height: 690
  }
});

class EmployeeForm extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Paper className = {classes.paper} elevation = {2}>
          <Grid container spacing={1}>
            <EmployeeInfo loadedUser = {this.props.loadedUser} />
            <Divider orientation="vertical" flexItem className = {classes.divider}/>
            <BasicInfo loadedUser = {this.props.loadedUser} />
            <Divider orientation="vertical" flexItem className = {classes.divider}/>
            <ChangePassword loadedUser = {this.props.loadedUser} />
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeForm);

