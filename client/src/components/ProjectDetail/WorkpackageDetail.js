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
      openModal: false
    };

    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true
    });
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    var emps = [];
    this.state.wp.employees.forEach(x => {
      emps.push(x.employee_id);
    })
    // console.log(emps);
    const response = await agent.timesheetsInfo.getTimesheetsByEmps(
      emps.toString(),
      token
    );
    console.log(response);
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="gridBorder">
            <Typography variant="h4">
              {this.state.wp.description}
            </Typography>
            <Typography variant="h6">
              {this.state.wp.description}
            </Typography>
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
                </Grid>
              </Grid>
            </>
        </Grid>
        {this.state.isProjManager && (<></>)
        }
      </div>
    );
  }
}

export default WorkpackageDetail;
