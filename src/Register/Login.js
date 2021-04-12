import React, { Component } from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        userID: String,
        password: String,
      },
      loggedIn: false,
    };
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

  refreshPage = () => {
    window.location.reload();
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.account.userID.length > 5 && this.state.account.password.length > 3) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, this.state.account)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('_id', res.data._id); //temporary login method
          localStorage.setItem('isLogin', res.data.loginSuccess);
          if (res.data.loginSuccess) {
            this.setState({ loggedIn: true });
          }
        })
        .then(() => {
          this.refreshPage();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // this.localstorage.setItem('token',res.data.user);
    // var token = this.localstorage.getItem('token')
    // axios.post("ROUTE",data,{header:{}})
    // const login_info = {
    //   method: "POST",
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }

    //};
  }

  // componentDidMount() {
  //   let token = localStorage.getItem('token');
  //   console.log(token);
  //   if (token === null) {
  //     throw 'Not Login';
  //   }

  //   axios.post(
  //     'http://localhost:3001/login',
  //     {},
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  // }
  // handleChange(event) {
  //   let input = this.state.input;
  //   input[event.target.name] = event.target.value;

  //   this.setState({
  //     input,
  //   });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();

  //   if (this.validate()) {
  //     console.log(this.state);

  //     let input = {};
  //     input['id'] = '';
  //     input['password'] = '';

  //     this.setState({ input: input });

  //     alert('You are logged in!');
  //   }
  // }

  // validate() {
  //   let input = this.state.input;
  //   let errors = {};

  //   if (!input['id']) {
  //     //isValid = false;
  //     errors['id'] = 'Please enter your user id.';
  //   }

  //   if (!input['password']) {
  //     //isValid = false;
  //     errors['password'] = 'Please enter your password.';
  //   }
  // }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect
          push
          to={{
            pathname: '/',
          }}
          refresh="true"
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-8" style={{ 'margin-left': '420px' }}>
          <h2 className="PageTitle" style={{ 'margin-left': '380px' }}>
            Log In
          </h2>
          <br />
          <Container style={{ 'margin-left': '90px' }}>
            <Form onSubmit={this.handleSubmit.bind(this)} method="POST">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  ID:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    onChange={this.onUserIdChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Password:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onPasswordChange.bind(this)}
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
                      Log in
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Container>
          <div style={{ marginRight: '40px' }}>
            <div className="custom-control custom-checkbox" style={{ marginRight: '110px' }}>
              <span style={{ marginLeft: '145px' }}>
                No account?<a href="./TermsAndConditions"> Sign up </a>
              </span>
            </div>
          </div>
          <div className="col-md-4" style={{ marginLeft: '290px' }}>
            <p className="forgot-password text-right">
              <a href="./ForgotID">Forgot ID?</a> / <a href="./ForgotPassword">Forgot Password?</a>
            </p>
          </div>
          <br />
          <br /> <br />
          <br />
        </div>
        <br />
        <br />
      </div>
    );
  }
}
export default Login;
