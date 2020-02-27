import React, { Component } from 'react'
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="loginWrapper">
                {/* Index Title */}
                <p className="prjMng">Project Management</p>
                <div className="loginContainer">
                    <div className="loginHint">
                        Login To Do Blabla
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
                            />
                        </div>
                        {/* Button Section */}
                        <div className="loginBsection">
                            <a href="/timesheet" className="forgetPwd">Forgot Password?</a>
                            <button className="loginBtn" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

