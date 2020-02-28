import React, { Component } from 'react'
import './Login.css';

export default class Login extends Component {

    constructor(props) {
        super(props); 
    
        this.state = ({
          email: '',
          password: '',
        })
    
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
      
    updateInputValue(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        if(this.state.email === "admin@gmail.com" && this.state.password === "admin") {
            this.props.history.push("/dashboard");
        }
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
                    <form className="loginForm">
                        {/* Email Div */}
                        <div className="loginEmail">
                            <input
                            className="loginInputs"
                            type="email"
                            name="email"
                            placeholder="Email Address"
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
                        <div className="loginBsection">
                            <a href="/timesheet" className="forgetPwd">Forgot Password?</a>
                            <button className="loginBtn" onClick  = {this.handleSubmit}>Login </button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

