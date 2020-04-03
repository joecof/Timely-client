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
 * Description: CreateEmployeePassword component. 
 */
class CreateEmployeePassword extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    const { classes } = this.props;   

    return (
      <>
        <Grid item xs={4} className = {classes.container}>
          <div className = {classes.field}>
            <Typography className = {classes.title} variant="h6"> Password </Typography>
            <TextField
              className = {classes.input}
              name="newPassword"
              type="password"
              helperText="New Password"
              fullWidth
              onChange = {(e) => this.props.formHandler(e)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className = {classes.input}
              name="confirmPassword"
              type="password"
              helperText="Confirm New Password"
              fullWidth
              onChange = {(e) => this.props.formHandler(e)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button variant="contained" color="primary" className = {classes.button} onClick = {this.props.handleSubmit}> 
            Submit 
          </Button>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreateEmployeePassword);

