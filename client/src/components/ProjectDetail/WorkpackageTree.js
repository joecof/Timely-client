import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./ProjectDetail.css";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

class WorkpackageTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpList: [],
      data: []
    };
    this.setData = this.setData.bind(this);
    this.addChildren = this.addChildren.bind(this);
    this.renderTree = this.renderTree.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Received props");
    this.setState(
      {
        wpList: nextProps.wpList
      },
      () => this.setData(this.state.wpList)
    );
  }

  setData(wpList) {
    var self = this;
    var data = [];
    var id = "";
    var name = "";
    var children = [];
    var curData = {};
    wpList.sort((a, b) => {
      return (
        parseInt(a.higher_work_package_id) - parseInt(b.higher_work_package_id)
      );
    });
    console.log(wpList);
    wpList.map(function(wp) {
      curData = {};
      children = [];
      id = wp.work_package_id;
      name = wp.description;
      curData.id = id;
      curData.name = name;
      curData.children = children;
      if (wp.higher_work_package_id === "0") {
        data.push(curData);
      } else {
        self.addChildren(data, wp.higher_work_package_id, curData);
      }
    });
    this.setState({
      data: data
    });
  }

  addChildren(data, id, curData) {
    for (var dataObj in data) {
      var found = false;
      if (data[dataObj].id === id) {
        data[dataObj].children.push(curData);
        found = true;
      }
      if (!found) {
        this.addChildren(data[dataObj].children, id, curData);
      }
    }
  }

  renderLabel(nodes) {
    return (
      <Box
        display="flex"
        onClick={event => {
          var wp = null;
          this.state.wpList.forEach(x => {
            if (x.work_package_id === nodes.id) {
              wp = x;
            }
          });
          this.props.history.push({
            pathname: `/workpackageDetail/${wp.work_package_id}`,
            state: { wp: wp, isPM: true }
          });
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <Typography>{"WP" + nodes.id + ": " + nodes.name.split(":", 1)[0]}</Typography>
      </Box>
    );
  }

  renderTree(nodes) {
    console.log(nodes);
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={this.renderLabel(nodes)}
      >
        <Typography variant="h5">
          {Array.isArray(nodes.children)
            ? nodes.children.map(node => this.renderTree(node))
            : null}
        </Typography>
      </TreeItem>
    );
  }

  handleToggle(event, nodeIds) {
    event.preventDefault();
    console.log(nodeIds);
  }

  render() {
    return (
      <TreeView
        className="PDWPTreeView"
        defaultCollapseIcon={<ExpandMoreIcon className="wpTree-expandIcon"/>}
        defaultExpandIcon={<ChevronRightIcon className="wpTree-chevronRightIcon"/>}
      >
        {this.state.data.map(thisData => {
          return this.renderTree(thisData);
        })}
      </TreeView>
    );
  }
}

export default WorkpackageTree;
