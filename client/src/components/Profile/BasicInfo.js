import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    width: "475px",
    padding: "0 50px 0 70px"
  },
  title: {
    marginBottom: 5,
    fontSize: "16px",
    fontWeight: "bold"
  },
  paper: {
    // height: 500
  },
  input: {
    display: "block",
    width: "90%",
    margin: "5px 0 0 0"
  },
  basicInfoContainer: {
    marginTop: "50px"
  },
  laborGradeContainer: {
    margin: "50px 0 0 0"
  },
  supervisorContainer: {
    margin: "50px 0 0 0"
  }
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: BasicInfo component.
 */
class BasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedUser: this.props.loadedUser
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.basicInfoContainer}>
          <div className={classes.title}>Basic Information</div>
          <TextField
            className={classes.input}
            placeholder=""
            helperText="First Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className={classes.input}
            placeholder=""
            helperText="Last Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>

        <div className={classes.laborGradeContainer}>
          <div className={classes.title}>Labor Grade</div>
          <TextField
            className={classes.input}
            placeholder=""
            helperText="Grade"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>

        <div className={classes.supervisorContainer}>
          <div className={classes.title}> Supervisor </div>
          <TextField
            className={classes.input}
            helperText="Supervisor"
            placeholder={this.props.loadedUser.supervisor_id}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BasicInfo);
