import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    flexGrow: 2,
    padding: theme.spacing(3),
  },
});

class UserDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      loaded_user: {}
    })

    this.fetchUserData = this.fetchUserData.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData(){
    fetch("http://localhost:8080/timely/services/employees/1")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          loaded_user: data
        })
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Navbar loaded_user = {this.state.loaded_user} />
        <SideMenu loaded_user = {this.state.loaded_user} />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(UserDashboard);
