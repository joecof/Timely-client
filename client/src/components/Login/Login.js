import React, { Component } from 'react';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from '../../images/logo.png'

export default class Login extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      employee_id: null,
      password: '',
    })
    this.updateInputValue = this.updateInputValue.bind(this);
  }
    
  updateInputValue(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {

    return (
      <div className="login-container">
        {/* Index Title */}
          <div className="loginText">
            <img className="login-logo" src={logo}/>
            <span className="text-title">
              S<span className="lowercaseText">ign</span> I<span className="lowercaseText">n</span>
            </span>
          </div>
          {/* Login Form */}
          <form onSubmit={(e) => this.props.loginHandler(e, {id: this.state.employee_id, password: this.state.password})}>
            
            <div className="inputFields">
              <TextField className="textfields" id="standard-basic" label="Employee ID"
                  name="employee_id"
                  onChange = {this.updateInputValue}
                  // required
                  // autoFocus
                
             
                />
              </div>

              <div className="inputFields">              
                <TextField className="textfields" id="standard-password-input" label="Password" 
                  name="password"
                  onChange = {this.updateInputValue}
                  type="password"
                  // required
                  // autoFocus
                />

              </div>
            
            {/* 
              <input
                name="employee_id"
                placeholder="Employee Id"
                required
                autoFocus
                onChange = {this.updateInputValue}
              />

              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange = {this.updateInputValue}
              /> */}

            <div className="button-container">
              <Button className="loginButton" variant="contained" color="primary" type="submit">
                  Login
              </Button>
            </div>
              {/* <button type="submit"> Login </button> */}
  
          </form>
        </div>
    );
  }
}

