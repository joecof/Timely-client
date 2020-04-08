import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { withStyles } from '@material-ui/core/styles';
import ExpansionMenuItem from './ExpansionMenuItem'
import ExpansionMenuHeader from './ExpansionMenuHeader'
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import '../SideMenu.css'


const styles = theme => ({
    
});

const expansion = {
  backgroundColor: 'transparent !important'
}
/**
 * Author: Joe 
 * Version: 1.0 
 * Description: ExpansionMenu component. Handles the expansion menu on the sidemenu.
 */
class ExpansionMenu extends Component {
  render() {
    return (
      <ExpansionPanel elevation={0} className="expansion-root">
        <ExpansionMenuHeader loadedUser = {this.props.loadedUser} resize = {this.props.resize} />
        <ExpansionMenuItem text="Responsible Engineer" resize = {this.props.resize} link = "/dashboard/lead"/>
        <ExpansionMenuItem text="Supervisor" resize = {this.props.resize} link = "/dashboard/supervisor"/>
        <ExpansionMenuItem text="Timesheet Approver" resize = {this.props.resize} link="/dashboard/tsapprover"/>
        <ExpansionMenuItem text="HR" resize = {this.props.resize} link = "/dashboard/hr"/>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenu);
