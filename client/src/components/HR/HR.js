import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import MoreVertOption from './MoreVertOption'

const styles = theme => ({
  pictureUrl: {
    width: 50
  }
});

const columns = [
  {name:"pictureUrl", label:"Photo", className:"column"},
  {name:"employeeId", label:"Employee ID", className:"column"},
  {name:"firstName", label:"First Name", className:"column"},
  {name:"lastName", label:"Last Name", className:"column"},
  {name:"laborGrade", label:"Labor Grade", className:"column"},
  {name:"supervisor", label:"Supervisor", className:"column"},
  {name:"edit", label:"Edit", className:"column"},
];

const options = (props) => {

  const data = {
    selectableRows: false,
    search: true,
    print: false,
    download: false,
    filter: false,
    onRowClick: (rowData, rowState) =>  {
      // props.history.push(`/dashboard/hr/employee/${rowData.id}`);
    },
  }
  

  return data;
};

const demoData = 
    [{
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      employeeId: "A01",
      firstName: "John",
      lastName: "Doe", 
      laborGrade: "A",
      supervisor: "Bruce Link"
    },
    {
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      employeeId: "A02",
      firstName: "Jane",
      lastName: "Kelly", 
      laborGrade: "A",
      supervisor: "Bruce Link"
    },
    {
      pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
      employeeId: "A03",
      firstName: "Henry",
      lastName: "Peter", 
      laborGrade: "A",
      supervisor: "Bruce Link"
    }]

class HR extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      data: []
    })

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();

    console.log(this.props);
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
        let laborGrade = demoData[i].laborGrade;
        let supervisor = demoData[i].supervisor;

        let row = [];
        row.push(<img src= {pictureUrl} className = {classes.pictureUrl} alt = {firstName}/>);
        row.push(id);
        row.push(firstName);
        row.push(lastName);
        row.push(laborGrade);
        row.push(supervisor);
        row.push(<MoreVertOption link={`/dashboard/hr/employee/${id}`}/>);
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
          title={<h1> Manage Employees</h1>}
          options={options(this.props)}
          columns={columns}
          data={this.state.data}
      />
    </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(HR);
