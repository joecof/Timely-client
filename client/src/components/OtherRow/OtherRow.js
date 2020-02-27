import React, { Component } from 'react'
import './OtherRow.css'


export default class OtherRow extends Component {
    render() {
        return (
            <div className="otherRow">
                <div className="rowType">
                    {this.props.rowType}
                </div>
                <input className="tot" value="70"/>
                <hr />
            </div>
        )
    }
}