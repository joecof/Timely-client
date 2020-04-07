import React from 'react';
import Button from '@material-ui/core/Button';



/**
 * Author: Lawrence Zheng
 * Version: 1.0 
 * Description: A view info button component. 
 * @param {JSON} props 
 */

export default function ViewInfo(props) {
  return (
    <div>
        <Button onclick = {this.props.handleClick} variant = "contained" color = "primary">View</Button>
    </div>
  );
}