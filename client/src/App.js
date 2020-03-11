import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import agent from './api/agent'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      isAuth: false,
      loadedUser: null
    })

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  async loginHandler(event, data){
    event.preventDefault();

    const response = await agent.authorization.login(data);
    if(response) {
      this.setState({
        isAuth: true,
        loadedUser: response
      })
    }
  }

  logoutHandler() {
    this.setState({
      isAuth: false,
      loadedUser: null
    })
  }
  
  
  render() {

    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render = {props => (
            <Login
              {...props}
              loginHandler = {this.loginHandler}
            />
          )}
        />
      </Switch>
    );

    if(this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/dashboard"
            render= {props => (
              <Dashboard
                {...props} 
                logoutHandler = {this.logoutHandler}
                loadedUser = {this.state.loadedUser}
              />
            )}
          />
        </Switch>
      )
    }
    return(
      <div className="App">
      <BrowserRouter>
        {this.state.isAuth ? <Redirect to='/dashboard/timesheet'  /> : <Redirect to='/'  />}
        {routes}
      </BrowserRouter>
    </div>
    )
  }
}

export default App;


