import React, { Component } from 'react';
import './Login.css';
import agent from '../../api/agent.js';


export default class Login extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      employee_zid: null,
      password: '',
    })
    this.updateInputValue = this.updateInputValue.bind(this);
  }
    
  updateInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="loginWrapper">
        {/* Index Title */}
        <p className="prjMng">Project Management</p>
        <div className="loginContainer">
          <div className="loginHint">
            Login
          </div>
          {/* Login Form */}
          <form className="loginForm" onSubmit={(e) => this.props.loginHandler(e, {id: this.state.employee_id, password: this.state.password})}>
            {/* Email Div */}
            <div className="loginEmail">
              <input
                className="loginInputs"
                name="employee_id"
                placeholder="Employee Id"
                required
                autoFocus
                onChange = {this.updateInputValue}
              />
            </div>
            {/* Password Div */}
            <div className="loginPwd">
              <input
                  className="loginInputs"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange = {this.updateInputValue}
              />
            </div>
            <div className="loginBsection">
              <a href="/timesheet" className="forgetPwd">Forgot Password?</a>
              <button className="loginBtn" type="submit"> Login </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

