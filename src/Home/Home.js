import React from 'react';
import '../App.css';
import logo from '../resources/brand-logo.png';
import underBar from '../resources/underBar.png';
import RouterConfig from '../RouterConfig';
// import { Link } from 'react-router-dom'
// import Nav from './nav';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      isLogin: localStorage.getItem('isLogin'),
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/account/' + localStorage.getItem('_id')).then(
      (res) => {
        this.setState({
          profile: res.data,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render() {
    let auth;
    if (this.state.isLogin) {
      auth = (
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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Service">
                Service and Prices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/VIP">
                VIP
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Appointment">
                Appointment
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Request">
                Request
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Customer">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={() => localStorage.clear()}>
                Log out
              </a>
            </li>
          </ul>
        </nav>
      );
    } else {
      auth = (
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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Service">
                Service and Prices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Register/Login">
                LogIn
              </a>
            </li>
          </ul>
        </nav>
      );
    }
    return (
      <div className="App">
        {auth}
        <br />
        <img src={logo} alt="logo" />
        <br />
        <br />
        <img src={underBar} alt="bar" />
        <br />
        <br />
        <br />
        <RouterConfig />
      </div>
    );
  }
}

export default Home;
