import React, { Component } from "react";
import MUIDatatable from "mui-datatables";
import CustomToolbar from "./CustomToolBar";
import Alert from "../Alert/Alert";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "./iterationPlanCreate.css";

/**
 * Author : Lawrence , Prabh
 *
 * @param {JSON} } self
 */

/**
 * Defines the columns for the current iteration plan.
 */
const columns = (self) => {
  return [
    {
      name: "empId",
      label: "Employee ID",
      className: "column",
    },
    {
      name: "empName",
      label: "Employee Name",
      className: "column",
    },
    {
      name: "LG",
      label: "Labor Grade",
      className: "column",
    },
    {
      name: "Hours",
      label: "Hours",
      className: "column",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <input
                type="number"
                value={
                  self.state.data[tableMeta.rowIndex][tableMeta.columnIndex]
                }
                onChange={(event) => {
                  var data = self.state.data;
                  data[tableMeta.rowIndex][tableMeta.columnIndex] =
                    event.target.value;
                  updateValue(event.target.value);
                  self.setState({
                    data: data,
                  });
                }}
              />
            </div>
          );
        },
      },
    },
  ];
};

/**
 * Configuration for the MUI data table.
 */
const options = (props, self) => {
  const { history } = props;

  const data = {
    selectableRows: false,
    search: false,
    print: false,
    download: false,
    filter: false,
    customToolbar: () => {
      if (self.data.length > 0) {
        return (
          <CustomToolbar
            history={history}
            data={self.data}
            wp={self.wp}
            revision={self.revision}
          />
        );
      }
    },
  };

  return data;
};

class IterationPlanCreate extends React.Component {
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
            margin: "0 0 0 15px",
          },
          root: {
            padding: "0px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            fontSize: "16px",
          },
        },
      },
    });

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      wp: this.props.location.wp,
      revision: 0,
      errorAlert: false,
      successAlert: false,
    };
  }

  componentDidMount() {
    try {
      console.log(this.state.wp);
      var data = [];
      var revision = 0;
      this.state.wp.employees.forEach((e) => {
        var thisData = [];
        thisData.push(e.employee_id);
        thisData.push(e.first_name + " " + e.last_name);
        thisData.push(e.labor_grade_id.labor_grade_id);
        data.push(thisData);
      });

      var found = false;
      var revisionA = 0;
      this.state.wp.workPackagePlanCollection.forEach((plan) => {
        console.log("WP!");
        if (plan.type === "ESTIMATE") {
          found = true;
          if (plan.revision > revisionA) {
            revisionA = plan.revision;
            data.forEach((d) => {
              console.log("in here");
              if (d[2] === plan.labor_grade_id) {
                d[3] = plan.plan_hour / plan.quantity;
              }
            });
          }
        }
      });

      revision = revisionA + 1;

      if (!found) {
        revision = 1;
        console.log("BUDGET");
        var revisionB = 0;
        this.state.wp.workPackagePlanCollection.forEach((plan) => {
          if (plan.revision > revisionB) {
            console.log("Found Revision");
            revisionB = plan.revision;
            data.forEach((d) => {
              console.log("Data");
              console.log(d[2]);
              console.log(plan.labor_grade_id);
              if (d[2] === plan.labor_grade_id) {
                console.log(plan.plan_hour);
                d[3] = plan.plan_hour / plan.quantity;
              }
            });
          }
        });
      }

      this.setState({
        data: data,
        revision: revision,
      });

      console.log(data);
    } catch (e) {
      console.error(e);
      this.setState({
        errorAlert: true,
      });
    }
  }

  render() {
    return (
      <div className="iterationPlanCreate-container">
        <MuiThemeProvider theme={this.getCustomTheme()}>
          {this.state.errorAlert ? (
            <Alert
              config={{
                message: "WorkPackage API Call Failed",
                variant: "error",
              }}
            />
          ) : null}
          <MUIDatatable
            className="datatable"
            title={<div className="iteration-tableTitle"> Iteration Progress</div>}
            options={options(this.props, this.state)}
            columns={columns(this)}
            data={this.state.data}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default IterationPlanCreate;
