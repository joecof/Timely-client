import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EmployeeInfo from './EmployeeInfo'
import BasicInfo from './BasicInfo'
import ChangePassword from './ChangePassword'
import agent from '../../api/agent'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 750,
  },
  divider: {
    margin: 35,
    height: 690
  }
});

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      loadedUser: {}
    })

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const currentUserId = this.props.match.params.id;
    const response = await agent.employeeInfo.getCurrentUser(currentUserId);
    this.setState({
      loadedUser: response
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className = {classes.paper} elevation = {2}>
          <Grid container spacing={1}>
            <EmployeeInfo loadedUser = {this.state.loadedUser} />
            <Divider orientation="vertical" flexItem className = {classes.divider}/>
            <BasicInfo loadedUser = {this.state.loadedUser }/>
            <Divider orientation="vertical" flexItem className = {classes.divider}/>
            <ChangePassword loadedUser = {this.state.loadedUser }/>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
