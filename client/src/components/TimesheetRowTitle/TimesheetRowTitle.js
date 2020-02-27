import React, { Component } from 'react'
import './TimesheetRowTitle.css'

export default class TimesheetRowTitle extends Component {
    render() {
        return (
            <div className="timesheetRowTitle">
                <div className="firstAttri">
                    Proj
                </div>
                <div className="otherAttri">
                    WP
                </div>
                <div className="otherAttri">
                    Tot
                </div>
                <div className="otherAttri">
                    Sun
                </div>
                <div className="otherAttri">
                    Mon
                </div>
                <div className="otherAttri">
                    Tue
                </div>
                <div className="otherAttri">
                    Wed
                </div>
                <div className="otherAttri">
                    Thu
                </div>
                <div className="otherAttri">
                    Fri
                </div>
                <div className="otherAttri">
                    Sat
                </div>
                <div className="otherAttri">
                    Sick
                </div>
                <div className="otherAttri">
                    Vac
                </div>
                <div className="otherAttri">
                    Notes
                </div>
            </div>
        )
    }
}