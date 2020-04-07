import React from "react";
import Chart from "react-apexcharts";
import { TextField, MenuItem } from "@material-ui/core";

class EmpHours extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        title: {
          text: "Employee hours spent",
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "20px",
            color: "#263238"
          }
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            formatter: (data, index) => this.state.emps[index.dataPointIndex]
          }
        },
        xaxis: {
          categories: [],
          axisBorder: {
            show: true,
            color: "#78909C",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0
          },
          title: {
            text: "Employees",
            style: {
              fontSize: "16px",
              color: "#263238"
            }
          }
        },
        yaxis: {
          axisBorder: {
            show: true,
            color: "#78909C",
            height: 1,
            offsetX: 0,
            offsetY: 0
          },
          title: {
            text: "Hours",
            style: {
              fontSize: "16px",
              color: "#263238"
            }
          }
        }
      },
      series: [
        {
          name: "Hours",
          data: []
        }
      ],
      emps: [],
      week: this.props.week
    };
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.getWeeksMap = this.getWeeksMap.bind(this);
    this.setGraphValues = this.setGraphValues.bind(this);
  }

  componentDidMount() {
    this.setGraphValues();
  }

  setGraphValues() {
    var emps = [];
    var empsNames = [];
    this.props.EmpsX.forEach(x => {
      emps.push(x.employee_id);
      empsNames.push(
        x.first_name +
          " " +
          x.last_name +
          " (" +
          x.labor_grade_id.labor_grade_id +
          ")"
      );
    });

    var projName = this.props.wp.project.project_code;
    var wpName = this.props.wp.work_package_id;
    var hours = [];
    console.log(this.state.week)
    emps.forEach(e => {
      var count = 0;
      this.props.EmpsY.forEach(ts => {
        if (ts.employee.employee_id === e && ts.week === this.state.week) {
          ts.details.forEach(tsRow => {
            if (
              tsRow.project_code === projName &&
              tsRow.work_package_id === wpName
            ) {
              count +=
                tsRow.saturday +
                tsRow.sunday +
                tsRow.monday +
                tsRow.tuesday +
                tsRow.wednesday +
                tsRow.thursday +
                tsRow.friday;
            }
          });
        }
      });
      hours.push(count);
    });
    console.log(hours);

    this.setState(prevState => ({
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: emps
        }
      },
      series: [
        {
          ...prevState.series,
          data: hours
        }
      ],
      emps: empsNames
    }));
  }

  handleWeekChange(e) {
    console.log(e.target.value);
    this.setState({
      week: e.target.value
    }, () => this.setGraphValues());
  }

  getWeeksMap() {
    var weeks = [];
    var startDate = new Date(this.props.wp.workPackagePlanCollection[0].start_date);
    var endDate = new Date(this.props.wp.workPackagePlanCollection[0].end_date);
    console.log(startDate)
    console.log(endDate);

    var startDay = startDate.getDay();

    if (startDay > -1 && startDay < 6) {
      startDate.setDate(startDate.getDate() + (6 - startDay));
    }

    if (endDate.getDay() < 6) {
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    }
    console.log(startDate);
    console.log(endDate);

    var curDate = startDate;
    while (curDate <= endDate) {
      weeks.push({
        label: curDate.toISOString().split("T", 1)[0],
        value: curDate.getWeek()
      });
      curDate.setDate(curDate.getDate() + 7);
    }
    return weeks;
  }

  render() {
    var weeks = [];

    if (this.props.wp.workPackagePlanCollection.length > 0) {
      weeks = this.getWeeksMap();
    }

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <TextField
              select
              label="Week Ending"
              className="WPInfowidth"
              name="week"
              value={this.state.week}
              onChange={this.handleWeekChange}
            >
              {weeks.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmpHours;
