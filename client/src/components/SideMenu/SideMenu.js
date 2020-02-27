import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import { Grid } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';


import logo from '../../images/watch.png'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import Navbar from '../Navbar/Navbar'

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
    height: '100%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menu: {
    // paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(3)
  }, 
  userName: {
    marginLeft: 30
  },
  expansionPanel: {

  }, 
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, 
});

  class SideMenu extends Component {

    constructor(props) {
      super(props);
    }
    render() {
      const { classes } = this.props;

      return(
        <div className={classes.root}>
          <CssBaseline />
          <Navbar drawerWidth = {drawerWidth}/>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
              variant="permanent"
              open = {true}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <Divider />
                <List>
                  <ListItem button>
                    <Avatar variant="square" className={classes.profilePicture} src={logo}/>
                  </ListItem>
                </List>
              <Divider />
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
                          <h4 className = {classes.userName}>Kobe Bryant</h4>
                        </Grid>
                      </Grid> 
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.userName}>Profile</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.userName}>Lead Engineer</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.userName}>Supervisor</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                      <Grid container direction="row" alignItems="center">
                        <Grid item >
                          <Avatar variant="circle" className={classes.avatar} />
                        </Grid>
                        <Grid item >
                          <p className = {classes.userName}>HR</p>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <Divider />
                  <Grid container direction="row" alignItems="center" className = {classes.menuItem}>
                    <Grid item >
                      <Avatar variant="circle" className={classes.avatar} />
                    </Grid>
                    <Grid item >
                      <p className = {classes.userName}>Dashboard</p>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" className = {classes.menuItem}>
                    <Grid item >
                      <Avatar variant="circle" className={classes.avatar} />
                    </Grid>
                    <Grid item >
                      <p className = {classes.userName}>Timesheet</p>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" className = {classes.menuItem}>
                    <Grid item >
                      <Avatar variant="circle" className={classes.avatar} />
                    </Grid>
                    <Grid item >
                      <p className = {classes.userName}>Projects</p>
                    </Grid>
                  </Grid>
                </div>

            </Drawer>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <ProjectCreate />
          </main>
        </div>
      )
    }
  }

export default withStyles(styles, { withTheme: true })(SideMenu);