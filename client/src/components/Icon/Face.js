import React, { Component } from 'react'
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
  faceIcon: {
    width: '100%',
    height: '100%'
  },
});

class Face extends Component {

  face(classes) {
    return(
      <div>
        <Avatar className = {classes.avatar} alt="employee photo" >
          <FaceIcon className = {classes.faceIcon}/>
        </Avatar>
      </div>
    )
  }
  
  render() {
    const { classes, avatar } = this.props;

    return (
      this.face(classes, avatar)
    )
  }
}

export default withStyles(styles, { withTheme: true })(Face);
