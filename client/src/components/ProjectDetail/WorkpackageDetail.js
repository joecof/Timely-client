import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import agent from "../../api/agent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "./Modal.js";
import EmpHours from "../Charts/EmpHours";
import BudgetVsActual from "../Charts/BudgetVsActual";
import EstimationRE from "../Charts/EstimationRE";
import { Link } from "react-router-dom";
import SelectEmployees from "../WorkpackageCreate/SelectEmployees";
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
      selectDisabled: true,
      selectEmps: []
    };

    this.openModal = this.openModal.bind(this);
    this.calcValuesEmpHours = this.calcValuesEmpHours.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.submitNewEmployees = this.submitNewEmployees.bind(this);
    this.closeWP = this.closeWP.bind(this);
  }

  closeWP() {
    console.log(this.state.wp);
    const token = localStorage.getItem("token");
    var wp = this.state.wp;
    wp.is_open = 0;
    const response = agent.workpackages.closeWorkpackage(wp, token)
  }

  openModal() {
    this.setState({
      openModal: true
    });
  }

  async componentDidMount() {
    //need to change this later
    if (this.state.wp.work_package_id.includes("L")) {
      await this.calcValuesEmpHours();
    }
  }

  async calcValuesEmpHours() {
    const token = localStorage.getItem("token");
    var emps = [];
    this.state.wp.employees.forEach(x => {
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

  handleTagsChange = e => {
    console.log(e);
    // console.log(this.state.selectEmps);
    this.setState(
      {
        selectEmps: e
      },
      console.log(this.state.selectEmps)
    );
  };

  async submitNewEmployees() {
    console.log("SUbmit");
    // console.log(this.state.wp);
    var wp = this.state.wp;
    this.state.selectEmps.forEach(x => wp.employees.push(x));
    console.log(wp);
    this.setState({
      wp: wp,
      selectDisabled: true
    }, console.log(this.state.wp));
    const token = localStorage.getItem("token");
    const response = await agent.workpackages.updateWorkpackage(wp, token);
    console.log(response);
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="gridBorder">
            <Typography variant="h4">{this.state.wp.description.split(":", 1)[0]}</Typography>
            <Typography variant="h6">{this.state.wp.description.split(":", 2)[1] ? this.state.wp.description.split(":", 2)[1] : ''}</Typography>
          </Grid>
          <>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Responsible Engineer:</Typography>
              <Grid container direction="row" alignItems="center">
                <Grid item className="projectDetailsMargin">
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
                </Grid>
                <Grid item>
                  <Typography>
                    {this.state.wp.responsible_person_id.first_name +
                      " " +
                      this.state.wp.responsible_person_id.last_name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Team:</Typography>
              <Grid container direction="row" alignItems="center">
                {this.state.wp.employees.slice(0, 5).map(e => (
                  <Grid item className="projectDetailsMargin">
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
                  </Grid>
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
                {(this.state.selectDisabled && this.state.isProjManager && this.state.wp.work_package_id.includes("L") && this.state.wp.project.status === 'OPEN' && this.state.wp.is_open) && (
                  <Button
                    onClick={() => {
                      console.log("clicked");
                      this.setState({ selectDisabled: false });
                    }}
                  >
                    Assign Employees
                  </Button>
                )}
                {(!this.state.selectDisabled && this.state.isProjManager && this.state.wp.work_package_id.includes("L")) && (
                  <>
                  <SelectEmployees
                    handleTagsChange={this.handleTagsChange}
                    project={this.state.wp.project}
                    isDisabled={false}
                    emps={this.state.emps}
                  />
                  <Button onClick={this.submitNewEmployees}>Add</Button>
                  </>
                )}
              </Grid>
            </Grid>
          </>
        </Grid>
        {this.state.isProjManager && this.state.emps.length > 0 && this.state.wp.work_package_id.includes("L") && (
          //NOTE: chagne week
          <>
            <EmpHours
              EmpsX={this.state.emps}
              week={this.state.week}
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
                wp: this.state.wp
              }}
            >
              New Plan
            </Button>
          </>
        )}
        {(this.state.isProjManager && this.state.wp.project.status === 'OPEN' && this.state.wp.is_open) && (
          <Button style={{background: 'red', color: "white"}} onClick={this.closeWP}>Close</Button>
        )}
      </div>
    );
  }
}

export default WorkpackageDetail;
