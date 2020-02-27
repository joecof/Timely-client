import React, { Component } from 'react'
import './TimesheetRow.css'

export default class TimesheetRow extends Component {
    render() {
        return (
            <div className="timesheetRow">
                <input 
                    value="010"
                />
                <input className="inputs" value="EG12"/>
                <input className="inputs" value="14"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="2"/>
                <input className="inputs" value="Hello"/>
                <hr />
            </div>
        )
    }
}