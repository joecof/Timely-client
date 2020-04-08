import React, { Component } from "react";
import MUIDatatable from "mui-datatables";
import agent from "../../api/agent";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "./LeadEngineer.css";
import Alert from '../Alert/Alert'

/**
 * Defines the columns for the RE portal.
 */
const columns = [
  { name: "WpId", label: "WorkPackage ID", className: "column" },
  { name: "PM", label: "Project Manager", className: "column" },
  { name: "Members", label: "Members", className: "column" },
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
      wpList.forEach((x) => {
        if (x.work_package_id === rowData[0]) {
          wp = x;
        }
      });
      props.history.push({
        pathname: `/workpackageDetail`,
        state: { wp: wp, isPM: false, isRE: true },
      });
    },
    textLabels: {
      body: {
        noMatch: <p>Sorry, you are not responsible for any work pacakges.</p>,
      },
    },
  };
  return data;
};

class LeadEngineer extends Component {
  getCustomTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          data: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        MUIDataTable: {
          paper: {
            padding: "45px",
          },
        },
        MUIDataTableToolbar: {
          titleText: {
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0 0 0 15px"
          },
          root: {
            padding: "0px"
          }
        },
      },
    });

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      token: null,
      wpList: [],
      errorAlert:false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    this.setState({
      token: token,
    });

    this.fetchData(token);
  }

  async fetchData(token) {

    try {
      const { classes } = this.props;
      const user = JSON.parse(sessionStorage.getItem('user'));
      const userId = user.employee_id;
      const resp = await agent.workpackages.getAllWorkpackageFromRE(userId, token);

      if (resp != null) {
        this.setState({
          wpList: resp
        })
      }

      // console.log(resp);
      var resultData = [];
      resp.forEach(async (item) => {
        let id = item.work_package_id;
        let pm = item.project.project_manager_id.first_name + " " +
          item.project.project_manager_id.last_name;
        let team = item.employees.length;
        let row = [];

        //Check if the wp is the lowest level
        if (id.endsWith("L")) {
          row.push(id);
          row.push(pm);
          row.push(team);
          resultData.push(row);
        }

      })

      this.setState({
        data: resultData
      })
    } catch (e) {
      console.error(e);
      this.setState({
        errorAlert: true
      })
      this.props.sessionLogoutHandler();
    }
  }

  render() {
    return (
      <>
        <div className="leadEngineer-container">
          <MuiThemeProvider theme={this.getCustomTheme()}>
          {this.state.errorAlert ? <Alert config = {{message: "WorkPackage API Call Failed", variant: "error"}}/> : null}
            <MUIDatatable
              className="datatable"
              title={"WorkPackage Reports"}
              options={options(this.props, this.state.wpList)}
              columns={columns}
              data={this.state.data}
            />
          </MuiThemeProvider>
        </div>
      </>
    );
  }
}

export default LeadEngineer;
