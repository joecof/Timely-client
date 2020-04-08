import React from "react";
import Chart from "react-apexcharts";
import { Typography } from "@material-ui/core";
import "./BudgetVsActual.css";

class BudgetVsActual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#fc0303", "#035efc", "#17b309"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Budget vs Actual hours spent per labor grade",
          align: "left",
          offsetX: 0,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: [],
          title: {
            text: "Labor Grades",
            style: {
              fontSize: "16px",
            },
          },
          labels: {
            style: {
              fontSize: "16px",
            }
          }
        },
        yaxis: {
          title: {
            text: "Hours",
            style: {
              fontSize: "16px"
            }
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -30,
          offsetX: 0,
          fontSize: "16px",
        },
      },
      wp: this.props.wp,
      tsheets: this.props.tsheets,
      startDate: "",
      endDate: "",
    };
    this.calcValues = this.calcValues.bind(this);
  }

  componentDidMount() {
    this.calcValues();
  }

  calcValues() {
    console.log(this.state.wp);
    var laborGrades = [];
    var budgetHours = [];
    var actualHours = [];
    var REHours = [];
    this.state.wp.workPackagePlanCollection.forEach((x) => {
      var revision = 0;
      if (x.type === "BUDGET") {
        laborGrades.push(x.labor_grade_id);
        budgetHours.push(parseInt(x.plan_hour));
      } else {
        if (x.revision > revision) {
          revision = x.revision;
          REHours[laborGrades.indexOf(x.labor_grade_id)] = parseInt(
            x.plan_hour
          );
        }
      }
    });

    for (var i = 0; i < laborGrades.length; i++) {
      actualHours.push(0);
    }

    console.log(this.state.tsheets);

    this.state.tsheets.forEach((ts) => {
      ts.details.forEach((tsRow) => {
        console.log(tsRow.project_wp);
        console.log(this.state.wp.project_wp);
        if (tsRow.project_wp === this.state.wp.project_wp) {
          actualHours[
            laborGrades.indexOf(ts.employee.labor_grade_id.labor_grade_id)
          ] += parseInt(
            tsRow.saturday +
              tsRow.sunday +
              tsRow.monday +
              tsRow.tuesday +
              tsRow.wednesday +
              tsRow.thursday +
              tsRow.friday
          );
        }
      });
    });

    console.log(laborGrades);
    console.log(budgetHours);
    console.log(actualHours);
    console.log(REHours);

    var startDate = new Date(
      this.state.wp.workPackagePlanCollection[0].start_date
    )
      .toISOString()
      .split("T", 1)[0];
    var endDate = new Date(this.state.wp.workPackagePlanCollection[0].end_date)
      .toISOString()
      .split("T", 1)[0];

    this.setState((prevState) => ({
      series: [
        ...prevState.series,
        {
          name: "Budgeted",
          data: budgetHours,
        },
        {
          name: "Done",
          data: actualHours,
        },
        {
          name: "Remaining RE estimate",
          data: REHours,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: laborGrades,
        },
      },
      startDate: startDate,
      endDate: endDate,
    }));
  }

  render() {
    return (
      <div className="budgetActual-cotainer">
        <div className="budgetActual-date-container">
          <b>Date:</b> {" " + this.state.startDate + " - " + this.state.endDate}
        </div>
        <Chart
          className="budgetActual-chart"
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="500"
          width="800"
        />
      </div>
    );
  }
}

export default BudgetVsActual;
