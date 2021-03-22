import React from 'react';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';
import moment from 'moment';

class CustomerBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     items: [
      { url: '/Customer', title: 'Home' },
      { url: `/Customer/Profile`, title: 'Profile' },
      { url: `/Customer/Balance/${localStorage.getItem('_id')}`, title: 'Balance' },
    ], 
      _id: localStorage.getItem('_id'),
      balances: [],
      balanceHistory: [],
      profile: {},
      balanceHistoryId: [],
    };
    this.getCustomerProfile = this.getCustomerProfile.bind(this);
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
      console.log(id);
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
        balanceHistoryId : data.balanceHistory
      })

      this.getBalance(this.state.balanceHistoryId._id)
      .then((data)=>{
        this.setState({
          balanceHistory: data,
          // balances: data.balances,
        });
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
                  <Col sm={4}>          
                    <Form.Label>
                      Current Balance: $ {this.state.balanceHistory == null? 0 :this.state.balanceHistory.currentBalance}
                    </Form.Label>
                  </Col>
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

export default CustomerBalance;
