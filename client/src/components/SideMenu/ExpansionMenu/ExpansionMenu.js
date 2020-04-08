import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { withStyles } from '@material-ui/core/styles';
import ExpansionMenuItem from './ExpansionMenuItem'
import ExpansionMenuHeader from './ExpansionMenuHeader'

const styles = theme => ({
});
/**
 * Author: Joe 
 * Version: 1.0 
 * Description: ExpansionMenu component. Handles the expansion menu on the sidemenu.
 */
class ExpansionMenu extends Component {
  render() {
    return (
      <ExpansionPanel elevation={0} >
              {console.log(this.props)}

        <ExpansionMenuHeader loadedUser = {this.props.loadedUser} resize = {this.props.resize} />
        <ExpansionMenuItem text="Lead Engineer" resize = {this.props.resize} link = "/dashboard/lead"/>
        {
          this.props.loadedUser.is_hr_staff ? 
            <ExpansionMenuItem text="HR" resize = {this.props.resize} link = "/dashboard/hr"/>
            :
            null
        }
        {
          sessionStorage.is_supervisor == "true" ? 
            <ExpansionMenuItem text="Supervisor" resize = {this.props.resize} link = "/dashboard/supervisor"/>
            :
            null
        }
        {
          sessionStorage.is_supervisor == "true" || this.props.loadedUser.is_secondary_approver ?
            <ExpansionMenuItem text="Timesheet Approver" resize = {this.props.resize} link="/dashboard/tsapprover"/>
            :
            null
        }
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ExpansionMenu);

