import React, { Component } from 'react';
import TimesheetDetail from '../TimesheetDetail/TimesheetDetail';
import { Button, Grid } from '@material-ui/core/';
import agent from '../../api/agent.js'
import Alert from '../Alert/Alert';

/**
 * Author: John Ham 
 * Version: 1.0 
 * Description: Timesheet Approver portal component. 
 * Allows a supervisor to see a timesheet that needs approving and 
 * approve or reject the timesheet.  
 */
export default class CheckTimesheet extends Component {
    constructor(props) {
        super(props); 

        this.state = ({
            errorAlert: false,
        });

        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.approveTimesheet = this.approveTimesheet.bind(this);
        this.rejectTimesheet = this.rejectTimesheet.bind(this);
        this.errorHandling = this.errorHandling.bind(this);
    }

    // Gets the current date.
    getCurrentDate() {
        var today = new Date().getTime();
        return today;
    }

    errorHandling() {
      this.setState({
        errorAlert: true,
      });
      setTimeout(() => {
        this.setState({
          errorAlert: false
        });
        this.props.history.push(`/dashboard/tsapprover/${this.props.match.params.id}`);
      }, 1000);
    }

    async approveTimesheet() {
        const token = localStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem('user'));
        var info = this.props.match.params;
        try {
            var timesheet = await agent.timesheetsInfo.getTimesheetById(info.id, token, info.tsid);
        } catch (e) {
            this.errorHandling();
            return;
        }
        timesheet.status = "APPROVED";
        timesheet.approver_id = user.employee_id;
        timesheet.approve_date = this.getCurrentDate();
        try {
            await agent.timesheetsInfo.updateTimesheetById(info.id, token, info.tsid, timesheet);
        } catch(e) {
            this.errorHandling();
            return;
        }
        this.props.history.push(`/dashboard/tsapprover/${info.id}`);
    }

    async rejectTimesheet() {
        const token = localStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem('user'));
        var info = this.props.match.params;
        try {
            var timesheet = await agent.timesheetsInfo.getTimesheetById(info.id, token, info.tsid);
        } catch (e) {
            this.errorHandling();
            return;
        }
        timesheet.status = "OPEN";
        timesheet.approver_id = user.employee_id;
        timesheet.approve_date = this.getCurrentDate();
        try {
            var response = await agent.timesheetsInfo.updateTimesheetById(info.id, token, info.tsid, timesheet);
        } catch (e) {
            this.errorHandling();
            return;
        }
        this.props.history.push(`/dashboard/tsapprover/${info.id}`);
    }

    render() {
        return (
            <div className="tsApproverPortal-container">
                <Grid container direction="column">
                    {this.state.errorAlert ? <Alert config = {{message: "An error has occurred. Please try again.", variant: "error"}}/> : null}
                    <TimesheetDetail
                        loadedUser={this.props.match.params.tsid}
                        {...this.props}
                    />
                    <Grid container direction="row" justify="center">
                        <Button className="tsButton" variant='contained' color="primary" onClick={this.approveTimesheet}>Approve</Button>
                        <Button className="tsButton" variant='contained' color="secondary" onClick={this.rejectTimesheet}>Reject</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}