import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import DropDownProfile from "../DropDownProfile/DropDownProfile"
import clsx from "clsx";
import Searchbar from './Searchbar'
import MenuIcon from '@material-ui/icons/Menu';
import constants from '../../constants/contants'

/**
 * Defined breaking points for navbar size upon resizing. 
 */
const navbarExpandedWidth = constants.NAVBAR_EXPANDED_WIDTH;
const navbarShrinkedWidth = constants.NAVBAR_SHRINKED_WIDTH;

/**
 * Material UI styling JSON object. 
 * @param {JSON} theme 
 */
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'black'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'black'
  },
  userName: {
    color: 'black',
    paddingRight: theme.spacing(3),
  }, 
  divider: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    position: 'fixed',
    width: `calc(100% - ${navbarShrinkedWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: { 
    marginLeft: navbarExpandedWidth,
    width: `calc(100% - ${navbarExpandedWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
});

/**
 * Author: Joe
 * Version: 1.0 
 * Description: Navbar component for dashboard navigation. 
 */
class Navbar extends Component {

  /**
   * Returns a JSX Navbar component that resizes dynamically. 
   * @param {JSON} classes 
   */
  resizeNavbar(classes) {
    return(
      <div className={classes.root}>
        <AppBar  
          position="fixed" elevation={0}         
          className={clsx(classes.appBar, {[classes.appBarShift]: this.props.resize})}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick = {this.props.resizeDashboard}
            >
              {/* Will render a different 'icon' depending on if the user has resized the navbar or not. */}
              {this.props.resize ?  <ArrowBackIcon/>  : <MenuIcon/>  }
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap> Timely </Typography>
            <Searchbar/>
            <Divider className = {classes.divider} orientation="vertical" flexItem />
            <h4 className = {classes.userName}> {this.props.loadedUser.first_name} {this.props.loadedUser.last_name}</h4>
            <DropDownProfile logoutHandler = {this.props.logoutHandler}/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  render() {
    const { classes } = this.props; 
    return(
      this.resizeNavbar(classes)
    )
  }
}

export default withStyles(styles, { withTheme: true })(Navbar);