import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";

const columns = [
  {name:"name", label:"Employee", className:"column"},
];

const options = {
  selectableRows: false,
  search: true,
  print: false,
  download: false,
  filter: false,
};

export default class HR extends Component {

  render() {

    const DemoData = 
    [{
      pictureUrl: "",
      name: "John Doe"
    },
    {
      pictureUrl:"",
      name: "Jane Smith"
    },
    {
      pictureUrl:"",
      name: "Fred Jones"
    }]

    return (
      <>
      <MUIDatatable 
          className="datatable"
          title={<h1> Manage Employees</h1>}
          options={options}
          columns={columns}
          data={DemoData}
      />
    </>
    )
  }
}
