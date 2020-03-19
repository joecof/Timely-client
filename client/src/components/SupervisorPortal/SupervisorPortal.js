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
  {name:"pictureUrl", label:"Photo", className:"column"},
  {name:"employeeId", label:"Employee ID", className:"column"},
  {name:"firstName", label:"First Name", className:"column"},
  {name:"lastName", label:"Last Name", className:"column"},
];

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
      return <AssignToolBar />;
    }
  }
  return data;
};

/**
 * Demo data for now. 
 */
const demoData = 
    [{
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      employeeId: "1",
      firstName: "John",
      lastName: "Doe"
    },
    {
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      employeeId: "2",
      firstName: "Jane",
      lastName: "Kelly"
    },
    {
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      employeeId: "3",
      firstName: "Henry",
      lastName: "Peter"
    }]

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: HR Portal Component. Portal used by HR employee for editing/adding/archiving employee information. 
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

  //will use this function to fetch from backend soon 
  fetchData() {
    const { classes } = this.props; 
  
    var resultData = [];
    for (let i = 0; i < demoData.length; i++) {
        let pictureUrl = demoData[i].pictureUrl;
        let id = demoData[i].employeeId;
        let firstName = demoData[i].firstName;
        let lastName = demoData[i].lastName;

        let row = [];
        row.push(<img src= {pictureUrl} className = {classes.pictureUrl} alt = {firstName}/>);
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
    return (
      <>
      <MUIDatatable 
        className="datatable"
        title={<h1>Employees</h1>}
        options={options(this.props)}
        columns={columns}
        data={this.state.data}
      />
    </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SupervisorPortal);
