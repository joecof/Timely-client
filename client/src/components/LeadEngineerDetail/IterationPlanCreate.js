import React, { Component } from 'react'
import MUIDatatable from "mui-datatables";
import CustomToolbar from './CustomToolBar';

/**
 * Defines the columns for the current iteration plan. 
 */
const columns = [
    {
        name: "empId",
        label: "Employee ID",
        className: "column"
    },
    {
        name: "empName",
        label: "Employee Name",
        className: "column"
    },
    {
        name: "LG",
        label: "Labor Grade",
        className: "column"
    },
    {
        name: "Hours",
        label: "Hours",
        className: "column",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <div>
                    <input
                      type="number"
                      onBlur={event => {
                        updateValue(event.target.value);
                      }}
                    />
                  </div>
                );
              }
        }
    },

];


/**
 * Configuration for the MUI data table.
 */
const options = (props) => {
    const { history } = props;

    const data = {
        selectableRows: false,
        search: false,
        print: false,
        download: false,
        filter: false,
        customToolbar: () => {
            return <CustomToolbar history={history} />;
        },
    }

    return data;
};


class IterationPlanCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [["1","1","1","1"]],
        }

    }

    render() {
        return <>
            <MUIDatatable
                className="datatable"
                title={<h1> Iteration Progress</h1>}
                options={options(this.props)}
                columns={columns}
                data={this.state.data}
            /></>;
    }
}

export default IterationPlanCreate;