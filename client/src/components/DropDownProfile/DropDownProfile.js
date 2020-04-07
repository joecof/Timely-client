import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Face from '../Icon/Face'


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
      {/* <Avatar variant="circle" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"/> */}
      <Face handleClick={handleClick} avatar = {{width: 30, height: 30, margin: '0 auto'}} />
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <Link to= {`/dashboard/profile/${props.loadedUser.employee_id}`} style = {{textDecoration: 'none', color: 'black'}}>
          <MenuItem onClick={handleClose}> Profile </MenuItem> 
          <Link to="/" style = {{textDecoration: 'none', color: 'black'}}><MenuItem onClick={props.logoutHandler}> Logout </MenuItem> </Link>
        </Link>
      </Menu>
    </div>
  );
}
