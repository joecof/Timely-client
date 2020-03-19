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
import Grid from '@material-ui/core/Grid';
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
      height: 737,
      overflow: 'auto'
    },
    rightTopPaper: {
        height: 470,
    }, 
    rightBottomLeftPaper: {
        height: 250,
        textAlign: 'center'
    },
    rightBottomRightPaper: {
        height: 250,
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    seperator: {
        borderTop: '1px solid lightgray'
    },
    projTitle: {
        marginLeft: 20,
        color: 'purple'
    },
    CircularProgressbar: {
      width: '45%',
      margin: '0 auto'
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
          <Grid container spacing={3} className={classes.container}>
            {/* proj info notification column */}
            <Grid item xs={4}>
              <Paper className = {classes.leftPaper} elevation = {2}>
                <div className = {classes.title}>{this.currentDate()}</div>
                <hr className = {classes.seperator} />
                <div className = {classes.projTitle}>Recent/New Projects</div>
                <DashboardProtalProjInfo projName="TJ100" dueDate="December 20, 2020" projManagerName="Dick Jones" />
                <DashboardProtalProjInfo projName="TR311" dueDate="March 20, 2021" projManagerName="Slim Teddy"/>
                <DashboardProtalProjInfo projName="GY852" dueDate="April 20, 2021" projManagerName="Flower Jones"/>
                <DashboardProtalProjInfo projName="TY965" dueDate="May 23, 2022" projManagerName="Juice Moon"/>
                <DashboardProtalProjInfo projName="TG203" dueDate="October 23, 2022" projManagerName="Pie Hook"/>
                <DashboardProtalProjInfo projName="TG203" dueDate="October 23, 2022" projManagerName="Pie Hook"/>
                <DashboardProtalProjInfo projName="TG203" dueDate="October 23, 2022" projManagerName="Pie Hook"/>
                <DashboardProtalProjInfo projName="TG203" dueDate="October 23, 2022" projManagerName="Pie Hook"/>

              </Paper>
            </Grid>
            {/* timesheet detail */}
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} zeroMinWidth>

                  <Paper className = {classes.rightTopPaper} elevation = {2}>
                    <div className = {classes.title}>Timesheet</div>
                    <hr className = {classes.seperator} />
                    <TimesheetDetail dashboardTimesheet = {true}/>
                  </Paper>

                </Grid>
            {/* sick days */}
                <Grid item xs={6}>
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
                </Grid>

                {/* vac days */}
                <Grid item xs={6}>
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
  
  export default withStyles(styles, { withTheme: true })(DashBoardPortal);
