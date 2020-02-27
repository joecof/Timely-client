import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'

const columns = [
  {name:"project", label:"Project", className:"column"},
  {name:"wp", label:"WP", className:"column"},
  {name:"total", label:"Total", className:"column"},
  {name:"sat", label:"Sat", className:"column"},
  {name:"sun", label:"Sun", className:"column"},
  {name:"mon", label:"Mon", className:"column"},
  {name:"tue", label:"Tue", className:"column"},
  {name:"wed", label:"Wed", className:"column"},
  {name:"thur", label:"Thur", className:"column"},
  {name:"fri", label:"Fri", className:"column"},
];

const options = {
  selectableRows: false,
  search: true,
  print: false,
  download: false,
  filter: false,
};


export default class Timesheet_v2 extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }


  render() {

    const DemoData = 
      [{
        project: '010', 
        wp: 'SICK', 
        total: '4.0',
        sat: '2.0',
        sun: '2.0',
        mon: '2.0',
        tue: '2.0',
        wed: '2.0',
        thur: '2.0',
        fri: '2.0',
      },
      {
        project: '011', 
        wp: 'WORK', 
        total: '4.0',
        sat: '2.0',
        sun: '2.0',
        mon: '2.0',
        tue: '2.0',
        wed: '2.0',
        thur: '2.0',
        fri: '2.0',
      }]
    

    return (
      <>
        <MUIDatatable 
            className="datatable"
            title={<h1> Timesheet </h1>}
            options={options}
            columns={columns}
            data={DemoData}
        />
      </>
    )
  }
}

