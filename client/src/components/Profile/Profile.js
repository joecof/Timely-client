import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '600px',
  }
});


class Profile extends Component {

  render() {
    const { classes } = this.props;

    console.log(this.props);

    return (
      <div className={classes.root}>
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper >Header</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h1>Employee Information</h1>
                <Avatar alt="employee photo" src="/static/images/avatar/1.jpg" />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h1>Basic Information</h1>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h1>Edit Information</h1>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
