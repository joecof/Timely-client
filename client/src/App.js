import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login'
import UserDashboard from './components/UserDashboard/UserDashboard'


class App extends Component {
  
  render() {
    return(
      <div className="App">
      <BrowserRouter>
          <Switch>
            <Route
              exact path ="/"
              render= {props => (
                <Login
                  {...props}
                />
              )}
            />
            <Route
              exact path ="/dashboard"
              render= {props => (
                <UserDashboard
                  {...props}
                />
              )}
            />
          </Switch>
        </BrowserRouter>

    </div>
    )
  }
}

export default App;


