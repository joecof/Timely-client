import React from "react";
import MUIDataTable from "mui-datatables";
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
      wpList: [],
      type: '',
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

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      wpList: nextProps.wpList,
      type: nextProps.type
     }, () =>
        this.setData(this.state.wpList)
     );  
  }

  setData(wpList) {
      const data = [];
      var curData;
      wpList.map(function(wp) {
        curData = [];
        curData.push(wp.work_package_id);
        curData.push(wp.description);
        curData.push(wp.responsible_person_id.first_name + " " + wp.responsible_person_id.last_name);
        curData.push(wp.employees.length);
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
