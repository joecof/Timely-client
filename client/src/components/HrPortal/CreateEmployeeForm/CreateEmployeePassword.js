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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "45px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "5px 0 0 0",
  },
  field: {
    marginTop: "50px",
    width: "100%",
  },
  button: {
    width: "60%",
    marginTop: "30px",
  },
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
      <div className={classes.container}>
        <ValidatorForm onSubmit = {this.props.handleSubmit}>
          <div className={classes.field}>
            <div className={classes.title}>Password</div>
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
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateEmployeePassword);
