import React, { Component } from "react";
import MUIDatatable from "mui-datatables";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import MoreVertOption from "./MoreVertOption";
import CustomToolbar from "./CustomToolBar";
import "./HrPortal.css";

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
  { name: "pictureUrl", label: "Photo", className: "column" },
  { name: "employeeId", label: "Employee ID", className: "column" },
  { name: "firstName", label: "First Name", className: "column" },
  { name: "lastName", label: "Last Name", className: "column" },
  { name: "laborGrade", label: "Labor Grade", className: "column" },
  { name: "supervisor", label: "Supervisor", className: "column" },
  { name: "edit", label: "Edit", className: "column" }
];

/**
 * Configuration object for the MUI data table.
 */
const options = props => {
  const { loadedUser, history } = props;

  const data = {
    selectableRows: false,
    search: true,
    print: false,
    download: false,
    filter: false,
    customToolbar: () => {
      return <CustomToolbar history={history} />;
    }
  };
  return data;
};

/**
 * Demo data for now.
 */
const demoData = [
  {
    pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
    employeeId: "1",
    firstName: "John",
    lastName: "Doe",
    laborGrade: "A",
    supervisor: "Bruce Link"
  },
  {
    pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
    employeeId: "2",
    firstName: "Jane",
    lastName: "Kelly",
    laborGrade: "A",
    supervisor: "Bruce Link"
  },
  {
    pictureUrl: "https://api4u.azurewebsites.net/images/flintstone/fred.png",
    employeeId: "3",
    firstName: "Henry",
    lastName: "Peter",
    laborGrade: "A",
    supervisor: "Bruce Link"
  }
];

/**
 * Author: Joe
 * Version: 1.0
 * Description: HR Portal Component. Portal used by HR employee for editing/adding/archiving employee information.
 */
class HrPortal extends Component {
  getCustomTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          data: {
            fontSize: "16px",
          }
        },
        MUIDataTableBodyCell: {
          root: {
            fontSize: "14px"
          }
        },
        MUIDataTableToolbar: {
          root: {
            padding: "0px 0 0 16px"
          }
        }
      }
    });

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

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
      let laborGrade = demoData[i].laborGrade;
      let supervisor = demoData[i].supervisor;

      let row = [];
      row.push(
        <img src={pictureUrl} className={classes.pictureUrl} alt={firstName} />
      );
      row.push(id);
      row.push(firstName);
      row.push(lastName);
      row.push(laborGrade);
      row.push(supervisor);
      row.push(<MoreVertOption link={`/dashboard/hr/${id}`} />);
      resultData.push(row);
    }

    this.setState({
      data: resultData
    });
  }

  render() {
    return (
      <div className="hrPortal-container">
        <MuiThemeProvider theme={this.getCustomTheme()}>
          <MUIDatatable
            className="hrPortal-datatable"
            title={<div className="hrPortal-title"> Manage Employees</div>}
            options={options(this.props)}
            columns={columns}
            data={this.state.data}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HrPortal);
