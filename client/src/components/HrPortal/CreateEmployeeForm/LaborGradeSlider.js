import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = () => ({
  title: {
    marginBottom: 5,
  },
  field: {
    marginTop: 50
  },
  slider: {
    width: '90%'
  },
});

class LaborGradeSlider extends Component {
  render() {

    const { classes } = this.props;

    return (
      
      <div className = {classes.field}>
        <div>
        <Typography className = {classes.title} variant="h6"> Labor Grade </Typography>
        {
          this.props.marksValue || this.props.marksValue == undefined ? 
          <Slider
            defaultValue={!this.props.hr ? parseInt(this.props.marksValue) : 0}
            valueLabelFormat={(val) => this.props.valueLabelFormat(val)}
            onChange={(e, val) => this.props.getSliderValue(val) } 
            aria-labelledby="discrete-slider-restrict"
            className = {classes.slider}
            step={null}
            valueLabelDisplay="auto"
            marks={this.props.marks}
            disabled = {!this.props.hr}
            max = {7}
          />
          :
          <CircularProgress/>
        }
          </div>
        </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(LaborGradeSlider);

