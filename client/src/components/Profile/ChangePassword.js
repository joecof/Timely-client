import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    marginTop: 20,
    width: "475px",
    padding: "0 50px 0 70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginBottom: 5
  },
  input: {
    width: "90%",
    margin: "3px 0 0 !important"
  },
  field: {
    marginTop: 30
  },
  button: {
    width: "160px",
    marginTop: "35px"
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold"
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
      <div className={classes.container}>
          <div className = {classes.field}>
          <div className={classes.title} variant="h6">
            Change Password
          </div>
            <TextField
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
            />
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
        </div>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ChangePassword);
