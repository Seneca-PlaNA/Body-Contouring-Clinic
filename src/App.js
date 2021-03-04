/* eslint react/prop-types: 0 */
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // temporary, we can create our css later
import Footer from './Footer';
import Home from './Home/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backServer: false,
      count: 0,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api')
      .then((res) => res.json())
      .then((data) => this.setState({ backServer: data.backServer }));
  }

  render() {
    return (
      <div className="App">
        <Home />
        <br /><br />
        <br/><br />
        <Footer />
      </div>
    );
  }
}

export default App;
