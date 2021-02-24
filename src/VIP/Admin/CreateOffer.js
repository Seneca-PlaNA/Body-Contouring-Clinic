import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

class CreateOffer extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/VIP/Admin', title: 'Special Offer' },
        { url: '/VIP/Admin/Manage', title: 'Offer Manage' },
      ],
      offerName: String,
      services: [],
      startDate: Date,
      endDate: Date,
      description: String,
      imageURL: String,
    };
  }

  handlSubmit(event) {
    event.preventDefault();
    console.log(this.state.offer);
    fetch('http://localhost:3001/add-offer',{
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .catch((err) => (console.log(err)));

  }

  onNameChange(event) {
    this.setState({
      offerName: event.target.value
    });
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value,
      startDate: "2020-01-30T00:00:00.000Z",
      endDate: "2021-04-12T00:00:00.000Z",
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Create New Offer</h2>
          <br />
          <Container>
            <Form onSubmit={this.handlSubmit.bind(this)} method="POST"> 
              <Form.Group as={Row} controlId="offerName">
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Offer Title" onChange={this.onNameChange.bind(this)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="description">
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="textarea" rows={3} onChange={this.onDescriptionChange.bind(this)}/>
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
