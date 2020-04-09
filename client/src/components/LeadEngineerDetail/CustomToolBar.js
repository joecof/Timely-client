import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import agents from "../../api/agent";
import { Button } from "@material-ui/core/";
import Alert from '../Alert/Alert'


/**
 * Author: Lawrence, Prabh
 * Version : 1.0
 * A component for the iteration plan datatable tool bar submit button.
 */

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
      wp: this.props.wp,
      sumbitAlert: false,
      successAlert: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    try {
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
        try {
          const response = await agents.workpackagePlan.createNewPlan(data, token);
          if (response != "exception throw") {
            this.setState({
              successAlert: true,
            })
          }
          console.log(response);
        } catch (e) {
          console.error(e);
        }

      });

      console.log(quantity);
      console.log(laborGrades);
      console.log(hours);
    } catch (e) {
      console.error(e);
      this.setState({
        sumbitAlert: true,
      })
    }
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
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Tooltip>
        {this.state.sumbitAlert ? <Alert config={{ message: "Submission Failed!", variant: "error" }} /> : null}
        {this.state.successAlert ? <Alert config={{ message: "Submission Successful!", variant: "success" }} /> : null}
      </>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
