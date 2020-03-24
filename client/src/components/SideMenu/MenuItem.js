import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import logo from '../../images/logo.png'
import { Link } from "react-router-dom";

/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const styles = theme => ({
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  text: {
    marginLeft: 30,
    color: 'black'
  }, 
  link: {
    textDecoration: 'none',
  },
});

/**
 * Author: Lawrence 
 * Version: 1.0 
 * Description: MenuItem Component. Component for each menu item. 
 */
class MenuItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      
      <Link className = {classes.link} to = {this.props.isMenuLogo ? '/dashboard' : this.props.link } >
        <Grid container direction="row" alignItems="center" className = {classes.menuItem} >
          <Grid item >
            {this.props.isMenuLogo ? 
              <Avatar variant="circle" className={classes.avatar} src = {logo}/> : <Avatar variant="square" className={classes.avatar}/>}
          </Grid>
          <Grid item onClick = {this.props.handleClick}>
            {this.props.text && this.props.resize ? 
              <p className = {classes.text}> {this.props.text} </p> : <p className = {classes.text}> Timely </p>}
          </Grid>
        </Grid>
      </Link>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MenuItem);
