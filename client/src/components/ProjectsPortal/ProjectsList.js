import React from "react";
import MUIDataTable from "mui-datatables";

/**
 * Author: Prabh
 * Version: 1
 * Desc: List component to list all the projects visible to the user
 */

const columns = ["ID", "Name", "Manager"];

const data = [
  ["P1234", "Project A", "Kang"],
  ["P123", "Project B", "Joe"],
  ["P1234", "Project C", "Oscar"],
  ["P1234", "Project D", "Bruce"],
  ["P1234", "Project E", "Sham"]
];

const options = {
  selectableRows: false,
  print: false,
}

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.setState({
      data: data,
    })
  }

  render() {
    return (
      <MUIDataTable
        title={"Projects"}
        columns={columns}
        options={options}
        data={this.state.data}
      />
    )
  }
}

export default ProjectsList;
