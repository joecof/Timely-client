import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import AssignToolBar from './AssignToolBar';


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
  {name:"projectId", label:"Project ID", className:"column"},
  {name:"projectName", label:"Project Name", className:"column"},
  {name:"projectManager", label:"Project Manager", className:"column"},
];

/**
 * Demo data for now. 
 */
const demoData = 
    [{
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      projectId: "1",
      projectName: "Building a database",
      firstName: "John",
      lastName: "Doe"
    },
    {
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      projectId: "2",
      projectName: "Software Development",
      firstName: "Jane",
      lastName: "Kelly"
    },
    {
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      projectId: "3",
      projectName: "Creating a website",
      firstName: "Henry",
      lastName: "Peter"
    }]

/**
 * Author: John Ham 
 * Version: 1.0 
 * Description: Supervisor Portal Component. 
 * List of projects that an employee is assigned to. 
 */
class ProjectsAssignedTo extends Component {

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

  //will use this function to fetch from backend soon 
  fetchData() {
    const { classes } = this.props; 
  
    var resultData = [];
    for (let i = 0; i < demoData.length; i++) {
        let pictureUrl = demoData[i].pictureUrl;
        let id = demoData[i].projectId;
        let projectName = demoData[i].projectName;
        let name = demoData[i].firstName + " " + demoData[i].lastName;

        let row = [];
        row.push(id);
        row.push(projectName);
        row.push(<><img src= {pictureUrl} className = {classes.pictureUrl} alt = {name}/> <span>{name}</span></>);

        resultData.push(row);
    }
    
    this.setState({
      data: resultData
    })
  } 

  render() {
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
        }
        return data;
    };

    return (
      <>
      <MUIDatatable 
        className="datatable"
        title={<h1>Projects Assigned To</h1>}
        options={options(this.props)}
        columns={columns}
        data={this.state.data}
      />
    </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ProjectsAssignedTo);
