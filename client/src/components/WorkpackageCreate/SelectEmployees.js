import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./WorkpackageCreate.css";

/**
 * Author: Prabh
 * Version: 1
 * Desc: first step for wp creation
 */
const SelectEmployees = props => {
  var wpEmpList = [];
  props.project.employees.map(e => {
    var data = {};
    data.value = e.employee_id;
    data.label = e.first_name + " " + e.last_name;
    wpEmpList.push(data);
  });

  return (
    <div className="selectEmployee_container">
    <Autocomplete
      multiple
      options={wpEmpList}
      values={props.wpEmps}
      getOptionLabel={(option) => option.label}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Select Employees"
        />
      )}
    />
    </div>
  );
};

export default SelectEmployees;
