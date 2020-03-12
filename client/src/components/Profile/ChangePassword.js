import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/**
 * Material UI styling JSON object. 
 */
const styles = () => ({
  container: {
    marginTop: 20,
  },
  title: {
    marginBottom: 5
  },
  input: {
    display: 'block',
    width: '90%'
  },
  field: {
    marginTop: 30
  },
  button: {
    width: '90%',
    marginTop: 20
  }
});

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: ChangePassword component. 
 */
class ChangePassword extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      loadedUser: this.props.loadedUser
    })
  }
  render() {
    const { classes } = this.props;

    return (
        <Grid item xs={4} className = {classes.container}>
          <div className = {classes.field}>
            <Typography className = {classes.title} variant="h6"> Change Password </Typography>
            <TextField
              className = {classes.input}
              placeholder = {this.props.loadedUser.password}
              helperText="Old Password"
              type="password"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className = {classes.input}
              placeholder = {this.props.loadedUser.password}
              helperText="New Password"
              type="password"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className = {classes.input}
              placeholder = {this.props.loadedUser.password}
              helperText="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button variant="contained" color="primary" className = {classes.button}> 
            Submit 
          </Button>
        </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ChangePassword);

