import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import logo from '../../images/logo.png'
import { Link } from "react-router-dom";


const styles = theme => ({
  
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  text: {
    marginLeft: 30,
    color: 'black'
  }, 
  link: {
    textDecoration: 'none',
  },
});


class MenuItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Link to = {this.props.link} className = {classes.link} >
        <Grid container direction="row" alignItems="center" className = {classes.menuItem} >
          <Grid item >
            {this.props.isMenuLogo ? 
              <Avatar variant="circle" className={classes.avatar} src = {logo}/> : <Avatar variant="square" className={classes.avatar}/>}
          </Grid>
          <Grid item >
            {this.props.text && this.props.resize ? 
              <p className = {classes.text}> {this.props.text} </p> : null}
          </Grid>
        </Grid>
      </Link>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MenuItem);
