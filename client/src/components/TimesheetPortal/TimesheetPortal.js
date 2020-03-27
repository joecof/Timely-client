/**
 * Author: Kang Wang
 * Version: 1
 * Desc: TimesheetPortal Component 
 */
import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import CurrentTimesheetToolBar from './CurrentTimesheetToolBar';
import './TimesheetPortal.css';
import agent from "../../api/agent";

// demo data
const demoData = 
  [{
    timesheetid:'T123',
    weeknumber: '23',
    weekending:'12/12/2019',
    status: 'Pending'
  },
  {
    timesheetid:'T122',
    weeknumber:'22',
    weekending:'06/12/2019',
    status: 'Approved'
  },
  {
    timesheetid:'T121',
    weeknumber:'21',
    weekending:'30/11/2019',
    status: 'Rejected'
  }];

  // static columns
  const columns = [
    {
      name:"timesheetid", 
      label:"Timesheet ID", 
      className:"column",
      options: {
        filter: false
      }
    },
    {
      name:"weeknumber", 
      label:"Week Number", 
      className:"column",
      options: {
        filter: false
      }
    },
    {
      name:"weekending", 
      label:"Week Ending", 
      className:"column",
      options: {
        sort: true,
        filter: false
        // display false
      }
  },
    {
      name:"status", 
      label:"Status", 
      className:"column",
      options: {
        filter: true
      }
    },
  ];

  // static options
  const options = (props, states) => {
    const data = {
      selectableRows: false,
      search: true,
      print: false,
      download: false,
      rowHover: true,
      onRowClick: (rowData, rowState) => {
        props.history.push(`/dashboard/timesheet/${rowData[0]}`);
      },
      customToolbar: () => {
        return <CurrentTimesheetToolBar states={states}/>
      }
    }
    return data;
  };

export default class TimesheetPortal extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      timesheets: [],
      loadedUser: {}
    })

    this.fetchTimesheets = this.fetchTimesheets.bind(this);
  }

  // on page load fetching timesheets data
  componentDidMount() {
    this.fetchTimesheets();
  }

  // Fetching Timesheets
  async fetchTimesheets() {
    // fetch logined user
    // const currentUserId = this.props.match.params.id;
    // const response = await agent.employeeInfo.getCurrentUser(currentUserId);
    // this.setState({
    //   loadedUser: response
    // });

    // fetching timesheets
    var timesheetsData = [];

    for (let i = 0; i < demoData.length; i++) {
        let timesheetid = demoData[i].timesheetid;
        let weeknumber = demoData[i].weeknumber;
        let weekending = demoData[i].weekending
        let status = demoData[i].status;

        let row = [];
        row.push(timesheetid);
        row.push(weeknumber);
        row.push(weekending);
        row.push(status);
        timesheetsData.push(row);
    }
    
    this.setState({
      timesheets: timesheetsData
    })
  } 

  render() {
    return (
      <>
        <MUIDatatable 
            className="datatable"
            title={<h1>Timesheet</h1>}
            options={options(this.props, this.state)}
            columns={columns}
            data={this.state.timesheets} />
      </>
    )
  }
}