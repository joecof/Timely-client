/**
 * Author: Kang W
 * Version: 1.0
 * Description: Dashboard component, showing the current timesheet detail,
 * vacation days taken, FlexTime allocted, and information regarding on the projets and wps
 */
import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DashboardPortalProjInfo from "../DashboardPortalProjInfo/DashboardPortalProjInfo";
import TimesheetDetail from "../TimesheetDetail/TimesheetDetail";
import './DashBoardPortal.css';

/**
 * Material UI styling JSON object.
 * @param {JSON} theme
 */
const styles = () => ({
  root: {
    flexGrow: 1
  },
  leftPanelContainer: {
    width: "360px"
  },
  leftPaper: {
    overflow: 'scroll',
    maxHeight: '500px',
    overflow: "auto",
    width: "310px",
    margin: "0 20px 0 0",
    boxShadow: "none",
    border: "solid 1px lightgray",
    borderRadius: "5px"
  },
  rightTopPaper: {
    height: 500
  },
  rightBottomLeftPaper: {
    height: 220,
    textAlign: "center",
    margin: "0 20px 0 0",
    boxShadow: "none",
    border: "solid 1px lightgray",
    borderRadius: "5px"
  },
  rightBottomRightPaper: {
    height: 220,
    textAlign: "center",
    boxShadow: "none",
    border: "solid 1px lightgray",
    borderRadius: "5px",
    marginLeft: '20px'
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    margin: "10px 0 0 0"
  },
  seperator: {
    borderTop: "1px solid lightgray",
  },
  projTitle: {
    margin: "20px 0 0 20px",
    fontWeight: 700
  },
  CircularProgressbar: {
    width: "40%",
    marginTop: "18px"
  },
  topContainer: {
    display: "flex"
  },
  flexVancationContainer: {
    display: "flex",
    margin: "22px 0 0 4px"
  },
  timesheetDetailContainer: {
    border: "solid 1px lightgray",
    minWidth: '1000px',
    textAlign: 'center',
    height: '500px',
    fontSize: '18pt',
    borderRadius: '5px',
  },
  projsInfo: {
    textAlign: 'center'
  }
});

// DashBoardPortal Component
class DashBoardPortal extends Component {
  // Constructor for props, states and functions
  constructor(props) {
    super(props);

    this.state = {
      loadedUser: {},
      projects: []
    };

    this.getProject = this.getProject.bind(this);
    this.formatWeekEnding = this.formatWeekEnding.bind(this);
  }

  // converting weekending api from milliseconds to date format
  formatWeekEnding(weekending) {
    // static monthCharacter
    const monthCharacter = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
      ];
    var weekEnding_date = new Date(weekending);
    var year = weekEnding_date.getFullYear();
    var month = weekEnding_date.getMonth();
    var day = ("0" + weekEnding_date.getDate()).slice(-2);
    return (monthCharacter[month] + " " + day + ", " + year);
  }

  // getting logged in user and the projects
  getProject(projects, loadedUser) {
    // sorting projects by end_date
    projects.sort(function(a,b){
      return b.end_date - a.end_date;
    });
    // setting the states
    this.setState({
      projects: projects,
      loadedUser: loadedUser
    });
    // if user does not have any projects
    if(this.state.projects.length == 0) {
      document.getElementById("recentNewProjTitle").innerHTML = "You don't have any projects"
    }
  }
  
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.topContainer}>
          <Paper className={classes.leftPaper} elevation={2}>
            {/* displaying the projects current employee is involved in */}
            <div className={classes.projTitle} id="recentNewProjTitle">Recent / New Projects</div>
              {this.state.projects.length == 0 ? "" : 
                this.state.projects.map((proj, index) =>
                  <DashboardPortalProjInfo key={proj.project_code} history={this.props.history}
                    projName={proj.project_code}
                    dueDate={this.formatWeekEnding(proj.end_date)}
                    projManagerName={proj.project_manager_id.first_name + " " + proj.project_manager_id.last_name}
                  />
                )
              }
          </Paper>
          <div>
            {/* timesheet for current week */}
            <div id="timesheetDetailContainer" className={classes.timesheetDetailContainer}>
              <TimesheetDetail fetchProject={this.getProject} history={this.props.history} dashboardTimesheet={true} userId={this.props.match.params.id} token={this.props.token}/>
            </div>
            <div className={classes.flexVancationContainer}>
              <Paper className={classes.rightBottomLeftPaper} elevation={2}>
                {/* flex time allocated */}
                <div className={classes.title}>Flextime</div>
                <hr className={classes.seperator} />
                <CircularProgressbar
                  className={classes.CircularProgressbar}
                  value={66}
                  text={`${66}%`}
                  styles={buildStyles({
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Text size
                    textSize: "13px",
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 3,
                    pathColor: `rgba(62, 152, 199, ${66 / 100})`,
                    textColor: "#f88",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7"
                  })}
                />
              </Paper>
              <Paper className={classes.rightBottomRightPaper} elevation={2}>
                {/* vacation days taken */}
                <div className={classes.title}>Vacation Days</div>
                <hr className={classes.seperator} />
                <CircularProgressbar
                  className={classes.CircularProgressbar}
                  value={50}
                  text={`${50}%`}
                  styles={buildStyles({
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Text size
                    textSize: "13px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 3,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(62, 152, 199, ${50 / 100})`
                  })}
                />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DashBoardPortal);