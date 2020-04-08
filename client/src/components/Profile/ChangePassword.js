import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    width: "350px",
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    margin: "5px 0 0 0",
  },
  field: {},
  button: {
    width: "60%",
    marginTop: "35px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "35px 0 0 0 !important",
  },
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
          <ValidatorForm onSubmit={this.props.handleSubmit}>
            <div className={classes.field}>
              <div className={classes.title}>Change Password</div>
              {!this.props.hr ? (
                <TextValidator
                  value={this.props.oldPassword}
                  autoComplete={this.props.oldPassword}
                  className={classes.input}
                  name="oldPassword"
                  type="password"
                  helperText="Old Password"
                  fullWidth
                  onChange={(e) => this.props.formHandler(e)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validators={["isPassword"]}
                  errorMessages={["Password length has to be greater than 6"]}
                />
              ) : null}
              <TextValidator
                className={classes.input}
                name="newPassword"
                type="password"
                helperText="New Password"
                fullWidth
                onChange={(e) => this.props.formHandler(e)}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.props.newPassword}
                validators={["isPassword"]}
                errorMessages={["Password length has to be greater than 6"]}
              />

              <TextValidator
                className={classes.input}
                name="confirmPassword"
                type="password"
                helperText="Confirm New Password"
                fullWidth
                onChange={(e) => this.props.formHandler(e)}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.props.confirmPassword}
                validators={["isPassword"]}
                errorMessages={["Password length has to be greater than 6"]}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.props.handleSubmit}
            >
              Submit
            </Button>
          </ValidatorForm>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChangePassword);
