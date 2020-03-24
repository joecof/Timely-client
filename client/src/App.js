import React, {Component} from 'react';
import agent from './api/agent'
import { BrowserRouter, Redirect} from "react-router-dom";
import Routes from './components/Routes/Routes'


/**
 * Author: Joe 
 * Version: 1.0 
 * Description: App component. Defines login functions and authorization.  
 */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      isAuth: false,
      loadedUser: null,
    })

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  /**
   * Login handler. Logs in the user and sets state of application to authenticated. 
   * Will redirect to a user dashboard upon login. 
   * @param {event} event 
   * @param {object} data 
   */
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

  /**
   * Logout handler. Logs out the user, and sets state of authentication to false.  
   */
  logoutHandler() {
    this.setState({
      isAuth: false,
      loadedUser: null
    })
  }
  
  render() {
    
    let routes; 
    /**
     * Returns a configuration objection that routes takes in to pass it the developers desired props. 
     * @param {String} name 
     */
    let config = (name) => {
      return ({
        option: name,
        loginHandler: this.loginHandler,
        logoutHandler: this.logoutHandler,
        loadedUser: this.state.loadedUser,
      })
    }

    /**
     * If isAuth is true then render all available routes for authenticated users (logged in users). 
     * Else if isAuth is false render all available routes for non-authenticated (not logged-in users). 
     */
    if(this.state.isAuth) {
      routes = <Routes { ...this.props} config = {config('authentication')} />
    } else {
      routes = <Routes { ...this.props} config = {config('login')} />
    }

    return(
      <div className="App">
      <BrowserRouter>
        {this.state.isAuth ? <Redirect to= {`/dashboard/${this.state.loadedUser.employee_id}`}  /> : <Redirect to='/'  />}
        {routes}
      </BrowserRouter>
    </div>
    )
  }
}

export default App;


