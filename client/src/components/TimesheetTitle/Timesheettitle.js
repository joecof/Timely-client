import React, { Component } from 'react'
import './Timesheettitle.css'

export default class TimesheetTitle extends Component {
    render() {
        return (
            <div className="timesheetTitle">
                <div className="attributeRow">
                    <div className="empNumTitle">
                        Employee Number:
                    </div>
                    <div className="empNum">
                        P001
                    </div>
                    <div className="weekNumTitle">
                        Week Number:
                    </div>
                    <div className="weekNum">
                        28
                    </div>
                    <div className="weekEndTitle">
                        Week Ending:
                    </div>
                    <div className="weekEnd">
                        12/08/03
                    </div>
                </div>
                <div className="attributeRow">
                    <div className="empNameTitle">
                        Name:
                    </div>
                    <div className="empName">
                        Pablo Escobar
                    </div>
                </div>
            </div>
        )
    }
}