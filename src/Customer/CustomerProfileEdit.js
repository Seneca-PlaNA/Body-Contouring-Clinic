/* eslint react/prop-types: 0 */
import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class CustomerProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      completed: false,
      items: [
        { url: '/Customer/', title: 'Home' },
        { url: `/Customer/${this.props.id}`, title: 'Profile' },
        { url: `/Customer/Edit/${this.props.id}`, title: 'Edit Profile' },
        { url: '/Customer/Balance', title: 'Balance' },
      ],
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/account/${this.props.id}`, {
      method: 'PUT',
      body: JSON.stringify(this.state.profile),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => this.setState({ completed: true }))
      .catch((err) => console.log(err));
  }

  onFirstNameChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        firstName: event.target.value,
      },
    }));
  }

  onLastNameChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        lastName: event.target.value,
      },
    }));
  }

  onEmailChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        email: event.target.value,
      },
    }));
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/account/${this.props.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          profile: data,
        });
      });
  }

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: `/Customer/${this.props.id}`,
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <Container>
            <Form onSubmit={this.handleSubmit.bind(this)} method="PUT">
              <h2 className="PageTitle">Edit Profile</h2>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  First Name:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    value={this.state.profile.firstName}
                    onChange={this.onFirstNameChange.bind(this)}
                  ></Form.Control>
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
                  <Form.Control type="password"></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Confirm Password:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="password"></Form.Control>
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
                    placeholder="Finch Ave, North York, ON. 1A1 2A2"
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Memo:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="textarea" rows={3} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col xs={1}></Col>
                <Col>
                  <Button variant="outline-info" href="/Customer/">
                    Cancel
                  </Button>
                  &nbsp;
                  <Button variant="outline-info" href="/Customer/">
                    Back To Home
                  </Button>
                  &nbsp;
                  <Button type="submit" variant="outline-info">
                    Edit
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
