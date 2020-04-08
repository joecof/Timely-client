import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';


/**
 * Author: Joe
 * Version: 1.0
 * Description: A vertical dropdown component for the more icon.
 * @param {JSON} props
 */
export default function MoreVertOption(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  /**
   * Opens the drop down menu.
   * @param {event} event
   */
  const handleClick = (event) => {
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
      <EditIcon
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          to={props.link}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem> Edit </MenuItem>{" "}
        </Link>
        {props.employee.end_date == null ? (
          <MenuItem
            onClick={() => {
              props.handleArchive(props.id, props.employee);
              handleClose();
            }}
          >
            Archive
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              props.handleOpen(props.id, props.employee);
              handleClose();
            }}
          >
            Open
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
