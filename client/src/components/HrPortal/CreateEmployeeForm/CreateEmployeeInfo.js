import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import Switch from '@material-ui/core/Switch';


/**
 * Material UI styling JSON object. 
 */
const styles = () => ({
  container: {
		marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    margin: '0 auto'
  },
  textContainer: {
    margin: '0 auto', 
    width: 135,
  }, 
  textHeader: {
		color: 'black',
		marginBottom: 10,
		marginTop: 10
  },
  textHeaderRole: {
    marginTop: 50,
    marginBottom: 25
  },
  text: {
    borderBottom: '1px solid lightgray'
  },
  faceIcon: {
    width: '100%',
    height: '100%'
  },
  switch: {
		color: 'green',
		marginLeft: 100
  }
});

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: CreateEmployeeInfo component. 
 */
class CreateEmployeeInfo extends Component {

  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid item xs={2} className = {classes.container}>
          <Avatar className = {classes.avatar} alt="employee photo" >
            <FaceIcon className = {classes.faceIcon}/>
          </Avatar>
          <div className = {classes.textContainer}>
            <Typography className = {classes.textHeader}>Employee ID</Typography>
            <TextField
                className = {classes.text}
                name="employeeId"
                onChange = {(e) => this.props.formHandler(e)}
                // disabled = {!this.props.hr}
                disabled = {true}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}/>
          </div>

          <div className = {classes.textContainer}>
					<Typography className = {classes.textHeaderRole}>Role</Typography>
          <Grid container spacing={1}>
					  <Grid item xs={6}  >
							<p>HR</p>
						</Grid>
						<Grid item xs={6}>
							<Switch checked={this.props.isHr} name="isHr" color="primary" onClick = {this.props.isHrSwitch}/>
						</Grid>
						<Grid item xs={6} >
							<p>Admin</p>
						</Grid>
						<Grid item xs={6}>
							<Switch checked={this.props.isAdmin} name="isHr" color="primary" onClick = {this.props.isAdminSwitch}/>
						</Grid>
						<Grid item xs={6} >
							<p>Super Timesheet Approver</p>
						</Grid>
						<Grid item xs={6}>
							<Switch checked={this.props.isSuperTimesheetApprover} name="isHr" color="primary" onClick = {this.props.isSuperTimesheetApproverSwitch}/>
						</Grid>
          </Grid>
          </div>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreateEmployeeInfo);
