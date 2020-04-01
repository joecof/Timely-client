import React from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button'
import "./ProjectDetail.css"

/**
 * Author: Prabh
 * Version: 1
 * Desc: List component to list all the workpackages visible to the user
*/

const columns = ["ID", "Name", "Supervisor", "Team"];

class WorkpackageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpList: props.wpList,
      type: props.type,
      data: []
    }
    this.options = {
      print: false,
      responsive: "scroll",
      selectableRows : false,
    //   onRowClick: (rowData, rowState) => {
    //     this.props.history.push({
    //       pathname: `/projectDetails`,
    //       state: {projectID: rowData[0]}
    //     })
    //   } 
    };
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.setData(this.state.wpList);
  }

  showReport(wpID) {
    console.log("showReport", wpID);
  }

  setData(wpList) {
      var self = this;
      //checking if PM ? show report button : don't show
      var button;
      if (this.state.type === 'PM' && columns.length === 4) {
        console.log("push report");
        columns.push("Report");
      }
      const data = [];
      var curData;
      wpList.map(function(wp) {
        curData = [];
        curData.push(wp.work_package_id);
        curData.push(wp.description);
        curData.push(wp.responsible_person_id.first_name + " " + wp.responsible_person_id.last_name);
        curData.push(wp.employees.length);
        if (self.state.type === 'PM') {
          button = <Button variant="contained" color="secondary" onClick={self.showReport.bind(self,[wp.work_package_id])}>Report</Button>;
        }
        curData.push(button);
        data.push(curData);
      });
      this.setState({
          data: data,
      })
  }

  render() {
    return (
      <MUIDataTable
        className="WorkpackageListDT"
        title={"Work Packages"}
        columns={columns}
        options={this.options}
        data={this.state.data}
      />
    )
  }
}

export default WorkpackageList;
