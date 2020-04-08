import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "./Projects.css";

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

  handleClick = () => {
    console.log("click!", this.props.selectedRows); // a user can do something with these selectedRow values
  }

  render() {
    return (
      <div className="customSelectProject-container">
        {this.state.type === "Mine" && (
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={this.handleClick}>Archive</Button>
            <Button>Close</Button>
          </ButtonGroup>
        )}
        {this.state.type === "Archived" && (
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>Open</Button>
            <Button>Close</Button>
          </ButtonGroup>
        )}
        {this.state.type === "Closed" && (
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>Archive</Button>
            <Button>Open</Button>
          </ButtonGroup>
        )}
      </div>
    );
  }
}

export default CustomSelectProject;
