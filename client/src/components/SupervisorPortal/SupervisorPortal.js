import React, { Component } from "react";
import MUIDatatable from "mui-datatables";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import AssignToolBar from "./AssignToolBar";

/**
 * Material UI styling JSON object.
 */
const styles = () => ({
  container: {
    width: "1300px",
    display: "flex",
    justifyContent: "center"
  },
  pictureUrl: {
    width: 50
  },
  employeeTitle: {
    fontSize: "16px",
    fontWeight: "bold"
  },
});

/**
 * Defines the columns for the HR portal.
 */
const columns = [
  { name: "pictureUrl", label: "Photo", className: "column" },
  { name: "employeeId", label: "Employee ID", className: "column" },
  { name: "firstName", label: "First Name", className: "column" },
  { name: "lastName", label: "Last Name", className: "column" }
];

/**
 * Demo data for now.
 */
const demoData = [
  {
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
  }
];

/**
 * Author: John Ham
 * Version: 1.0
 * Description: Supervisor Portal Component.
 * Portal used by supervisor for viewing a list of employees that can be assigned to projects.
 */
class SupervisorPortal extends Component {
  getCustomTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          data: {
            fontSize: "16px"
          }
        },
        MUIDataTable: {
          paper: {
            padding: "25px"
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
      data: [],
      selectedEmployee: { employeeId: "", employeeName: "" }
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

      let row = [];
      row.push(
        <img src={pictureUrl} className={classes.pictureUrl} alt={firstName} />
      );
      row.push(id);
      row.push(firstName);
      row.push(lastName);
      resultData.push(row);
    }

    this.setState({
      data: resultData
    });
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
          this.props.history.push(`/dashboard/supervisor/${rowData[1]}`);
        }
      };
      return data;
    };

    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={this.getCustomTheme()}>
          <MUIDatatable
            className="datatable"
            title={<div className={classes.employeeTitle}>Employees</div>}
            options={options(this.props)}
            columns={columns}
            data={this.state.data}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SupervisorPortal);
