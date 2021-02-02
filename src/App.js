import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'  // temporary, we can create our css later
import Footer from './Footer';
import logo from './resources/brand-logo.png';
import underBar from './resources/underBar.png'
import RouterConfig from './RouterConfig';


class App extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        backServer:false
      };
  }

  componentDidMount(){
    fetch('http://localhost:3001/api')
    .then(res=>res.json())
    .then(data=>this.setState({backServer:data.backServer}));
  }

  render(){
    return(
      <div className="App">
        <nav className="nav-back navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">BodyContouringClinic@gmail.com</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">(416) 966 - 0006</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Service">Service and Prices</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/VIP">VIP</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Appointment">Appointment</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Request">Request</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Customer">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Register/Login">LogIn</a>
            </li>
          </ul>
        </nav>
        <br />
        <img src={logo} alt="logo"/><br/><br/>
        <img src={underBar} alt="bar" /><br/><br/>
        <br/>
        <RouterConfig />
        <Footer />
      </div>
    );
  }
}

export default App;
