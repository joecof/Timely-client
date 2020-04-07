import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import ViewInfo from './ViewInfo'
import agent from '../../api/agent'

/**
 * Material UI styling JSON object. 
 */
const styles = () => ({
  pictureUrl: {
    width: 50
  }
});

/**
 * Defines the columns for the HR portal. 
 */
const columns = [
  { name: "WpId", label: "WorkPackage ID", className: "column" },
  { name: "PM", label: "Project Manager", className: "column" },
  { name: "Team", label: "Team", className: "column" },
];

/**
 * Configuration object for the MUI data table. 
 */
const options = (props, wpList) => {
  const { history } = props;
  const data = {
    selectableRows: false,
    search: true,
    print: false,
    download: false,
    filter: false,
    onRowClick: (rowData, rowState) => {
      console.log(rowData);
      var wp = null;
      wpList.forEach(x => {
        if (x.work_package_id === rowData[0]) {
          wp = x;
        }
      });
      props.history.push({
        pathname: `/workpackageDetail`,
        state: { wp: wp, isPM: false, isRE: true }
      });

    },
    textLabels: {
      body: {
        noMatch: <p>Sorry, you are not responsible for any work pacakges.</p>
      },
    }
  }
  return data;
};



class LeadEngineer extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      data: [],
      token: null,
      wpList: []
    })


    this.fetchData = this.fetchData.bind(this);
    // this.handleCreate = this.handleCreate.bind(this);
    // this.handleArchive = this.handleArchive.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);

  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    this.setState({
      token: token
    })

    this.fetchData(token);
  }


  //   handleArchive = async (id, body) => {
  //     const date = new Date().getTime();
  //     body.end_date = date;
  //     await agent.employeeInfo.updateEmployee(id, this.state.token, body);
  //     this.fetchData(this.state.token);
  //   }

  //   handleOpen = async (id, body) => {
  //     body.end_date = null;
  //     await agent.employeeInfo.updateEmployee(id, this.state.token, body);
  //     this.fetchData(this.state.token);
  //   }

  async fetchData(token) {
    const { classes } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user.employee_id;
    const resp = await agent.workpackages.getAllWorkpackageFromRE(userId, token);

    if (resp != null) {
      this.setState({
        wpList: resp
      })
    }

    var resultData = [];
    // console.log(resp);
    resp.forEach(async (item) => {
      let id = item.work_package_id;
      let pm = item.project.project_manager_id.first_name + " " +
        item.project.project_manager_id.last_name;



      let row = [];

      //Check if the wp is the lowest level
      if (id.endsWith("L")) {
        row.push(id);
        row.push(pm);
        // row.push(<ViewInfo 
        //   link={`/lead/workpackage/${id}`} 
        //   id = {id} 
        //   workpackage = {item} 
        //   />);
        resultData.push(row);
      }

    })

    this.setState({
      data: resultData
    })
  }

  render() {

    return (
      <>
        <MUIDatatable
          className="datatable"
          title={<h1> WorkPackage Reports</h1>}
          options={options(this.props, this.state.wpList)}
          columns={columns}
          data={this.state.data}
        />
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(LeadEngineer);
