import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/**
 * Material UI styling JSON object. 
 */
const styles = () => ({
  title: {
    marginBottom: 5
  },
  paper: {
    height: 600
  },
  input: {
    display: 'block',
    width: '90%'
  },
  field: {
    marginTop: 50
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

    this.state = ({
      loadedUser: this.props.loadedUser
    })
  }
  render() {
    const { classes } = this.props;

    return (
        <Grid item xs={4} className = {classes.container}>
          <div className = {classes.field}>
            <Typography className = {classes.title} variant="h6"> Basic Information </Typography>
            <TextField
              className = {classes.input}
              placeholder = {this.props.loadedUser.first_name}
              helperText="First Name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className = {classes.input}
              placeholder = {this.props.loadedUser.last_name}
              helperText="Last Name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
         
          <div className = {classes.field}>
          <Typography className = {classes.title} variant="h6"> Labor Grade </Typography>
          <TextField
              className = {classes.input}
              placeholder = {this.props.loadedUser.labor_grade_id}
              helperText="Grade"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className = {classes.field}>
            <Typography className = {classes.title} variant="h6"> Supervisor </Typography>
            <TextField
              className = {classes.input}
              helperText="Supervisor"
              placeholder = {this.props.loadedUser.supervisor_id}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BasicInfo);

