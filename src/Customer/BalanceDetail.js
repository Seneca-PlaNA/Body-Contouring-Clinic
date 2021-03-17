import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import styles from '../app.module.css';
import SideBar from '../SideBar/SideBar';

class BalanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Customer/', title: 'Home' },
        { url: '/Customer/Profile', title: 'Profile' },
        { url: '/Customer/Edit', title: 'Edit Profile' },
        { url: '/Customer/Balance', title: 'Balance' },
      ],
//      _id: localStorage.getItem('_id'),
      children: 'Balance',
      balances: [],
      balanceHistory: [],
      balance: [],
      profile:{},
      services: [],
    };
  }

  getCustomerProfile(id) {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    
    });
  }

  getBalance(id){
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/balance-history/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
      });
    });
  }

  componentDidMount() {
    this.getCustomerProfile(this.state._id).then((data) => {
      this.setState({
        profile: data,
      });
      this.getBalance(this.state.profile.balanceHistory).then((data) =>{
        this.setState({
          balance: data.balances,
          services: data.balances.services,
        });
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-6">
          <h2>Balance Details</h2>
          <hr />
          <Container>
            <Row>
              <Col></Col>
              <Col xs={7}>
                
              {this.state.balance.map((result) => (
                <table className={styles.appointmentTable} key={result._id}>
                  <tr>
                    <td>Customer Name: </td>
                    <td>{this.state.profile.firstName + ' ' + this.state.profile.lastName}</td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>{result.date}</td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>${result.services[0].price}</td>
                  </tr>
                  <tr>
                    <td>Service:</td>
                    <td>{result.services[0].name}</td>
                  </tr>
                  <tr>
                    <td>Contact #:</td>
                    <td>{this.state.profile.contactNumber}</td>
                  </tr>
                </table>
              ))}
              </Col>
              <Col></Col>
            </Row>
            <br />
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="outline-info" href="/Customer/Balance">
                Back
              </Button>
            </Col>
          </Container>
        </div>
      </div>
    );
  }
}

export default BalanceDetail;
