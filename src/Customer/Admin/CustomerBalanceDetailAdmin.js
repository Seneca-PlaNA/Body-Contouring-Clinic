import React from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import PropTypes from 'prop-types';

class CustomerBalanceDetailAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ url: `/Customer/Admin`, title: 'Home' },
              { url: `/Customer/Admin/Balance`, title: 'Balance Management' },
      ],
      _id: localStorage.getItem('_id'),
      balances: [],
      balanceHistory: [],
      profile: {},
      updateBalance: 0,
    };
  
  }

  onUpdateBalance(event){
    this.setState({
      updateBalance: event.target.value,
    })
  }

  getCustomerProfile() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account/${this.state._id}`)
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
    this.getCustomerProfile()
    .then((data)=>{
      this.setState({
        profile: data,
      })
    });

      this.getBalance(this.props.id)
      .then((data)=>{
        this.setState({
          balanceHistory: data,
          // balances: data.balances,
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
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Hi, {this.state.profile.firstName + ' ' + this.state.profile.lastName}</h2>
          <hr />
          <br />
          <h4>Balance Information</h4>
          <br/>
          <Container class="col-md-8">
            <Form style={{ fontSize: '20px', "margin-right": '200px', textAlign: 'left' }}>
              <Form.Group as={Row}>
                <Col sm={6}>
                  <Form.Label>
                    Current Balance: $ {this.state.balanceHistory == null? 0 :this.state.balanceHistory.currentBalance}
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label>
                    Update 
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Control type="text" value={this.state.updateBalance} onChange={this.onUpdateBalance.bind(this)}/> 
                </Col>
                <Col sm={1}>
                  <Button variant="outline-info">
                    Add
                  </Button>
                </Col>
                <Col sm={1}>
                  <Button variant="outline-info">
                    Substract  
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Container>
          <br />
          <h4>Balance History</h4>
          <Container class="col-md-8">
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
                    {this.state.balanceHistory.balances == null? "" : this.state.balanceHistory.balances.map((result) => (
                    <tr key={result._id}>
                      <td>{result.date}</td>
                      <td>{result.services[0].serviceCategory.name}</td>
                      <td>{result.services[0].name}</td>
                      <td>${result.services[0].price}</td>
                      <td>
                        <a href={`/Customer/BalanceDetail/${result._id}`}>details</a>
                      </td>
                    </tr>
                   ))}
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

CustomerBalanceDetailAdmin.propTypes = {
  id : PropTypes.string.isRequired
}


export default CustomerBalanceDetailAdmin;
