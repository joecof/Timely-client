import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import agent from '../../api/agent'

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: this.props.location.state.projectID
    };
  }

  async componentDidMount() {
    const response = await agent.projects.getById(this.state.projectID);
    console.log(response);
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper>xs=6 sm=3</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProjectDetail;
