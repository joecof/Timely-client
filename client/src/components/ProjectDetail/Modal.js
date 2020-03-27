import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import './Modal.css';

class Modal extends Component{

  constructor(props) {
    super(props);

    this.state = {
      setOpen: false,
      open: false,
      members: []
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      members: nextProps.members,
      setOpen: nextProps.open
     });  
  }

  handleClickOpen = () => {
    this.setState({
      setOpen: true
    });
  };

  handleClickClose = () => {
    this.setState({
      setOpen: false
    });
  };
    
  render() {

    return (
      <div >
        <Dialog
          open={this.state.setOpen}
          keepMounted
          onClose={this.handleClickClose}
        >
          <DialogContent className = "modal-container">
            <div> 
              <p className= "modal-title">Team Members</p>
            </div>
            {this.state.members.map(m =>
              <Grid container direction="row" alignItems="center">
              <Grid item className="projectDetailsMargin2">
                <Avatar variant="circle" aria-controls="simple-menu" aria-haspopup="true">
                  {m.first_name.slice(0,1).toUpperCase()}
                  {m.last_name.slice(0,1).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography>{m.first_name + " " + m.last_name}</Typography>
              </Grid>
            </Grid>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default Modal;
