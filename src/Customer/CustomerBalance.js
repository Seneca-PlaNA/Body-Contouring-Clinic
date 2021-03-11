import React from 'react';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';

class CustomerBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     items: [
      { url: '/Customer/', title: 'Home' },
      { url: `/Customer/${this.props.id}`, title: 'Profile' },
      { url: `/Customer/Edit/${this.props.id}`, title: 'Edit Profile' },
      { url: `/Customer/Balance${this.props.id}`, title: 'Balance' },
    ], 
      _id: localStorage.getItem('_id'),
      balanceHistory: [],
      balance: [],
      account: [],
      service: [],
    };
  }

getBalanceHistories(id){
  return new Promise((resolve) => {
    fetch(`${process.env.REACT_APP_API_URL}/Balance/${id}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
}

componentDidMount() {
  this.getBalanceHistories(this.state.id).then((data) => {
    this.setState({
      balanceHistories: data,
      balance: data.balance,
      account: data.account,
      service: data.service
    });
  });
}

  render() {
    const pagination = {
      color: '#B58970',
      textAlign: 'center',
      marginLeft: '50px',
    };
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-6" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Hi, {this.state.account.firstName + ' ' + this.state.account.lastName}</h2>
          <hr />
          <br />
          <h4>Balance Information</h4>
          <Container class="col-md-6">
            <Form style={{ fontSize: '20px', marginLeft: '80px', textAlign: 'left' }}>
              <Form.Group as={Row}>
                <Form.Label column md={3}>
                  Current Balance:
                </Form.Label>
                <Col sm={2}>
                  <Form.Label column md={0}>
                    ${this.state.balance.balanceAccount}
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label column md={3}>
                    Level:
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label column md={0}>
                    VIP
                  </Form.Label>
                </Col>
              </Form.Group>
            </Form>
          </Container>
          <br />
          <h4>Balance History</h4>
          <Container class="col-md-6">
            <Table>
              <Row>
                <Col md={12}>
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>Therapy Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                    <tr>
                      <td>{this.state.balance.balanceAccount}</td>
                      <td>{this.state.service.serviceCategory}</td>
                      <td>{this.state.service.name}</td>
                      <td>{this.state.service.price}</td>
                      <td>
                        <a href="/Customer/BalanceDetail">details</a>
                      </td>
                    </tr>
                  </table>
                  <br />
                </Col>
              </Row>
              <span style={pagination}>
                <a href="#"> &laquo; </a>
                <a href="#"> 1 </a>
                <a className="active" href="#">
                  {' '}
                  2{' '}
                </a>
                <a href="#"> 3 </a>
                <a href="#"> 4 </a>
                <a href="#"> 5 </a>
                <a href="#"> 6 </a>
                <a href="#"> &raquo; </a>
              </span>
            </Table>
          </Container>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerBalance;
