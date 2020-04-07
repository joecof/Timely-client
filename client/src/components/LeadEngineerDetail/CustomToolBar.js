import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import agents from "../../api/agent";
import { Button } from "@material-ui/core/";

/**
 * Material UI styling JSON object.
 */
const defaultToolbarStyles = {
  iconButton: {
    marginLeft: 30
  }
};

class CustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      wp: this.props.wp
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    console.log(this.state.data);

    var laborGrades = [];
    var hours = [];
    var quantity = [];

    this.state.data.forEach(d => {
      var index = laborGrades.indexOf(d[2]);
      if (index === -1) {
        laborGrades.push(d[2]);
        hours.push(parseInt(d[3]));
        quantity.push(1);
      } else {
        hours[index] += parseInt(d[3]);
        quantity[index] += 1;
      }
    });

    var planData = [];
    var wpc = this.state.wp.workPackagePlanCollection[0];
    laborGrades.forEach((lg, index) => {
      var obj = {};
      obj.project_code = wpc.project_code;
      obj.work_package_id = wpc.work_package_id;
      obj.type = "ESTIMATE";
      obj.start_date = new Date().toISOString().split("T", 1)[0];
      obj.end_date = wpc.end_date;
      obj.revision = this.props.revision;
      obj.labor_grade_id = lg;
      obj.quantity = quantity[index];
      obj.plan_hour = hours[index];
      obj.project_wp = wpc.project_wp;
      planData.push(obj);
    });

    console.log(planData);

    const token = localStorage.getItem("token");
    planData.forEach(async (data) => {
      const response = await agents.workpackagePlan.createNewPlan(data, token);
      console.log(response);
    });

    console.log(quantity);
    console.log(laborGrades);
    console.log(hours);
  }
  /**
   * Will be used to sumbit the iteration plan
   */
  render() {
    const { classes } = this.props;

    return (
      <>
        <Tooltip title={"Submit the plan"}>
          <Button
            className={classes.iconButton}
            // onClick={this.props.handleSubmit}
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Tooltip>
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
