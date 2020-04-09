import React from "react";
import Chart from "react-apexcharts";
import "./EstimationRE.css";

class EstimationRE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Responsibility Engineer Estimation",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Date",
            style: {
              fontSize: "16px"
            }
          },
        },
        yaxis: {
          title: {
            text: "Hours",
            style: {
              fontSize: "16px"
            }
          },
        },
        tooltip: {
          enabled: true,
          y: {
            show: true,
            formatter: (data, index) =>
              data + " hrs " + this.state.graphValueObj[index.dataPointIndex],
          },
        },
      },
      wp: this.props.wp,
      graphValueObj: [],
    };
    this.calcGraphValus = this.calcGraphValus.bind(this);
  }

  componentDidMount() {
    this.calcGraphValus();
  }

  calcGraphValus() {
    var date = [];
    var values = [];
    var valuesDetails = [];
    var valueObj = {};
    this.state.wp.workPackagePlanCollection.forEach((x) => {
      if (x.type === "ESTIMATE") {
        var thisValues = [];
        valueObj = {};

        var startDate = new Date(x.start_date).toISOString().split("T", 1)[0];
        if (date.indexOf(startDate) === -1) {
          date.push(startDate);
          values[date.indexOf(startDate)] = 0;
          valuesDetails.push(thisValues);
        }
        values[date.indexOf(startDate)] += x.plan_hour;
        valueObj.id = x.labor_grade_id;
        valueObj.hours = x.plan_hour;
        valuesDetails[date.indexOf(startDate)].push(valueObj);
      }
    });

    var graphValueObj = [];
    valuesDetails.forEach((x) => {
      var string = "";
      x.forEach((thisX) => {
        string += thisX.id + ": " + thisX.hours;
      });
      graphValueObj.push(string);
    });

    this.setState((prevState) => ({
      series: [
        ...prevState.series,
        {
          name: "RE estimate",
          data: values,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: date,
        },
      },
      graphValueObj: graphValueObj,
    }));
    console.log(date);
    console.log(values);
    console.log(valuesDetails);
  }

  render() {
    return (
      <div className="estimationRE-container">
        <Chart
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

export default EstimationRE;
