import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: A dropdown component for the profile icon. 
 * @param {JSON} props 
 */
export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  /**
   * Opens the drop down menu. 
   * @param {event} event 
   */
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the drop down menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar variant="circle" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"/>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <Link to= {`/dashboard/hr/employee/${props.loadedUser.employee_id}`} style = {{textDecoration: 'none', color: 'black'}}>
          <MenuItem onClick={handleClose}> Profile </MenuItem> 
        </Link>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Link to="/" style = {{textDecoration: 'none', color: 'black'}}><MenuItem onClick={props.logoutHandler}> Logout </MenuItem> </Link>
      </Menu>
    </div>
  );
}