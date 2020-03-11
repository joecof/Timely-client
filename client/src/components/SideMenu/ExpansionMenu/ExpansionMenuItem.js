import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Link } from "react-router-dom";


const styles = theme => ({
  text: {
    marginLeft: 30,
    color: 'black'
  }, 
  link: {
    textDecoration: 'none',
  },
});


class ExpansionMenuItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Link className = {classes.link} to= {this.props.link}>
      <ExpansionPanelDetails className = { classes.expansionPanelDetails}>
        <Grid container direction="row" alignItems="center">
          <Grid item >
            <Avatar variant="circle" className={classes.avatar}/>
          </Grid>
          <Grid item >
            {this.props.resize ? <p className = {classes.text}>{this.props.text}</p> : null}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      </Link>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenuItem);
