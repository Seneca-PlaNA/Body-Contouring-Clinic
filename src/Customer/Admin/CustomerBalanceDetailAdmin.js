import React from 'react';
import { Container, Row, Col, Form, Table, Button, Pagination } from 'react-bootstrap';
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
      },
      currentPage: 1,
      perPage: 8,
    };
    this.handleAddBalance = this.handleAddBalance.bind(this);
  }

  prevPage() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: parseInt(this.state.currentPage) - 1,
      });
    }
  }

  nextPage() {
    if (
      this.state.currentPage < Math.ceil(this.state.filterData.length / this.state.perPage)
    ) {
      this.setState({
        currentPage: parseInt(this.state.currentPage) + 1,
      });
    }
  }
  
  handlePage(e) {
    this.setState({
      currentPage: Number(e.target.id),
    });
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
    .then(() => {
      window.location.reload();
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
    .then(() => {
      window.location.reload();
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
          balances: data.balances,
        });
      });
  }
  
  render() {
    const indexOfLast = this.state.currentPage * this.state.perPage;
    const indexOfFirst = indexOfLast - this.state.perPage;
    const currentItems = this.state.balances.slice(indexOfFirst, indexOfLast);

    const pageNums = [];
    for (let i = 1; i <= Math.ceil(this.state.balances.length / this.state.perPage); i++) {
      pageNums.push(
        <Pagination.Item key={i} id={i} onClick={this.handlePage.bind(this)}>
          {i}
        </Pagination.Item>
      );
    }
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
                    {currentItems == null? "" : currentItems.map((result) => (
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
            </Table>
            <br/>
          <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination.Prev onClick={this.prevPage.bind(this)} />
                    <Pagination>{pageNums}</Pagination>
                    <Pagination.Next onClick={this.nextPage.bind(this)} />
          </Pagination>
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
