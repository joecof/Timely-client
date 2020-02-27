import React, { Component } from 'react'
import './Timesheet.css'
import TimesheetTitle from '../TimesheetTitle/Timesheettitle'
import TimesheetRowTitle from '../TimesheetRowTitle/TimesheetRowTitle'
import TimesheetRow from '../TimesheetRow/TimesheetRow'
import OtherRow from '../OtherRow/OtherRow'

export default class Timesheet extends Component {
    constructor(){
        super();

        this.state = {
            children: [<TimesheetRow />,
                <TimesheetRow />,
                <TimesheetRow />,
                <TimesheetRow />,
                <TimesheetRow />,
            ],
        }
    }
    // add new row event handler
    appendChild(){
        this.setState({
            children: [
                this.state.children,
                <TimesheetRow />
            ]
        });
    }

    render() {
        return (
            <div className="timesheet">
                <TimesheetTitle />
                <div className="timesheetinfo">
                    <TimesheetRowTitle />
                    <div className="timesheetRows">
                        {this.state.children.map(child => child)}
                        <OtherRow rowType="Total"/>
                        <OtherRow rowType="Overtime"/>
                        <OtherRow rowType="Flextime"/>
                    </div>
                    <button className="addRow" onClick={() => this.appendChild()}>Add Row</button>
                </div>
            </div>
        )
    }
}