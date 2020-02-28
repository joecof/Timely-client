import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import { Grid } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import logo from '../../images/watch.png'
import Navbar from '../Navbar/Navbar'
import Timesheet from '../Timesheet/Timesheet'
import Projects from '../ListViews/Projects'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
  },
  content: {
    flexGrow: 2,
    padding: theme.spacing(3),
  },
  text: {
    marginLeft: 30,
    color: 'black'
  },
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, 
  link: {
    textDecoration: 'none',
  }
});

  class SideMenu extends Component {

    constructor(props) {
      super(props);

      this.state = ({
        projects: 0,
        timesheet: 1
      })
    }



    render() {
      const { classes } = this.props;



      return(
        <div className={classes.root}>
          <CssBaseline />
          <Navbar/>
            <Drawer
              variant="permanent"
              open = {true}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Divider />
              <Grid container direction="row" alignItems="center" className = {classes.menuItem}>
                <Grid item>
                  <Avatar variant="circle" className={classes.avatar} src = {logo}/>
                </Grid>
              </Grid> 
              <Divider className={classes.divider}/>
                <div className = {classes.menu}>
                  <ExpansionPanel className = {classes.expansionPanel} elevation={0}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item>
                          <h4 className = {classes.text}> {this.props.loaded_user.first_name + " " + this.props.loaded_user.last_name} </h4>
                        </Grid>
                      </Grid> 
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.text}>Profile</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.text}>Lead Engineer</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.text}>Supervisor</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.text}>HR</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <Divider className={classes.divider}/>
                  <Grid container direction="row" alignItems="center" className = {classes.menuItem}>
                    <Grid item >
                      <Avatar variant="square" className={classes.avatar} />
                    </Grid>
                    <Grid item >
                      <p className = {classes.text}>Dashboard</p>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" className = {classes.menuItem} onClick = {() => this.setState({projects: 0, timesheet: 1})}>
                    <Grid item >
                      <Avatar variant="square" className={classes.avatar} />
                    </Grid>
                    <Grid item >
                      <p className = {classes.text}>Timesheet</p>
                    </Grid>
                  </Grid>
                  {/* <Link to = "/projects" className = {classes.link}> */}
                  <Grid container direction="row" alignItems="center" className = {classes.menuItem} onClick = {() => this.setState({projects: 1, timesheet: 0})}>
                    <Grid item >
                      <Avatar variant="square" className={classes.avatar} />
                    </Grid>
                    <Grid item >
                      <p className = {classes.text}>Projects</p>
                    </Grid>
                  </Grid>
                  {/* </Link> */}
                </div>
            </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {
              this.state.projects === 1 ? <Projects/> : null
            }
            {
              this.state.timesheet === 1 ? <Timesheet/> : null
            }
          </main>
        </div>
      )
    }
  }

export default withStyles(styles, { withTheme: true })(SideMenu);