import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import AssignToolBar from './AssignToolBar';
import agent from '../../api/agent.js'

/**
 * Defines the columns for the HR portal. 
 */
const columns = [
  {name:"employeeId", label:"Employee ID", className:"column"},
  {name:"firstName", label:"First Name", className:"column"},
  {name:"lastName", label:"Last Name", className:"column"},
];

/**
 * Author: John Ham 
 * Version: 1.0 
 * Description: Supervisor Portal Component. 
 * Portal used by supervisor for viewing a list of employees that can be assigned to projects. 
 */
class SupervisorPortal extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      data: []
    })

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Gets a list of all the employess from the database.
   */
  async getEmployees() {
    const token = localStorage.getItem("token");
    const response = agent.employeeInfo.getAllEmployees(token);
    return response;
  }

  /**
   * Gets the necessary information from the employees' data and stores
   * them in an array.
   */
  async fetchData() {
    const { classes } = this.props;
    console.log(this.props);

    var employeeData = await this.getEmployees();
    // console.log(employeeData);
  
    var resultData = [];
    for (let i = 0; i < employeeData.length; i++) {
        let id = employeeData[i].employee_id;
        let firstName = employeeData[i].first_name;
        let lastName = employeeData[i].last_name;

        let row = [];
        row.push(id);
        row.push(firstName);
        row.push(lastName);
        resultData.push(row);
    }
    
    this.setState({
      data: resultData
    })
  } 

  render() {
    const { classes } = this.props; 

    /**
     * Configuration object for the MUI data table. 
     */
    const options = () => {
        const data = {
          selectableRows: false,
          search: true,
          print: false,
          download: false,
          filter: false,
          customToolbar: () => {
              return <AssignToolBar history={this.props.history} />;
          },
          onRowClick: (rowData, rowState) => {
              this.props.history.push(`/dashboard/supervisor/${rowData[0]}`);
          },
        }
      return data;
    };

    return (
      <div>
      <MUIDatatable 
        className="datatable"
        title={<h1>Employees</h1>}
        options={options(this.props)}
        columns={columns}
        data={this.state.data}
      />
    </div>
    )
  }
}

export default SupervisorPortal;
