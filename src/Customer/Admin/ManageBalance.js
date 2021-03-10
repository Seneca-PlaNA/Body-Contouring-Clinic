import React from 'react';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';

class ManageBalance extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [{ url: '/Customer/Admin', title: 'Home' },
              { url: `/Customer/Admin/ManageBalance`, title: 'ManageBalance' },
    ],

      children: 'Customer',
      auth: 'Admin',
      balances: [],
      balanceHistories: [],
      accounts: [],
      accountLevels: [],
      services:[],
    };
  }

getBalances(){
  return new Promise((resolve) => {
    fetch(`${process.env.REACT_APP_API_URL}/balances`)
      .then((response) => response.json())
      .then((results) => {
        resolve(results);
      });
  });
}

componentDidMount() {
  this.getBalances()
  .then((data) => {
    this.setState({
      balances: data,
      balanceHistories: data.balanceHistories,
      accounts: data.accounts,
      accountLevels: data.accountLevels,
      services: data.services,
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
          <h2 className="PageTitle">Hi, {this.state.user.firstName + ' ' + this.state.user.lastName}</h2>
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
                    ${this.state.balances.balanceAccount}
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
                      <td>${this.state.balances.balanceAccount}</td>
                      <td>Body Clinic</td>
                      <td>Laser skin clean therapy</td>
                      <td>$100</td>
                      <td>
                        <a href="/Customer/BalanceDetail">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>2021-01-21</td>
                      <td>Face Clinic</td>
                      <td>Remove Black head</td>
                      <td>$50</td>
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

export default ManageBalance;
