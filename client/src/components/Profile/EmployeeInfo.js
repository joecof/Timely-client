import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

const styles = () => ({
  container: {
    marginTop: 20,
  },
  avatar: {
    marginTop: 30,
    marginBottom: 20,
    width: 100,
    height: 100,
    margin: '0 auto'
  },
  textContainer: {
    margin: '0 auto', 
    width: 120,
    padding: 10
  }, 
  textHeader: {
    color: 'gray'
  },
  text: {
    borderBottom: '1px solid lightgray'
  }
});


class EmployeeInfo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={2} className = {classes.container}>
          <Avatar className = {classes.avatar} alt="employee photo" src="https://api4u.azurewebsites.net/images/flintstone/fred.png" />
          <div className = {classes.textContainer}>
            <Typography className = {classes.textHeader}>Employee ID</Typography>
            <Typography className = {classes.text}> {this.props.loadedUser.employee_id}</Typography>
          </div>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeInfo);
