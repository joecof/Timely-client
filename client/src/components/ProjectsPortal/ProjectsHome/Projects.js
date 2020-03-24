import React from "react";
import ProjectsList from "./ProjectsList";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Link} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import agent from '../../../api/agent'
import "./Projects.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: home component for the porjects tab.
 *       This is rendered when the user clicks on projects from the side menu
 */

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // data is the prop being sent to the projectLists component. Other states are for all categories of projects
      data: [], 
      allProj: [],
      mineProj: [],
      archivedProj: [],
      closedProj: [],
      type: "All"
    };
    this.setData = this.setData.bind(this);
    this.allProjects = this.allProjects.bind(this);
    this.mineProjects = this.mineProjects.bind(this);
    this.archivedProjects = this.archivedProjects.bind(this);
    this.closedProjects = this.closedProjects.bind(this);
  }

  async componentDidMount() {
    await this.setData();
    this.allProjects();
  }

  allProjects(){
    this.setState({
      data: this.state.allProj,
      type: "All"
    })
  }

  mineProjects(){
    this.setState({
      data: this.state.mineProj,
      type: "Mine"
    })
  }

  archivedProjects(){
    this.setState({
      data: this.state.archivedProj,
      type: "Archived"
    })
  }

  closedProjects(){
    this.setState({
      data: this.state.closedProj,
      type: "Closed"
    })
  }

  async setData() {
    const user = JSON.parse(localStorage.getItem('User'));
    const ID = (user.employee_id);
    console.log(user);
    const response = await agent.projects.getProjectsForUser(ID);
    console.log(response);

    var projData = [];

    var allProj = [], mineProj = [], archivedProj = [], closedProj = [];

    for (var i = 0; i < response.length; i++) {
      projData.push(response[i].project_code);
      projData.push(response[i].project_name);
      var manager = response[i].project_manager_id.first_name + " " + response[i].project_manager_id.last_name;
      projData.push(manager);
      if (response[i].project_manager_id.employee_id === parseInt(ID)) {
        mineProj.push(projData);
      }
      if (response[i].status === "COMPLETE") {
        closedProj.push(projData);
      }
      if (response[i].status === "ARCHIVED") {
          archivedProj.push(projData);
      }
      allProj.push(projData);
    }
    this.setState({
      allProj: allProj,
      mineProj: mineProj,
      closedProj: closedProj,
      archivedProj: archivedProj
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid justify="space-between" container spacing={1} className="btnProjects">
          <Grid item>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button onClick={this.allProjects}>All</Button>
              <Button onClick={this.mineProjects}>Mine</Button>
              <Button onClick={this.archivedProjects}>Archived</Button>
              <Button onClick={this.closedProjects}>Closed</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" component={Link} to="/createProject">+ Create</Button>
          </Grid>
        </Grid>
        <ProjectsList data={this.state.data} type={this.state.type}/>
      </React.Fragment>
    );
  }
}

export default Projects;
