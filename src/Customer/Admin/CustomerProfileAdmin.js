/* eslint react/prop-types: 0 */
import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CustomerProfileAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      account: [],
      accountLevel: [],
      items: [{ url: `/Customer/Admin`, title: 'Customer Management' },
      { url: `/Staff/Admin`, title: 'Staff Management' },
      ],
      accountLevels: [],
    };
  }

  onAccountLevelChange(event){
    console.log(this.state.accountLevel);
    console.log("id: "+event.target.value);
    this.setState(() => ({
      account:{
        ...this.state.account,
        accountLevelId: event.target.value,
      },
      accountLevel: event.target.value,
    }));

  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/account/${this.props.id}`,{
      method: "PUT",
      body: JSON.stringify(this.state.account),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
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
  getAccountLevels(){
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account-levels`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  componentDidMount() {
    this.getCustomerProfile(this.props.id).then((data) => {
      this.setState({
        account: data,
        accountLevel: data.accountLevelId,
      });
    });

    this.getAccountLevels()
    .then((data)=>{
      this.setState({
        accountLevels: data,
      });
    });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: `/Customer/Admin`
      }}/>
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-6" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Customer : {this.state.account.firstName} {this.state.account.lastName}</h2>
          <hr />
          <br />
          <Container class="col-md-6">
            <Form style={{ fontSize: '20px', marginLeft: '80px', textAlign: 'left' }} onSubmit={this.handleSubmit.bind(this)}>
              <Form.Group as={Row}>
                <Form.Label column md={3}>
                  Name:
                </Form.Label>
                <Col sm={5}>
                  <Form.Label column md={0}>
                    {this.state.account.firstName} {this.state.account.lastName}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Email:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    {this.state.account.email}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Address:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    {this.state.account.address}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Current Balance:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    User.Balance
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Customer level:
                </Form.Label>
                <Col sm={3}>
                  <Form.Control as="select" controlId="accountLevelId" value={this.state.accountLevel == null ? '':this.state.accountLevel._id} onChange={this.onAccountLevelChange.bind(this)}>
                    {this.state.accountLevels.map((level)=>(
                      level.name !="Staff"?<option key={level._id} value={level._id}>{level.name}</option>:""
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Row>
              <Col>
                <Button variant="outline-info" href="/Appointment/Appointments">
                  View Appointment
                </Button>
                &nbsp;
                <Button variant="outline-info" href="/Request/">
                  View Request
                </Button>
                &nbsp;
                <Button variant="outline-info" href="/Customer/Admin/Account">
                  View Account
                </Button>
                &nbsp;
                <Button action type="submit" variant="outline-info">
                  Edit
                </Button>
              </Col>
            </Row>
            </Form>
          </Container>
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerProfileAdmin;
