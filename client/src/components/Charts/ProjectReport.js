import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import agent from "../../api/agent";
import { isNullOrUndefined } from "util";

class ProjectReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpList: this.props.wpList,
      data: []
    };

    this.setData = this.setData.bind(this);
  }

  async componentDidMount() {
    await this.setData();
  }

  async setData() {
    console.log(this.props.wpList);
    var empList = [];
    var wpLowerList = [];
    var data = [];

    this.props.wpList.forEach(wp => {
      if (wp.work_package_id.includes("L")) {
        wpLowerList.push(wp);
        wp.employees.forEach(e => {
          if (empList.indexOf(e.employee_id) === -1)
            empList.push(e.employee_id);
        });
      }
    });

    var response = [];
    if (empList.length > 0) {
      const token = localStorage.getItem("token");
      response = await agent.timesheetsInfo.getTimesheetsByEmps(
        empList.toString(),
        token
      );
    }

    var obj = {};
    wpLowerList.forEach(wp => {
      obj = {};
      obj.wp = wp.work_package_id;
      obj.employees = [];

      var empData = {};
      wp.employees.forEach(e => {
        empData = {};
        empData.id = e.employee_id;
        empData.name = e.first_name + " " + e.last_name;
        empData.hours = 0;
        response.forEach(ts => {
          if (ts.employee.employee_id === e.employee_id) {
            ts.details.forEach(tsRow => {
              if (
                tsRow.project_wp ===
                wp.project.project_code + "_" + wp.work_package_id
              ) {
                empData.hours +=
                  tsRow.saturday +
                  tsRow.sunday +
                  tsRow.monday +
                  tsRow.tuesday +
                  tsRow.wednesday +
                  tsRow.thursday +
                  tsRow.friday;
              }
            });
          }
        });
        obj.employees.push(empData);
      });
      data.push(obj);
    });

    this.setState({
      data: data
    });

    console.log(response);
    console.log(wpLowerList);
    console.log(empList);
    console.log(data);
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        display: "flex",
        flexDirection: "row",
        padding: 5
      },
      image: {
        height: 30,
        width: 30
      },
      title: {
        alignSelf: "center",
        marginLeft: 5,
        fontSize: 18
      },
      report: {
        marginLeft: 100
      },
      date: {
        marginLeft: 100
      },
      dataContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: 20
      },
      employeesRow: {
        display: "flex",
        flexDirection: "row"
      },
      margin: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
      },
      marginB: {
        marginLeft: 50,
        marginRight: 50
      }
    });
    return (
      <Document>
        <Page>
          <View style={styles.container}>
            <Image
              style={styles.image}
              src="https://cors-anywhere.herokuapp.com/https://i.imgur.com/zzNGGGB.jpg"
            />
            <Text style={styles.title}>Timely</Text>
            <Text style={styles.report}>
              Report for {this.state.wpList[0].project.project_code}
            </Text>
            <Text style={styles.date}>
              {new Date().toDateString()}
            </Text>
          </View>
          {this.state.data
            ? this.state.data.map(a => {
                return (
                  <View style={styles.dataContainer}>
                    <Text>Work Package: {a.wp}</Text>
                    <View style={styles.employeesRow}>
                      <Text style={styles.margin}>Employee ID</Text>
                      <Text style={styles.margin}>Employee Name</Text>
                      <Text style={styles.margin}>Hours</Text>
                    </View>
                    {a.employees
                      ? a.employees.map(e => {
                        return (
                          <View style={styles.employeesRow}>
                            <Text style={styles.marginB}>{e.id}</Text>
                            <Text style={styles.marginB}>{e.name}</Text>
                            <Text style={styles.marginB}>{e.hours}</Text>
                          </View>
                        );
                        })
                      : ""}
                  </View>
                );
              })
            : ""}
        </Page>
      </Document>
    );
  }
}

export default ProjectReport;
