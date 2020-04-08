import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';



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
  }

  render() {
    const { classes } = this.props;   

    return (
      <>
          <Grid item xs={4} className = {classes.container}>
          <ValidatorForm onSubmit = {this.props.handleSubmit}>
            <div className = {classes.field}>
              <Typography className = {classes.title} variant="h6"> Change Password </Typography>
              {
                !this.props.hr ? 
                  <TextValidator
                    value = {this.props.oldPassword}
                    autoComplete = {this.props.oldPassword}
                    className = {classes.input}
                    name="oldPassword"
                    type="password"
                    helperText="Old Password"
                    fullWidth
                    onChange = {(e) => this.props.formHandler(e)}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    validators={['isPassword']}
                    errorMessages={['Password length has to be greater than 6']}
                  />
                : null 
              }

              <TextValidator
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
                value = {this.props.newPassword}
                validators={['isPassword']}
                errorMessages={['Password length has to be greater than 6']}
              />

              <TextValidator
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
                value = {this.props.confirmPassword}
                validators={['isPassword']}
                errorMessages={['Password length has to be greater than 6']}
              />
            </div>
            <Button variant="contained" color="primary" type="submit" className = {classes.button}> 
              Submit 
            </Button>
            </ValidatorForm>
          </Grid>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ChangePassword);

