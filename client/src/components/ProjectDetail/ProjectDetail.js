import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import agent from "../../api/agent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "./Modal.js";
import WorkpackageList from "./WorkpackageList";
import WorkpackageTree from "./WorkpackageTree";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./ProjectDetail.css";
import ProjectReport from "../Charts/ProjectReport";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component shows the details of the project clicked on
 */
class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: this.props.location.state.projectID,
      project: {},
      wpList: [],
      isProjManager: null,
      openModal: false,
      data: [],
      empList: [],
      wpLowerList: []
    };

    this.openModal = this.openModal.bind(this);
    this.setData = this.setData.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true
    });
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const response = await agent.projects.getDetailsById(
      this.state.projectID,
      token
    );
    console.log(response);
    this.setState({
      project: response.project,
      wpList: response.wpList,
      isProjManager: response.projManager
    });
    console.log(this.state.project.project_manager_id.first_name);
    await this.setData();
  }

  async setData() {
    console.log(this.state.wpList);
    var data = [];

    this.state.wpList.forEach((wp) => {
      if (wp.work_package_id.includes("L")) {
        this.state.wpLowerList.push(wp);
        wp.employees.forEach((e) => {
          if (this.state.empList.indexOf(e.employee_id) === -1)
            this.state.empList.push(e.employee_id);
        });
      }
    });

    var response = [];
    if (this.state.empList.length > 0) {
      const token = localStorage.getItem("token");
      response = await agent.timesheetsInfo.getTimesheetsByEmps(
        this.state.empList.toString(),
        token
      );
    }

    var obj = {};
    this.state.wpLowerList.forEach((wp) => {
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
    console.log(this.state.wpLowerList);
    console.log(this.state.empList);
    console.log("OUTSIDE");
    console.log(data);
  }

  render() {
    return (
      <div className="projectDetailContainer">
        <div className="topMiddleContainer">
          <div className="topInfoContainer">
            <div className="gridBorder">
              <div className="projectDetail-projectTitle">
                {this.state.project.project_name}
              </div>
              <div className="projectDetail-projectDescription">
                {" "}
                {this.state.project.description}
              </div>
            </div>
            {this.state.project.hasOwnProperty("project_manager_id") && (
              <div className="projectDetail-teamInfoContainer">
                <div className="projectDetail-projectManagerContainer">
                  <div className="projectDetail-projectManager">
                    Project Manager:
                  </div>
                  <div className="projectDetailMargin">
                    <Avatar
                      variant="circle"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className="projectDetail-AvatarCircle"
                    >
                      <div className="projectDetail-avatarInitials">
                        {this.state.project.project_manager_id.first_name
                          .slice(0, 1)
                          .toUpperCase()}
                        {this.state.project.project_manager_id.last_name
                          .slice(0, 1)
                          .toUpperCase()}
                      </div>
                    </Avatar>
                  </div>
                  <div className="projectDetail-projectManager-name">
                    {this.state.project.project_manager_id.first_name +
                      " " +
                      this.state.project.project_manager_id.last_name}
                  </div>
                </div>
                <div className="projectDetail-teamMemberInfoContainer">
                  <div className="projectDetail-teamTitle">Team:</div>
                  {this.state.project.employees.slice(0, 5).map(e => (
                    <Tooltip title={e.first_name + " " + e.last_name}>
                      <Avatar
                        variant="circle"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        className="projectDetail-AvatarCircle"
                      >
                        <div className="projectDetail-avatarInitials">
                          {e.first_name.slice(0, 1).toUpperCase()}
                          {e.last_name.slice(0, 1).toUpperCase()}
                        </div>
                      </Avatar>
                    </Tooltip>
                  ))}
                  {this.state.project.employees.length > 5 && (
                    <>
                      <Button onClick={this.openModal}>Show More</Button>
                      <Modal
                        open={this.state.openModal}
                        members={this.state.project.employees}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {this.state.isProjManager && (
            <>
              <br />
              <div className="projectDetail-middleContainer">
                <div className="projectDetail-bugetDateInfoContainer">
                  <div className="projectDetail-budgetContainer">
                    <div className="projectDetail-budgetTitle">Budget:</div>
                    <div className="projectDetail-budgetAmount">
                      ${this.state.project.budget_dollar}
                    </div>
                  </div>
                  <div className="projectDetail-dateContainer">
                    <div className="projectDetail-startDateContainer">
                      <div className="projectDetail-startDateTitle">
                        Start Date:
                      </div>
                      <div className="projectDetail-startDate">
                        {new Date(this.state.project.start_date)
                          .toDateString()
                          .split(" ")
                          .slice(1)
                          .join(" ")}{" "}
                        &nbsp; &nbsp;
                      </div>
                    </div>
                    <div className="projectDetail-endDateContainer">
                      <div className="projectDetail-endDateTitle">
                        End Date:
                      </div>
                      <div className="projectDetail-endDate">
                        {new Date(this.state.project.end_date)
                          .toDateString()
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="projectDetail-createWPbuttonContainer">
                  {this.state.project.status === "OPEN" && (
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={{
                        pathname: "/createWorkpackage",
                        project: this.state.project,
                        wpList: this.state.wpList
                      }}
                      style={{ marginRight: "5%" }}
                    >
                      <b>Create Work Package</b>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="projectDetail-treeContainer">
          {this.state.isProjManager === false ? (
            <WorkpackageList
              history={this.props.history}
              type={this.state.isProjManager ? "PM" : "Emp"}
              wpList={this.state.wpList}
            />
          ) : (
            <Grid
              container
              justify="center"
              className="PDWorkpackageTree"
              direction="column"
            >
              <Grid item>
                <WorkpackageTree
                  wpList={this.state.wpList}
                  history={this.props.history}
                />
              </Grid>
              <br />
              {this.state.wpList.length > 0 && (
                <Grid item>
                  <PDFDownloadLink
                    document={<ProjectReport wpList={this.state.wpList} data={this.state.data} empList={this.state.empList} wpLowerList={this.state.wpLowerList}/>}
                    fileName={this.state.projectID + "_report.pdf"}
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                      color: "#4a4a4a",
                      backgroundColor: "#f2f2f2",
                      border: "1px solid #4a4a4a"
                    }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Get Report"
                    }
                  </PDFDownloadLink>
                </Grid>
              )}
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectDetail;
