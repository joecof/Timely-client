import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import SupervisorList from './SupervisorList'
import FaceIcon from '@material-ui/icons/Face';
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
  slider: {
    width: '90%'
  },
  supervisorField: {
    marginTop: 20,
    marginBottom: 20 
  },
  supervisorName: {
    display: 'inline'
  }
});


/**
 * Author: Joe 
 * Version: 1.0 
 * Description: CreateEmployeeBasicInfo component. 
 */
class BasicInfo extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid item xs={4} className = {classes.container}>
          <div className = {classes.field}>
            <Typography className = {classes.title} variant="h6"> Basic Information </Typography>
            <TextField
              className = {classes.input}
              disabled = {!this.props.hr}
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
              helperText="Middle Name"
              onChange = {(e) => this.props.formHandler(e)}
              name = "middleName"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className = {classes.input}
              disabled = {!this.props.hr}
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
          <Typography className = {classes.title} variant="h6"> Labor Grade </Typography>
            <Slider
              defaultValue={0}
              valueLabelFormat={this.props.valueLabelFormat}
              onChange={(e, val) => this.props.getSliderValue(val) } 
              aria-labelledby="discrete-slider-restrict"
              className = {classes.slider}
              step={null}
              valueLabelDisplay="auto"
              marks={this.props.marks}
              max = {7}
            />
          </div>
          <div className = {classes.field}>
          <Grid container spacing={1} className = {classes.container}>
            <Grid item xs={6}>
              <SupervisorList hr = {this.props.hr} selectSupervisor = {this.props.selectSupervisor}/>
            </Grid>
            <Grid item xs={6}>
            { 
              this.props.supervisorSelected ?
              <Chip className = {classes.chip} icon={<FaceIcon />} label= {this.props.supervisorName} /> : null
            }
            </Grid>
          </Grid>
          </div>
          <div className = {classes.field}>
            <Typography className = {classes.title} variant="h6"> 
              Vacation Days 
            </Typography>
            <TextField
              className = {classes.input}
              helperText="Vacation Days"
              type="number"
              name="vacation"
              onChange = {(e) => this.props.formHandler(e)}
              disabled = {!this.props.hr}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}/>
          </div>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BasicInfo);

