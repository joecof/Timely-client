/**
 * Author: Kang Wang
 * Version: 1
 * Desc: Timesheet Component 
 */
import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default class Timesheet extends Component {

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
    const options = {
      selectableRows: false,
      search: true,
      print: false,
      download: false,
      rowHover: true,
      onRowClick: (rowData, rowState) => {
        console.log(rowData[0]);
      },
      // css can also be here 
      // link: https://github.com/gregnb/mui-datatables/tree/master/examples
      setRowProps: () => {
        return {
          
        }
      }
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
            options={options}
            columns={columns}
            data={DemoData} />
      </MuiThemeProvider>
    </>
    )
  }

}