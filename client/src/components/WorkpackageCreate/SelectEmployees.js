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

  return (
    <Autocomplete
      multiple
      options={props.project.employees}
      onChange={(e, v) => props.handleTagsChange(v)}
      getOptionLabel={(option) => option.first_name + " " + option.last_name}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Select Employees"
        />
      )}
    /> 
  );
};

export default SelectEmployees;
