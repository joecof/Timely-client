import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EmployeeInfo from './EmployeeInfo'
import BasicInfo from './BasicInfo'
import ChangePassword from './ChangePassword'
import agent from '../../api/agent'
import Alert from '../Alert/Alert'
import CircularProgress from '@material-ui/core/CircularProgress';
import { HTTP_STATUS } from '../../constants/constants'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const laborData = require('../HrPortal/CreateEmployeeForm/labor')

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 750,
  },
  divider: {
    margin: 45,
    height: 690
  }
});

class EmployeeForm extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      loadedUser: null,
      supervisor: null,
      isAdmin: false,
      isHr: false, 
      isSuperTimesheetApprover: false,
      marks: laborData,
      laborGradeId: '',
      laborGradeName: '',
      vacation: '',
      supervisorSelected: false,
      supervisorFirstName:'',
      supervisorLastName: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      marksValue: 0,
      passwordChange: false 
    })

    this.fetchData = this.fetchData.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectSupervisor = this.selectSupervisor.bind(this);
    this.valueLabelFormat = this.valueLabelFormat.bind(this);
    this.getSliderValue = this.getSliderValue.bind(this);

  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.fetchData(token);

    this.setState({
      errorAlert: false,
      successAlert: false,
      passwordChange: false 
    })

    ValidatorForm.addValidationRule('isPassword', (value) => {return value.length < 6 && value.length > 0 ? false : true;});
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPassword');
  }

  valueLabelFormat(value) {
    return this.state.marks[value].label;
  }

  getSliderValue(value) {
    this.setState({
      laborGradeId: this.state.marks[value].label,
      laborGradeName: this.state.marks[value].name
    })
  }

  selectSupervisor(value, firstName, lastName) {
    this.setState({
      supervisorId: value,
      supervisorFirstName:firstName,
      supervisorLastName: lastName,
    })
  }

  formHandler(e) { 
     this.setState({
      [e.target.name]: e.target.value
    });

    if(this.state.newPassword.length > 0 || this.state.confirmPassword.length > 0 || this.state.oldPassword.length > 0) {
      this.setState({
        passwordChange: true
      })
    } 
  }

  async handleSubmit() {
    const token = localStorage.getItem("token");
    let employee = this.state.loadedUser;

    const { 
      firstName,
      lastName, 
      laborGradeId,
      laborGradeName,
      supervisorId,
      vacation,
      oldPassword, 
      newPassword, 
      confirmPassword,
    } = this.state; 

    try {
      /**
       * Checks if the user is inputting a password change submission 
       */
      if(oldPassword.length > 0 || newPassword.length > 0 || confirmPassword.length > 0) {
        if(this.props.hr) {
          if(newPassword !== confirmPassword) {
            this.setState({
              errorAlert: true,
            })
          } else {
            employee.first_name = firstName; 
            employee.last_name = lastName; 
            employee.labor_grade_id.labor_grade_id = laborGradeId;
            employee.labor_grade_id.labor_grade_name = laborGradeName;
            employee.vacation = vacation;
            employee.supervisor_id = supervisorId
            employee.password = newPassword;

            await agent.employeeInfo.updateEmployee(this.props.loadedUser.employee_id, token, employee)

            this.setState({
              successAlert: true, 
              errorAlert: false,
              passwordChange: false
            })
          }
        } else {
          if(oldPassword !== employee.password || newPassword !== confirmPassword) {
            this.setState({
              errorAlert: true,
            })
          } else {
            employee.first_name = firstName; 
            employee.last_name = lastName; 
            employee.labor_grade_id.labor_grade_id = laborGradeId;
            employee.labor_grade_id.labor_grade_name = laborGradeName;
            employee.vacation = vacation;
            employee.supervisor_id = supervisorId
            employee.password = newPassword;
  
            await agent.employeeInfo.updateEmployee(this.props.loadedUser.employee_id, token, employee)
  
            this.setState({
              successAlert: true, 
              errorAlert: false,
              passwordChange: false
            })
          }
        }
        /**
         * Checks if the user is not inputting a password change submission, but wants to change other fields in their profile. 
         */
      } else {
        employee.first_name = firstName; 
        employee.last_name = lastName; 
        employee.labor_grade_id.labor_grade_id = laborGradeId;
        employee.labor_grade_id.labor_grade_name = laborGradeName;
        employee.vacation = vacation;
        employee.supervisor_id = supervisorId
        await agent.employeeInfo.updateEmployee(this.props.loadedUser.employee_id, token, employee)

        this.setState({
          successAlert: true, 
          errorAlert: false
        })
      }
    } catch(e) {
      this.setState({
        successAlert: false,
        errorAlert: true, 
      })
    }

    setTimeout(() => {
      this.setState({
        successAlert: false, 
        errorAlert: false
      }) 
    }, 1000);
  }

  async fetchData(token) {

    try {
      const resp = await agent.employeeInfo.getEmployeeById(this.props.match.params.id, token)
      const supervisor = await agent.employeeInfo.getEmployeeById(resp.supervisor_id, token)

      this.setState({
        loadedUser: resp,
        firstName: resp.first_name,
        lastName: resp.last_name, 
        laborGradeId: resp.labor_grade_id.labor_grade_id,
        laborGradeName: resp.labor_grade_id.labor_grade_name,
        supervisorId: resp.supervisor_id,
        isAdmin: resp.is_admin,
        isHr: resp.is_hr_staff, 
        vacation: resp.vacation,
        isSuperTimesheetApprover: resp.is_super_timesheet_approver,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        supervisor: supervisor,
        supervisorFirstName: supervisor.first_name,
        supervisorLastName: supervisor.last_name,
        passwordChange: false

      })

      for(const key in this.state.marks) {
        if(this.state.marks[key].label === this.state.laborGradeId) {
          this.setState({
            marksValue: key
          }) 
        }
      }
    } catch(e) {
      if(e.response.status === HTTP_STATUS.UNAUTHORIZED) {
        this.props.sessionLogoutHandler();
      }
    }
  }

  render() {
    const { classes, hr } = this.props;
    const { loadedUser, supervisor } = this.state;

    return (
      <div className={classes.root}>
        {this.state.errorAlert ? <Alert config = {{message: "error", variant: "error"}}/> : null}
        {this.state.successAlert ? <Alert config = {{message: "success", variant: "success"}}/> : null}
        {
          loadedUser && supervisor ? (
            <Paper className = {classes.paper} elevation = {2}>
              <Grid container spacing={1}>
                <EmployeeInfo loadedUser = {loadedUser} isHr = {this.state.isHr} isAdmin = {this.state.isAdmin} isSuperTimesheetApprover = {this.state.isSuperTimesheetApprover}/>
                <Divider orientation="vertical" flexItem className = {classes.divider}/>
                <BasicInfo 
                  loadedUser = {loadedUser} 
                  supervisor = {supervisor} 
                  hr={hr} 
                  formHandler = {this.formHandler} 
                  value = {this.state.value}
                  selectSupervisor = {this.selectSupervisor}
                  supervisorName = {`${this.state.supervisorFirstName} ${this.state.supervisorLastName}`}
                  valueLabelFormat = {this.valueLabelFormat}
                  getSliderValue = {this.getSliderValue}
                  marks = {this.state.marks}
                  marksValue = {this.state.marksValue}
                  />
                <Divider orientation="vertical" flexItem className = {classes.divider}/>
                <ChangePassword 
                  loadedUser = {loadedUser} 
                  hr={hr} 
                  formHandler = {this.formHandler} 
                  handleSubmit = {this.handleSubmit} 
                  oldPassword = {this.state.oldPassword}
                  newPassword = {this.state.newPassword}
                  confirmPassword = {this.state.confirmPassword}
                  />
              </Grid>
            </Paper> )
            :
            <CircularProgress />  
        }
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeForm);

