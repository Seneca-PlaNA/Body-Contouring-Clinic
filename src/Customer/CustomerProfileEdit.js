/* eslint react/prop-types: 0 */
import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CustomerProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      completed: false,
      items: [
        { url: '/Customer', title: 'Home' },
        { url: `/Customer/Profile`, title: 'Profile' },
        { url: `/Customer/Balance/${localStorage.getItem('_id')}`, title: 'Balance' },
      ],
      tempPwd: '',
      pwdConfirmed: false,
      _id: localStorage.getItem('_id'),
      editProfile:{}
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    
    fetch(`${process.env.REACT_APP_API_URL}/account/${this.state._id}`, {
      method: 'PUT',
      body: JSON.stringify(this.state.editProfile),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  }

  onFirstNameChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        firstName: event.target.value,
      },
      editProfile:{
        ...this.state.editProfile,
        firstName: event.target.value,
      }
    }));
  }

  onLastNameChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        lastName: event.target.value,
      },
      editProfile:{
        ...this.state.editProfile,
        lastName: event.target.value,
      }
    }));
  }

  onEmailChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        email: event.target.value,
      },
      editProfile:{
        ...this.state.editProfile,
        email: event.target.value,
      }
    }));
  }

  onAddressChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        address: event.target.value,
      },
      editProfile:{
        ...this.state.editProfile,
        address: event.target.value,
      }
    }));
  }

  onPasswordChange(event) {
    this.setState(() => ({
      tempPwd: event.target.value,
    }));
    console.log(this.state.tempPwd);
  }

  onConfirmPasswordChange(event) {
    this.setState(() => ({
      pwdConfirmed: false,
    }));

    if(this.state.tempPwd == event.target.value)
    {
      this.setState(() => ({
        profile: {
          ...this.state.profile,
          password: event.target.value,
        },
        editProfile:{
          ...this.state.editProfile,
          password: event.target.value,
        }
      }));
    }
    else{
      this.setState(() => ({
        pwdConfirmed: true,
      }));
    }
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/account/${this.state._id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          profile: data,
        });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <Container>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <h2 className="PageTitle">Edit Profile</h2>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  First Name:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={this.state.profile.firstName} onChange={this.onFirstNameChange.bind(this)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Last Name:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    value={this.state.profile.lastName}
                    onChange={this.onLastNameChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Password:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="password" onChange={this.onPasswordChange.bind(this)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Confirm Password:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="password" onChange={this.onConfirmPasswordChange.bind(this)} isInvalid={this.state.pwdConfirmed}/>
                  <Form.Control.Feedback type='invalid' > 
                    PASSWORD NOT MATCHED
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Email Address:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="email"
                    value={this.state.profile.email}
                    onChange={this.onEmailChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Address:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    value={this.state.profile.address}
                    onChange={this.onAddressChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col xs={1}></Col>
                <Col>
                  <Link to={`/Customer/Profile`}>
                    <Button variant="outline-info">Cancel</Button>
                  </Link>
                  &nbsp;
                  <Button type="submit" variant="outline-info">
                    Save
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Container>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerProfileEdit;
