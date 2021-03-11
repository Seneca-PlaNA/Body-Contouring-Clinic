import React from 'react';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';

class CustomerBalance extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
      this.state = {
        items: [
          { url: '/Customer/', title: 'Home' },
          { url: `/Customer/${this.props.id}`, title: 'Profile' },
          { url: `/Customer/Edit/${this.props.id}`, title: 'Edit Profile' },
          { url: `/Customer/Balance${this.props.id}`, title: 'Balance' },
        ],
        _id: localStorage.getItem('_id'),
        balanceHistories: [],
        balance: [],
        account: [],
        service: [],
        accountLevel: [],
        customerBalance: {},
      };
  }

  getCustomerBalance(id){
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/Balance/${id}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
    });
  }

  componentDidMount(){
    this.getCustomerBalance(this.state._id).then((data) => {
      this.setState({
        customerBalance: data,
      });
    });
=======
    this.state = {
     items: [
      { url: '/Customer/', title: 'Home' },
      { url: `/Customer/${this.props.id}`, title: 'Profile' },
      { url: `/Customer/Edit/${this.props.id}`, title: 'Edit Profile' },
      { url: `/Customer/Balance${this.props.id}`, title: 'Balance' },
    ], 
      auth: 'General',
      _id: localStorage.getItem('_id'),
      balance: [],
      balanceId: '',
      customer: [],
      service: [],
      accountLevel: [],
      balanceHistory: [],
    };
>>>>>>> c3c439d (balance(need to fix))
  }

getBalances(id){
    fetch(`${process.env.REACT_APP_API_URL}/balance?customer=${id}`)
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      this.setState({
        requests: results,
    });
  });
}

componentDidMount() {
  this.getBalance(this.props.id).then((data) => {
    this.setState({
      balance: data,
 //     balanceId: data._id,
      balanceHistory: data.balanceHistory,
      customer: data.customer.account,
      service: data.service,
      accountLevel: data.accountLevel,
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
        {console.log(this.state.customer)}
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-6" style={{ 'margin-left': '80px' }}>
<<<<<<< HEAD
          <h2 className="PageTitle">Hi, {this.state.account.firstName + ' ' + this.state.accountLevel.lastName}</h2>
=======
          <h2 className="PageTitle">Hi, {this.state.customer.firstName + ' ' + this.state.customer.lastName}</h2>
>>>>>>> c3c439d (balance(need to fix))
          <hr />
          <br />
          <h4>Balance Information</h4>
          <Container class="col-md-6">
          {this.state.balanceHistories && this.state.balanceHistories.map((bal) => (
            <Form style={{ fontSize: '20px', marginLeft: '80px', textAlign: 'left' }} key={bal._id}>

              <Form.Group as={Row}>
                <Form.Label column md={3}>
                  Current Balance:
                </Form.Label>
                <Col sm={2}>
                  <Form.Label column md={0}>
<<<<<<< HEAD
                    ${bal.balance.balanceAccount}
=======
                    ${this.state.balance.balanceAccount}
>>>>>>> c3c439d (balance(need to fix))
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label column md={3}>
                    Level:
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label column md={0}>
<<<<<<< HEAD
                    {bal.accountLevel.name}
=======
                  ${this.state.accountLevel}
>>>>>>> c3c439d (balance(need to fix))
                  </Form.Label>
                </Col>
              </Form.Group>
              
            </Form>
            ))}
          </Container>

          <br />
          <h4>Balance History</h4>

          <Container class="col-md-6">
          { this.state.balanceHistories && this.state.balanceHistories.map((result) => (
            <Table key={result._id}>
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
<<<<<<< HEAD
                      <td>{result.balanceHistories.date}</td>
                      <td>{result.service.serviceCategory}</td>
                      <td>{result.service.name}</td>
                      <td>${result.service.price}</td>
=======
                      <td>${this.state.balance.balanceAccount}</td>
                      <td>${this.state.service.serviceCategory}</td>
                      <td>${this.state.service.name}</td>
                      <td>$100</td>
>>>>>>> c3c439d (balance(need to fix))
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
            ))}
          </Container>
          <br />
          <br />
          
        </div>
      </div>
    );
  }
}

export default CustomerBalance;
