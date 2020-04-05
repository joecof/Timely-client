import React from "react";
import Chart from "react-apexcharts";

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
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: "smooth"
        },
        title: {
          text: "Budget vs Actual hours spent per labor grade",
          align: "center"
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: [],
          title: {
            text: "Labor Grades"
          }
        },
        yaxis: {
          title: {
            text: "Hours"
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      wp: this.props.wp,
      tsheets: this.props.tsheets
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
    this.state.wp.workPackagePlanCollection.forEach(x => {
      if (x.type === "BUDGET") {
        laborGrades.push(x.labor_grade_id);
        budgetHours.push(parseInt(x.plan_hour));
      }
    });

    for (var i = 0; i < laborGrades.length; i++) {
      actualHours.push(0);
    }

    console.log(this.state.tsheets);

    this.state.tsheets.forEach(ts => {
      ts.details.forEach(tsRow => {
        console.log(tsRow.project_wp);
        console.log(this.state.wp.project_wp);
        if (tsRow.project_wp === this.state.wp.project_wp) {
          console.log(
            laborGrades.indexOf(ts.employee.labor_grade_id.labor_grade_id)
          );
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

    this.setState(prevState => ({
      series: [
        ...prevState.series,
        {
          name: "Budgeted",
          data: budgetHours
        },
        {
          name: "Actual",
          data: actualHours
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: laborGrades
        }
      }
    }));
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height="500"
      />
    );
  }
}

export default BudgetVsActual;
