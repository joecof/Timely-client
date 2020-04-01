import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import agent from '../../api/agent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip';
import Modal from './Modal.js';
import WorkpackageList from './WorkpackageList';
import {Link} from 'react-router-dom';
import "./ProjectDetail.css"

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component shows the details of the project clicked on 
 */
class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: this.props.location.state.projectID,
      project: {},
      wpList: [],
      isProjManager: null,
      openModal: false
    };
    
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true
    })
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const response = await agent.projects.getDetailsById(this.state.projectID, token);
    console.log(response);
    this.setState({
      project: response.project,
      wpList: response.wpList,
      isProjManager: response.projManager
    })
    console.log(this.state.project.project_manager_id.first_name);
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="gridBorder">
            <Typography variant="h4">{this.state.project.project_name}</Typography>
            <Typography variant="h6">{this.state.project.description}</Typography>
          </Grid>
          {this.state.project.hasOwnProperty("project_manager_id") &&
          <>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Project Manager:</Typography>
              <Grid container direction="row" alignItems="center">
                <Grid item className="projectDetailsMargin">
                  <Avatar variant="circle" aria-controls="simple-menu" aria-haspopup="true">
                    {this.state.project.project_manager_id.first_name.slice(0,1).toUpperCase()}
                    {this.state.project.project_manager_id.last_name.slice(0,1).toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography>{this.state.project.project_manager_id.first_name + " " + this.state.project.project_manager_id.last_name}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Team:</Typography>
              <Grid container direction="row" alignItems="center">
                {this.state.project.employees.slice(0,5).map(e => 
                  <Grid item className="projectDetailsMargin">
                    <Tooltip title={e.first_name + " " + e.last_name}>
                    <Avatar variant="circle" aria-controls="simple-menu" aria-haspopup="true">
                    {e.first_name.slice(0,1).toUpperCase()}
                    {e.last_name.slice(0,1).toUpperCase()}
                    </Avatar>
                    </Tooltip>
                  </Grid>
                )}
                {this.state.project.employees.length > 5 &&
                <>
                  <Button onClick={this.openModal}>Show More</Button>
                  <Modal open={this.state.openModal} members={this.state.project.employees} />
                </>
                }
              </Grid>
            </Grid>
          </>
          }
        </Grid>
        {this.state.isProjManager &&
        <>
          <br/><br/> 
          <Grid justify="space-between"  container spacing={1} >
            <Grid item>
              <Typography variant="h6"><b>Budget:</b> ${this.state.project.budget_dollar}</Typography>
              <Typography variant="h6">
                <b>Start Date:</b> {new Date(this.state.project.start_date).toDateString().split(' ').slice(1).join(' ')} &nbsp; &nbsp; 
                <b>End Date:</b> {new Date(this.state.project.end_date).toDateString().split(' ').slice(1).join(' ')}                   
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" component={Link} to="/createWorkpackage" style={{marginRight: "5%"}}><b>+ Create Work Package</b></Button>
            </Grid>
          </Grid>
        </>
        }
        <WorkpackageList type={this.state.isProjManager ? 'PM' : 'Emp'} wpList={this.state.wpList} />
      </div>
    );
  }
}

export default ProjectDetail;
