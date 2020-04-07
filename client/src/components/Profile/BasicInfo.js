import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SupervisorList from '../HrPortal/CreateEmployeeForm/SupervisorList'
import FaceIcon from '@material-ui/icons/Face';
import LaborGradeSlider from '../HrPortal/CreateEmployeeForm/LaborGradeSlider'

import Chip from '@material-ui/core/Chip';

/**
 * Material UI styling JSON object. 
 */
const styles = () => ({
  title: {
    marginBottom: 5,
  },
  paper: {
    height: 600
  },
  input: {
    display: 'inline-block',
    width: '90%'
  },
  field: {
    marginTop: 50
  },
  avatar: {
    display: 'inline-block',
    marginRight: '5%'
  },
  inputSupervisor: {
    width: '77%'
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
  }

  render() {
    const { classes, supervisor } = this.props;

    return (
      <>
        {
          supervisor ? 
            (
              <Grid item xs={4} className = {classes.container}>
                <div className = {classes.field}>
                  <Typography className = {classes.title} variant="h6"> Basic Information </Typography>
                  <TextField
                    className = {classes.input}
                    disabled = {!this.props.hr}
                    defaultValue = {this.props.loadedUser.first_name}
                    helperText="First Name"
                    onChange = {(e) => this.props.formHandler(e)}
                    name = "firstName"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    className = {classes.input}
                    disabled = {!this.props.hr}
                    defaultValue = {this.props.loadedUser.last_name}
                    helperText="Last Name"
                    name="lastName"
                    onChange = {(e) => this.props.formHandler(e)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className = {classes.field}>
                  <LaborGradeSlider 
                    valueLabelFormat = {this.props.valueLabelFormat}
                    getSliderValue = {this.props.getSliderValue}
                    marks = {this.props.marks} 
                    hr = {this.props.hr}
                    marksValue = {this.props.marksValue}

                  />
                </div>
                <div className = {classes.field}>
                  <Grid container spacing={1} className = {classes.container}>
                    <Grid item xs={6}>
                      <SupervisorList hr = {this.props.hr} selectSupervisor = {this.props.selectSupervisor}/>
                    </Grid>
                    <Grid item xs={6}>
                      <Chip className = {classes.chip} icon={<FaceIcon />} label= {this.props.supervisorName} />
                    </Grid>
                  </Grid>
                </div>
                <div className = {classes.field}>
                <Typography className = {classes.title} variant="h6"> Vacation Days </Typography>
                <TextField
                    className = {classes.input}
                    disabled = {!this.props.hr}
                    defaultValue = {this.props.loadedUser.vacation}
                    helperText="Vacation Days"
                    onChange = {(e) => this.props.formHandler(e)}
                    name = "vacation"
                    type = "number"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Grid>
            ) : 
            null
        }    
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BasicInfo);

