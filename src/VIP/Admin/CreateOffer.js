import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      items: [
        { url: '/VIP/Admin', title: 'Special Offer' },
        { url: '/VIP/Admin/Manage', title: 'Offer Manage' },
      ],
      // create offer data
      offer: {
        name: String,
        services: [],
        startDate: Date,
        endDate: Date,
        description: String,
        imageURL: String,
      },
      completed: false,
    };
  }

  handlSubmit(event) {
    event.preventDefault();

<<<<<<< HEAD
    fetch(`${process.env.REACT_APP_API_URL}/add-offer`,{
      method: "POST",
=======
    fetch('http://localhost:3001/create-offer', {
      method: 'POST',
>>>>>>> 250aaa4c056534a24e40953ca610dc78535f66e8
      body: JSON.stringify(this.state.offer),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => this.setState({ completed: true }))
      .catch((err) => console.log(err));
  }

  onNameChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
<<<<<<< HEAD
        name: event.target.value
      }
=======
        offerName: event.target.value,
      },
>>>>>>> 250aaa4c056534a24e40953ca610dc78535f66e8
    }));
  }

  onDescriptionChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
        description: event.target.value,
      },
    }));
  }

  onStartDateChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
        startDate: event.target.value,
      },
    }));
  }

  onEndDateChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
        endDate: event.target.value,
      },
    }));
  }

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: '/VIP/Admin/Manage',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Create New Offer</h2>
          <br />
          <Container>
<<<<<<< HEAD
            <Form onSubmit={this.handlSubmit.bind(this)} method="POST"> 
              <Form.Group as={Row} controlId="name">
=======
            <Form onSubmit={this.handlSubmit.bind(this)} method="POST">
              <Form.Group as={Row} controlId="offerName">
>>>>>>> 250aaa4c056534a24e40953ca610dc78535f66e8
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    placeholder="Offer Title"
                    onChange={this.onNameChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="description">
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.onDescriptionChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} inline>
                <Form.Label column sm={2}>
                  Active Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    controlId="startDate"
                    type="date"
                    placeholder="start date"
                    onChange={this.onStartDateChange.bind(this)}
                  />
                </Col>
                <Col sm={3}>
                  <Form.Control
                    controlId="endDate"
                    type="date"
                    placeholder="end date"
                    onChange={this.onEndDateChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Attach File:
                </Form.Label>
                <Form.File />
              </Form.Group>
              <br />
              <br />
              <Form.Group as={Row}>
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
          <br />
        </div>
      </div>
    );
  }
}

export default CreateOffer;
