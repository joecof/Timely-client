import React from "react";
import ProjectsList from "./ProjectsList";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Link} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import "./Projects.css";

/**
 * Author: Prab
 * Version: 1
 * Desc: home component for the porjects tab.
 *       This is rendered when the user clicks on projects from the side menu
 */

const data = [
    ["P1234", "Project A", "Kang"],
    ["P123", "Project B", "Joe"],
    ["P1234", "Project C", "Oscar"],
    ["P1234", "Project D", "Bruce"],
    ["P1234", "Project E", "Sham"]
];

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      type: "Mine"
    };
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
              <Button>All</Button>
              <Button>Mine</Button>
              <Button>Archived</Button>
              <Button>Closed</Button>
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
