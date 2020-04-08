import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import agent from "../../api/agent";
import { isNullOrUndefined } from "util";

class ProjectReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpList: this.props.wpList,
      data: [],
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

    this.props.wpList.forEach((wp) => {
      if (wp.work_package_id.includes("L")) {
        wpLowerList.push(wp);
        wp.employees.forEach((e) => {
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
    wpLowerList.forEach((wp) => {
      obj = {};
      obj.wp = wp.work_package_id;
      obj.employees = [];

      var empData = {};
      wp.employees.forEach((e) => {
        empData = {};
        empData.id = e.employee_id;
        empData.name = e.first_name + " " + e.last_name;
        empData.hours = 0;
        response.forEach((ts) => {
          if (ts.employee.employee_id === e.employee_id) {
            ts.details.forEach((tsRow) => {
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
      data: data,
    });

    console.log(response);
    console.log(wpLowerList);
    console.log(empList);
    console.log(data);
  }

  render() {
    const styles = StyleSheet.create({
      outerContainer: {
        display: "flex",
        flexDirection: "column",
        padding: 60,
      },
      logoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
      },
      image: {
        height: 30,
        width: 30,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 6,
      },
      report: {
        fontSize: 14,
        textTransform: "uppercase",
      },
      date: {
        fontSize: 14,
      },
      dataContainer: {
        display: "flex",
      },
      workPackageTitle: {},
      employeesRow: {},
      margin: {},
      marginB: {},
    });
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.outerContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.image}
                src="https://cors-anywhere.herokuapp.com/https://i.imgur.com/zzNGGGB.jpg"
              />
              <Text style={styles.title}>Timely</Text>
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.report}>
                Report for {this.state.wpList[0].project.project_code}
              </Text>
              <Text style={styles.date}>{new Date().toDateString()}</Text>
            </View>
            {this.state.data.map((a) => {
              return (
                <View key={a.wp} style={styles.dataContainer}>
                  <Text
                    style={[
                      styles.workPackageTitle,
                      { fontSize: 14, marginBottom: 5, marginTop: 15 },
                    ]}
                  >
                    Work Package: {a.wp}
                  </Text>
                  <View
                    style={[
                      styles.employeesRow,
                      {
                        display: "flex",
                        flexDirection: "row",
                        borderBottom: "2 solid #000",
                        marginBottom: 5,
                      },
                    ]}
                  >
                    <Text style={[styles.margin, { fontSize: 11, width: 190 }]}>
                      Employee ID
                    </Text>
                    <Text style={[styles.margin, { fontSize: 11, width: 190 }]}>
                      Employee Name
                    </Text>
                    <Text style={[styles.margin, { fontSize: 11, width: 190 }]}>
                      Hours
                    </Text>
                  </View>
                  {a.employees.map((e) => {
                    return (
                      <View
                        style={[
                          styles.employeesRow,
                          { display: "flex", flexDirection: "row" },
                        ]}
                      >
                        <Text
                          style={[styles.marginB, { fontSize: 11, width: 190 }]}
                        >
                          {e.id}
                        </Text>
                        <Text
                          style={[styles.marginB, { fontSize: 11, width: 190 }]}
                        >
                          {e.name}
                        </Text>
                        <Text
                          style={[styles.marginB, { fontSize: 11, width: 190 }]}
                        >
                          {e.hours}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </Page>
      </Document>
    );
  }
}

export default ProjectReport;
