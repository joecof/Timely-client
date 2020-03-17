/**
 * Author: Kang W 
 * Version: 1.0 
 * Description: Dashboard component, showing the current timesheet detail, 
 * vacation days taken, sick days allocted, and some notifications regarding on the projets and wps 
 */
import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import agent from '../../api/agent'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DashboardProtalProjInfo from '../DashboardProtalProjInfo/DashboardProtalProjInfo'
import TimesheetDetail from '../TimesheetDetail/TimesheetDetail'

/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const styles = () => ({
    root: {
      flexGrow: 1,
    },
    leftPaper: {
      height: 620,
      width: 350,
      marginLeft: 35,
      float: 'left',
      overflow: 'auto'
    },
    rightTopPaper: {
        height: 350,
        width: 580,
        marginLeft: 420
    }, 
    rightBottomLeftPaper: {
        marginTop: 20,
        marginLeft: 35,
        width: 250,
        height: 250,
        float: 'left'
    },
    rightBottomRightPaper: {
        width: 250,
        height: 250,
        marginLeft: 75,
        marginTop: 20,
        float: 'left'
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5
    },
    seperator: {
        borderTop: '1px solid lightGrey'
    },
    projTitle: {
        marginLeft: 20,
        color: 'purple'
    },
    CircularProgressbar: {
      width: '80%',
      marginLeft: 27
    }
  });

class DashBoardPortal extends Component {

    constructor(props) {
      super(props);
  
      this.state = ({
        loadedUser: {}
      })
  
      this.fetchData = this.fetchData.bind(this);
      this.currentDate = this.currentDate.bind(this);
    }
  
    componentDidMount() {
      this.fetchData();
    }
    // logged in user 
    async fetchData() {
      const currentUserId = this.props.match.params.id;
      const response = await agent.employeeInfo.getCurrentUser(currentUserId);
      this.setState({
        loadedUser: response
      })
    }

    // current date
    currentDate() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayOfWeekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", 
            "Friday", "Saturday", "Sunday"
        ];
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        var dayOfWeek = new Date().getDay();

        return date + " " + monthNames[month] + ", " + dayOfWeekNames[dayOfWeek];
    }
    render() {
      const { classes } = this.props;
  
      return (
        <div className={classes.root}>
            {/* proj info notification column */}
            <Paper className = {classes.leftPaper} elevation = {2}>
              <div className = {classes.title}>{this.currentDate()}</div>
              <hr className = {classes.seperator} />
              <div className = {classes.projTitle}>Recent/New Projects</div>
              <DashboardProtalProjInfo projName="TJ100" dueDate="December 20, 2020" projManagerName="Dick Jones" />
              <DashboardProtalProjInfo projName="TR311" dueDate="March 20, 2021" projManagerName="Slim Teddy"/>
              <DashboardProtalProjInfo projName="GY852" dueDate="April 20, 2021" projManagerName="Flower Jones"/>
              <DashboardProtalProjInfo projName="TY965" dueDate="May 23, 2022" projManagerName="Juice Moon"/>
              <DashboardProtalProjInfo projName="TG203" dueDate="October 23, 2022" projManagerName="Pie Hook"/>
            </Paper>

            {/* timesheet detail */}
            <Paper className = {classes.rightTopPaper} elevation = {2}>
              <div className = {classes.title}>Timesheet</div>
              <hr className = {classes.seperator} />
              {/* timesheet here */}
            </Paper>

            {/* sick days */}
            <Paper className = {classes.rightBottomLeftPaper} elevation = {2}>
              <div className = {classes.title}>Sick Days</div>
              <hr className = {classes.seperator} />
              <CircularProgressbar className={classes.CircularProgressbar} value={66} text={`${66}%`} 
                  styles={buildStyles({
                 
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                 
                    // Text size
                    textSize: '13px',
                 
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 3,
                 
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                 
                    // Colors
                    pathColor: `rgba(62, 152, 199, ${66 / 100})`,
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}/>
            </Paper>

            {/* vac days */}
            <Paper className = {classes.rightBottomRightPaper} elevation = {2}>
              <div className = {classes.title}>Vacation Days</div>
              <hr className = {classes.seperator} />
              <CircularProgressbar  className={classes.CircularProgressbar} value={50} text={`${50}%`} 
                  styles={buildStyles({
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                 
                    // Text size
                    textSize: '13px',
                 
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 3,
                 
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                 
                    // Colors
                    pathColor: `rgba(62, 152, 199, ${50 / 100})`,
                  })}/>
            </Paper>
        </div>
      )
    }
  }
  
  export default withStyles(styles, { withTheme: true })(DashBoardPortal);
