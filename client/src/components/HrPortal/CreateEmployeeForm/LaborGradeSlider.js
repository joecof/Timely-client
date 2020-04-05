import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
    )
  }
}

export default withStyles(styles, { withTheme: true })(LaborGradeSlider);

