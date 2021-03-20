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
        { url: `/Customer/Balance/${this.props.id}}`, title: 'Balance' },
      ],
      _id: localStorage.getItem('_id'),
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/account/${this.state._id}`, {
      method: 'PUT',
      body: JSON.stringify(this.state.profile),
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

  onAddressChange(event) {
    this.setState(() => ({
      profile: {
        ...this.state.profile,
        address: event.target.value,
      },
    }));
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
                    value={this.state.profile.address}
                    onChange={this.onAddressChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col xs={1}></Col>
                <Col>
                  <Link to={`/Customer/${this.props.id}`}>
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
