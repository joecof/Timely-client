import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import agent from "../../../api/agent";

/**
 * Author: Prabh
 * Version: 1
 * Desc: This component will provide us with more options once a row in the datatable is selected
 */

class CustomSelectProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async (event, str) => {
    event.preventDefault();
    console.log("click!", str); // a user can do something with these selectedRow values
    
    const user = JSON.parse(sessionStorage.getItem('user'));
    // console.log(user);
    const token = localStorage.getItem('token');
    // console.log(token);

    if ((user.first_name + " " + user.last_name) === (this.props.data[2])) {
      const response = await agent.projects.getById(this.props.data[0], token);
      console.log(response);
      response.status = str;
      const nextResponse = await agent.projects.updateProject(response, token);
      window.location.href = window.location.href;
    }
  }

  render() {
    return (
      <div>
        {this.state.type === "Mine" && (
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={e => this.handleClick(e, "ARCHIVE")}>Archive</Button>
            <Button onClick={e => this.handleClick(e, "CLOSE")}>Close</Button>
          </ButtonGroup>
        )}
        {this.state.type === "Archived" && (
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={e => this.handleClick(e, "OPEN")}>Open</Button>
            <Button onClick={e => this.handleClick(e, "CLOSE")}>Close</Button>
          </ButtonGroup>
        )}
      </div>
    );
  }
}

export default CustomSelectProject;
