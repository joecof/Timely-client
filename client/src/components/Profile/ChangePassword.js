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
    width: "350px",
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    width: "100%",
    margin: "5px 0 0 0"
  },
  field: {

  },
  button: {
    width: "60%",
    marginTop: "35px"
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "35px 0 0 0 !important"
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
          <div className={classes.title}>
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
