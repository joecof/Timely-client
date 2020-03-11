import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { withStyles } from '@material-ui/core/styles';
import ExpansionMenuItem from './ExpansionMenuItem'
import ExpansionMenuHeader from './ExpansionMenuHeader'

//For styling later
const styles = theme => ({

});

class ExpansionMenu extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ExpansionPanel className = {classes.expansionPanel} elevation={0}>
        <ExpansionMenuHeader loadedUser = {this.props.loadedUser} resize = {this.props.resize} />
        <ExpansionMenuItem text="Profile" resize = {this.props.resize} link = "/dashboard/profile"/>
        <ExpansionMenuItem text="Lead Engineer" resize = {this.props.resize} link = "/dashboard/lead"/>
        <ExpansionMenuItem text="Supervisor" resize = {this.props.resize} link = "/dashboard/supervisor"/>
        <ExpansionMenuItem text="HR" resize = {this.props.resize} link = "/dashboard/hr"/>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenu);

