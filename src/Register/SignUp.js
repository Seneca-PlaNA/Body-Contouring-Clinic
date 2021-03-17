import React, { Component } from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        userID: String,
        password: String,
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        address: String,
        accountLevelId: '60371ad3fda1af6510e75e3a',
        balanceHistory: String,
      },
      // balance: {},
      completed: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // axios.post('http://localhost:3001/create-balance-history', this.state.balance).then((res) => {
    //   console.log(res.data._id);
    //   console.log(res.data);
    //   this.setState({
    //     account: {
    //       balanceHistory: res.data._id,
    //     },
    //   });
    // });

    // fetch('http://localhost:3001/create-balance-history', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state.balance),
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.json);
    //   })
    //   .catch((err) => console.log(err));

    axios
      .post('http://localhost:3001/create-account', this.state.account)
      .then(() => this.setState({ completed: true }))
      .catch((err) => console.log(err));
  }

  onUserIdChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        userID: event.target.value,
      },
    }));
  }

  onPasswordChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        password: event.target.value,
      },
    }));
  }

  onFirstNameChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        firstName: event.target.value,
      },
    }));
  }

  onLastNameChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        lastName: event.target.value,
      },
    }));
  }

  onNumberChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        phone: event.target.value,
      },
    }));
  }

  onEmailChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        email: event.target.value,
      },
    }));
  }

  onAddressChange(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        address: event.target.value,
      },
    }));
  }

  onCreateBalanceHistory(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        balanceHistory: event.target.value,
      },
    }));
  }

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: '/Register/SignupSuccess',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-8" style={{ 'margin-left': '340px' }}>
          <h2 className="PageTitle" style={{ 'margin-left': '390px' }}>
            Sign-up Form
          </h2>
          <br />
          <Container style={{ 'margin-left': '190px' }}>
            <Form onSubmit={this.handleSubmit.bind(this)} method="POST">
              <Form.Group as={Row} controlId="userID">
                <Form.Label column sm={2}>
                  User ID:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="id"
                    placeholder="Enter user ID"
                    onChange={this.onUserIdChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label column sm={2}>
                  Password:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={this.onPasswordChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Confirm Password:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter the Password"
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="firstName">
                <Form.Label column sm={2}>
                  First Name:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter First name"
                    onChange={this.onFirstNameChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="lastName">
                <Form.Label column sm={2}>
                  Last Name:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter Last name"
                    onChange={this.onLastNameChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="phone">
                <Form.Label column sm={2}>
                  Phone Number:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="000-000-0000"
                    onChange={this.onNumberChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm={2}>
                  Email address:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter E-mail address"
                    onChange={this.onEmailChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="address">
                <Form.Label column sm={2}>
                  Address:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    onChange={this.onAddressChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group style={{ marginLeft: '350px' }} as={Row}>
                <Row>
                  <Col>
                    <Button variant="outline-secondary" href="/VIP/Admin/Manage">
                      Cancel
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Button variant="outline-info" type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Container>

          <span style={{ marginLeft: '180px' }}>
            Already registered?
            <a href="./Login"> sign in</a>
          </span>
          <br></br>
          <br></br>
          <div style={{ marginLeft: '10px' }}>
            <div className="pagination" style={{ marginRight: '130px' }}>
              <a className="page-link btn btn-outline-info" href="./TermsAndConditions">
                ❮ Previous
              </a>
              <a style={{ marginLeft: '720px' }}></a>
              <a
                className="page-link btn btn-outline-info"
                color="btn-outline-info"
                href="./CheckConfirmEmail"
              >
                Next ❯
              </a>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default SignUp;
