import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";



class WorkPackageInfo extends Component{
  state = {
  };


  render () {
    const {classes} = this.props;
    
    return (
      <form autoComplete="off">
        <TextField
          label="Read Only"
          defaultValue="WorkpackageId"
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
  
        <TextField
          label="Read Only"
          defaultValue="Team"
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <br/>
  
        <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            Description
            rowsMax="6"
            value={this.props.item}
            onChange={this.handleChange('multiline')}
            className={classes.textField}
            margin="normal"
          />
          <br/>

        <Table></Table>
  
        <Button variant="contained" color="primary">New Plan</Button>
      </form>
    );
  };

export default workPackageInfo;
