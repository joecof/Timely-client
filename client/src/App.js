import React, {Component} from 'react';
import agent from './api/agent'
import { BrowserRouter, Redirect} from "react-router-dom";
import Routes from './components/Routes/Routes'
import "./App.css";


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
      token: null
    })

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.setAutoLogout = this.setAutoLogout.bind(this);
    this.sessionHandler = this.sessionHandler.bind(this);

  }

  componentDidMount() {
    this.sessionHandler();
  }

   /**
   * Checks if the user has logged-in in the past hour. If user has logged in, will maintain there 
   * session, and keep them logged in to the system until the session as expired. 
   */
  sessionHandler() {
    const session = sessionStorage.getItem('logged');
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    if (!session) {
      this.logoutHandler();
      return;
    } 

    if(!token || !expiryDate) {
      this.props.history.push('/');
      return; 
    }

    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime(); 
    this.setAutoLogout(remainingMilliseconds);

    this.setState({
      isAuth: true,
      loadedUser: JSON.parse(sessionStorage.getItem('user'))
    })
  }

  /**
   * Login handler. Logs in the user and sets state of application to authenticated. 
   * Will redirect to a user dashboard upon login. 
   * @param {event} event 
   * @param {object} data 
   */
  async loginHandler(event, data){
    event.preventDefault();
    
    try {
      const response = await agent.authorization.login(data);

      if(!response) {
        //probably some error message / incorrect credentials 
        return;  
      }

      this.setState({
        isAuth: true,
        loadedUser: response.loadedUser,
        token: response.token
      })
      
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );

      localStorage.setItem('expiryDate', expiryDate.toISOString());
      localStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.loadedUser));
      sessionStorage.setItem('logged', true)

      this.setAutoLogout(remainingMilliseconds);   

    } catch(e) {
      console.error(e);
    }
  }

  /**
   * Logout handler. Logs out the user, and sets state of authentication to false.  
   */
  logoutHandler() {
    this.setState({
      isAuth: false,
      loadedUser: null,
    })

    localStorage.removeItem('expiryDate');
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem('logged')
  }

  /**
   * Set Auto Logout. Logs out the user automatically after 1 hour has expired. Will remove token and user info from localStorage. 
   * @param {int} milliseconds 
   */
  setAutoLogout(milliseconds) {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };
  
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
      var loadToken = null;
      if(localStorage.getItem('token') == null) {
        loadToken = this.state.token;
      } else {
        loadToken = localStorage.getItem('token');
      }
      routes = <Routes { ...this.props} config = {config('authentication')} token={loadToken}/>
      
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


