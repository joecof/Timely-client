import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import agent from '../../../api/agent'
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const styles = theme => ({
  container: {
    height: 700,
    minWidth: 350,
    minHeight:400
  },
  button: {
    marginBottom: 10,
    display: 'inline-block',
    width: 210
  }
});

class SupervisorList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      employees: [],
      searchList: []
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.createData = this.createData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };


  createData(image, id, name, select) {
    return { image, id, name, select };
  }

  async fetchData() {
    const token = localStorage.getItem("token");
    const resp = await agent.employeeInfo.getAllEmployees(token);

    this.setState({
      searchList: resp
    })

    resp.forEach(item => {
      this.state.employees.push(
        this.createData(
            (<FaceIcon/>),
            item.employee_id, 
            item.first_name + " " + item.last_name, 
            (<Button 
              style={{marginLeft: '20px'}} 
              variant="outlined" 
              color="primary" 
              onClick = {() => {this.props.selectSupervisor(item.employee_id, item.first_name, item.last_name); this.handleClose()}}> Select</Button>)))
    })
  }

  render() {
      const { classes } = this.props;

      return(
        <div>
        <Button disabled = {!this.props.hr} variant = "outlined" color ="primary" className = {classes.button} onClick={this.handleClickOpen}>Choose Supervisor</Button> 
        <Dialog className = {classes.container} disableBackdropClick disableEscapeKeyDown open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Select a Supervisor</DialogTitle>
          <DialogContent>
          <Autocomplete
            disableClearable
            options={this.state.searchList.map((option) => option.first_name + " " + option.last_name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a Supervisor"
                margin="normal"
                variant="outlined"
                name="name"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell> Photo </TableCell>
                  <TableCell> ID </TableCell>
                  <TableCell> Name </TableCell>
                  <TableCell> Select </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.employees.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{row.image}</TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{`${row.name}`}</TableCell>
                    <TableCell align="left">{row.select}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    }
}

export default withStyles(styles, { withTheme: true })(SupervisorList);