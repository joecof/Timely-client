import React, {Component} from 'react';
import Navbar from './components/Navbar/Navbar'



class App extends Component {

  componentDidMount() {


  fetch(`http://127.0.0.1:8080/timely/services/token`, {
      method: 'post',
      body: JSON.stringify({
        "userName": "test",
        "password": "test"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(data => console.log(data));
}
  
  render() {
    return(
      <div className="App">
      <Navbar/>
    </div>
    )
  }
}

export default App;


