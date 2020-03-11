import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';


export default function MoreVertOption(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreVertIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to= {props.link} style = {{textDecoration: 'none', color: 'black'}}><MenuItem> Edit </MenuItem> </Link>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}