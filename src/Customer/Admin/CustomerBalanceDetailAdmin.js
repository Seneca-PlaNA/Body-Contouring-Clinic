import React from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import PropTypes from 'prop-types';
import moment from 'moment';

class CustomerBalanceDetailAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ url: `/Customer/Admin`, title: 'Home' },
              { url: `/Staff/Admin`, title: 'Staff Management' },
              { url: `/Customer/Admin/Balance`, title: 'Balance Management' },
      ],
      _id: localStorage.getItem('_id'),
      balances: [],
      balanceHistory: [],
      profile: {},
      balance :{
        balanceAccount: 0,
        info: "",
        date: new Date(),
      }
    };
    this.handleAddBalance = this.handleAddBalance.bind(this);
  }

  onUpdateBalance(event){
    this.setState({
      balance : {
        ...this.state.balance,
        balanceAccount: Number(event.target.value),
      }
    })
  }

  onUpdateInfo(event){
    this.setState({
      balance : {
        ...this.state.balance,
        info: event.target.value,
      }
    })
  }

  handleAddBalance(){
    console.log(this.state.balance);
    console.log(this.props.id);
    fetch(`${process.env.REACT_APP_API_URL}/add-balance/${this.props.id}`,{
      method: "POST",
      body: JSON.stringify(this.state.balance),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      this.setState({
        completed: true,
      })
    });
  }

  handleSubstractBalance(){
    fetch(`${process.env.REACT_APP_API_URL}/substract-balance/${this.props.id}`,{
      method: "POST",
      body: JSON.stringify(this.state.balance),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      this.setState({
        completed: true,
      })
    });
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

          <Container class="col-md-8">
            <Form style={{ fontSize: '20px', textAlign: 'left' }}>
            <h4>Balance Information</h4><br/>
              <Row>
                <Col sm={4}>          
                  <Form.Label>
                    Current Balance: $ {this.state.balanceHistory == null? 0 :this.state.balanceHistory.currentBalance}
                  </Form.Label>
                </Col>
                <Col>
              <Row>
                  <Col sm={2}>
                      <Form.Label>
                        Update 
                      </Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control type="text" value={this.state.updateBalance} onChange={this.onUpdateBalance.bind(this)}/> 
                  </Col>
              </Row>
              <Row>
                  <Col sm={2}>
                      <Form.Label>
                        Info 
                      </Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control type="text" value={this.state.info} onChange={this.onUpdateInfo.bind(this)}/> 
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm={4}></Col>
                  <Col sm={2}>
                      <Button type="submit" variant="outline-info" onClick={this.handleAddBalance.bind(this)}>
                        Add
                      </Button>
                  </Col>
                  <Col sm={2}>
                      <Button type="submit" variant="outline-info"onClick={this.handleSubstractBalance.bind(this)}>
                        Subtract  
                      </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Col>
              </Row>
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
                      <th>info</th>
                      <th>Update</th>
                    </tr>
                    {this.state.balanceHistory.balances == null? "" : this.state.balanceHistory.balances.map((result) => (
                    <tr key={result._id}>
                      <td>{moment(result.date).format('ll')}</td>
                      <td>{result.info}</td>
                      <td>$ {result.balanceAccount}</td>
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
