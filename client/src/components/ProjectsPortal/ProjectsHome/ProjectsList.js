import React from "react";
import MUIDataTable from "mui-datatables";
import CustomSelectProject from "./CustomSelectProject"
import "./ProjectsList.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: List component to list all the projects visible to the user
*/
const columns = ["ID", "Name", "Manager"];

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: ''
    }
    this.options = {
      print: false,
      responsive: "scroll",
      selectableRows : true,
      customToolbarSelect: (selectedRows) => <CustomSelectProject selectedRows={selectedRows} type={this.state.type}/>,
      onRowClick: (rowData, rowState) => {
        this.props.history.push({
          pathname: `/projectDetails`,
          state: {projectID: rowData[0]}
        })
      } 
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      data: nextProps.data,
      type: nextProps.type
     });  
  }

  render() {
    return (
      <MUIDataTable
        className="projects"
        title={"Projects"}
        columns={columns}
        options={this.options}
        data={this.state.data}
      />
    )
  }
}

export default ProjectsList;
