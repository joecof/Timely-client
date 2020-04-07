import React, { Component } from 'react';
import TimesheetDetail from '../TimesheetDetail/TimesheetDetail';
import { Button } from '@material-ui/core/';
import agent from '../../api/agent.js'

export default class CheckTimesheet extends Component {
    constructor(props) {
        super(props); 
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.approveTimesheet = this.approveTimesheet.bind(this);
        this.rejectTimesheet = this.rejectTimesheet.bind(this);
    }

    // converting weekending api from milliseconds to date format
    getCurrentDate() {
        var today = new Date().getTime();
        return today;
    }

    async approveTimesheet() {
        const token = localStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem('user'));
        var info = this.props.match.params;
        var timesheet = await agent.timesheetsInfo.getTimesheetById(info.id, token, info.tsid);
        timesheet.status = "APPROVED";
        timesheet.approver_id = user.employee_id;
        timesheet.approve_date = this.getCurrentDate();
        var response = await agent.timesheetsInfo.updateTimesheetById(info.id, token, info.tsid, timesheet);
        console.log(response);
        this.props.history.push(`/dashboard/tsapprover/${info.id}`);
    }

    async rejectTimesheet() {
        const token = localStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem('user'));
        var info = this.props.match.params;
        var timesheet = await agent.timesheetsInfo.getTimesheetById(info.id, token, info.tsid);
        timesheet.status = "OPEN";
        timesheet.approver_id = user.employee_id;
        timesheet.approve_date = this.getCurrentDate();
        var response = await agent.timesheetsInfo.updateTimesheetById(info.id, token, info.tsid, timesheet);
        console.log(response);
        this.props.history.push(`/dashboard/tsapprover/${info.id}`);
    }

    render() {
        return (
            <>
                <TimesheetDetail
                    loadedUser={this.props.match.params.tsid}
                    {...this.props}
                />
                <Button variant='contained' color="primary" onClick={this.approveTimesheet}>Approve</Button>
                <Button variant='contained' color="secondary" onClick={this.rejectTimesheet}>Reject</Button>
            </>
        )
    }
}