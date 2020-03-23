/**
 * Author: Kang W 
 * Version: 1.0 
 * Description: Project Information on Dashboard
 */

import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../images/logo.png';
/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const styles = () => ({
    projDetail: {
        width: '90%',
        height: '105px',
        margin: '25px auto'
    },
    projName: {
        fontWeight: 'bold',
        margin: '2px 0 0 5px'
    },
    dueDateRow: {
        margin: '8px 0 0 10px'
    },
    dueDate: {
        color: 'grey',
        float: 'left',
    },
    dueDateVal: {
        marginLeft: '5px'
    },
    projManagerRow: {
        margin: '10px 0 0 20px',
        color: 'darkGrey',
    },
    circleStyle: {
        display:"inline-block",
        borderRadius: "50%",
        width:35,
        height:35,
        float: 'left',
    }, 
    projManagerName: {
        margin: '10px 0 0 15px',
        float: 'left',
    }
  });

class DashboardProtalProjInfo extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      const { classes } = this.props;
  
      return (
        <Paper className = {classes.projDetail} elevation = {2}>
            <div className = {classes.projName}>{this.props.projName}</div>
            <div className = {classes.dueDateRow}>
                <div className = {classes.dueDate}>Due Date:</div> 
                <div className = {classes.dueDateVal}>&nbsp;&nbsp;&nbsp;{this.props.dueDate}</div>
            </div>
            <div className = {classes.projManagerRow}>
                <img className = {classes.circleStyle} src={logo} alt="Logo" />
                <div className = {classes.projManagerName}>{this.props.projManagerName}</div>
            </div>
        </Paper>
      )
    }
  }
  
  export default withStyles(styles, { withTheme: true })(DashboardProtalProjInfo);