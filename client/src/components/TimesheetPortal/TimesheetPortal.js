/**
 * Author: Kang Wang
 * Version: 1
 * Desc: TimesheetPortal Component 
 */
import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CurrentTimesheetToolBar from './CurrentTimesheetToolBar';
import './TimesheetPortal.css';

export default class TimesheetPortal extends Component {

  // css here
  // link: https://github.com/gregnb/mui-datatables/tree/master/examples
  getMuiTheme = () => createMuiTheme({
    overrides: {
    
    }
  });
  
  render() {

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
    const options = (props) => {
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
          return <CurrentTimesheetToolBar />
        },
        // css can also be here 
        // link: https://github.com/gregnb/mui-datatables/tree/master/examples
        setRowProps: () => {
          return {
            
          }
        }
      }
      return data;
    };

    // demo data
    const DemoData = 
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

    return (
      <>
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDatatable 
            className="datatable"
            title={<h1>Timesheet</h1>}
            options={options(this.props)}
            columns={columns}
            data={DemoData} />
      </MuiThemeProvider>
    </>
    )
  }

}