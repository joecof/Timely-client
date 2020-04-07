import React from "react";
import agent from "../../api/agent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "./Modal.js";
import EmpHours from "../Charts/EmpHours";
import BudgetVsActual from "../Charts/BudgetVsActual";
import EstimationRE from "../Charts/EstimationRE";
import { Link } from "react-router-dom";
import "./ProjectDetail.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component shows the details of the wp clicked on
 */
class WorkpackageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wp: this.props.location.state.wp,
      isProjManager: this.props.location.state.isPM,
      isRE: this.props.location.state.isRE
        ? this.props.location.state.isRE
        : false,
      emps: [],
      timesheets: [],
      week: 0,
      openModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.calcValuesEmpHours = this.calcValuesEmpHours.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true,
    });
  }

  async componentDidMount() {
    //need to change this later
    await this.calcValuesEmpHours();
  }

  async calcValuesEmpHours() {
    const token = localStorage.getItem("token");
    var emps = [];
    this.state.wp.employees.forEach((x) => {
      emps.push(x.employee_id);
    });
    // console.log(emps);
    const response = await agent.timesheetsInfo.getTimesheetsByEmps(
      emps.toString(),
      token
    );

    var date = new Date();
    var week = date.getWeek();
    if (date.getDay() > 0 && date.getDay() < 6) {
      week--;
    }

    this.setState({
      emps: this.state.wp.employees,
      week: week,
      timesheets: response,
    });

    console.log(response);
  }

  render() {
    return (
      <div className="projectDetailContainer">
        <div className="wpDetail-top-container">
          <div className="wpDetail-projTitleDesc-container">
            <div className="wpDetail-projectTitle">
              Work Package Title
              {this.state.wp.project_name}
            </div>
            <div className="projectDetail-projectDescription">
              {this.state.wp.description}
            </div>
          </div>
          <div className="wpDetail-teamInfo-container">
            <div className="wpDetail-REInfo">
              <div className="wpDetail-RE-title">Responsible Engineer:</div>
              <div className="wpDetail-avatar-container">
                <Avatar
                  variant="circle"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  {this.state.wp.responsible_person_id.first_name
                    .slice(0, 1)
                    .toUpperCase()}
                  {this.state.wp.responsible_person_id.last_name
                    .slice(0, 1)
                    .toUpperCase()}
                </Avatar>
              </div>
              <div className="wpDetail-RE-name-container"> 
                {this.state.wp.responsible_person_id.first_name +
                  " " +
                  this.state.wp.responsible_person_id.last_name}
              </div>
            </div>
            <div className="wpDetail-teamTitleAvatar-container">
              <div className="wpDetail-teamTitle">Team:</div>
              <div>
                {this.state.wp.employees.slice(0, 5).map((e) => (
                  <div className="wpDetail-avatar-container">
                    <Tooltip title={e.first_name + " " + e.last_name}>
                      <Avatar
                        variant="circle"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                      >
                        {e.first_name.slice(0, 1).toUpperCase()}
                        {e.last_name.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  </div>
                ))}
                {this.state.wp.employees.length > 5 && (
                  <>
                    <Button onClick={this.openModal}>Show More</Button>
                    <Modal
                      open={this.state.openModal}
                      members={this.state.wp.employees}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.isProjManager && this.state.emps.length > 0 && (
          //NOTE: chagne week
          <>
            <EmpHours
              EmpsX={this.state.emps}
              week={50}
              EmpsY={this.state.timesheets}
              wp={this.state.wp}
            />
            <br />
            <BudgetVsActual
              tsheets={this.state.timesheets}
              wp={this.state.wp}
            />
            <br />
          </>
        )}
        {this.state.isRE && (
          <>
            <BudgetVsActual
              tsheets={this.state.timesheets}
              wp={this.state.wp}
            />
            <br />
            <EstimationRE wp={this.state.wp} />
            <br />
            <Button
              color="primary"
              component={Link}
              to={{
                pathname: "/newIterationPlan",
                wp: this.state.wp,
              }}
            >
              New Plan
            </Button>
          </>
        )}
      </div>
    );
  }
}

export default WorkpackageDetail;
