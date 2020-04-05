import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    marginTop: "20px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginTop: 30,
    marginBottom: 20,
    width: 100,
    height: 100,
    margin: "0 auto"
  },
  textContainer: {
    margin: "0 auto",
    width: 120,
    padding: 10
  },
  textHeader: {
    color: "gray"
  },
  text: {
    borderBottom: '1px solid lightgray'
  },
  chip: {
    margin: 5
  }, 
  textContainerChips: {
    margin: '0 auto', 
    width: 135,
    height:100,
    marginTop: 15
  },
  avatar: {
    width: 100,
    height: 100,
    margin: '0 auto'
  },
  faceIcon: {
    width: '100%',
    height: '100%'
  },
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: EmployeeInfo component.
 */
class EmployeeInfo extends Component {

  render() {
    const { classes, loadedUser } = this.props;

    return (
      <>
      {
        loadedUser ? (
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
                  disabled = {!this.props.hr}
                  defaultValue =  {loadedUser.employee_id}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}/>
            </div>
            <div className = {classes.textContainerChips}> 
            { this.props.isHr ? <Chip className = {classes.chip} icon={<FaceIcon />} label="HR" /> : null }
            { this.props.isAdmin ? <Chip className = {classes.chip} icon={<FaceIcon />} label="Admin" /> : null }
            { this.props.isSuperTimesheetApprover ? <Chip className = {classes.chip} icon={<FaceIcon />} label="Super Timesheet Approver" /> : null }
            </div>
          </Grid>)
          :
          null
      }
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeInfo);
