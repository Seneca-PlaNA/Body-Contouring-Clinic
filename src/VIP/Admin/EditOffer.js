import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class EditOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      items: [
        { url: '/VIP/Admin', title: 'Special Offer' },
        { url: '/VIP/Admin/Manage', title: 'Offer Manage' },
      ],
      children: 'Offer',
      offer: {},
      completed : false,
    };
  }

  handlSubmit(event) {
    event.preventDefault();
    console.log(this.state.offer);
    fetch(`http://localhost:3001/offer/${this.props.id}`,{
      method: "PUT",
      body: JSON.stringify(this.state.offer),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onNameChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
        offerName: event.target.value,
      }
    }));
    console.log(this.state.offer);
  }

  onDescriptionChange(event) {
    this.setState(() => ({
      offer: {
       ...this.state.offer,
        description: event.target.value,
      }
    }));
  }

  onStartDateChange(event) {
    this.setState(() => ({
      offer:{
        ...this.state.offer,
        startDate: event.target.value,
      }
    }));
  }

  onEndDateChange(event) {
    this.setState(() => ({
      offer:{
        ...this.state.offer,
        endDate: event.target.value,
      }
    }));
  }

  componentDidMount() {
    fetch(`http://localhost:3001/offer/${this.props.id}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          offer: data,
        });
    });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: '/VIP/Admin/Manage'
      }}/>
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Edit Offer</h2>
          <br />
          <Container>
            <Form onSubmit={this.handlSubmit.bind(this)} method="PUT">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Offer Title" value={this.state.offer.offerName} onChange={this.onNameChange.bind(this)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="textarea" rows={3} value={this.state.offer.description} onChange={this.onDescriptionChange.bind(this)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} inline>
                <Form.Label column sm={2}>
                  Active Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control controlId="startDate" type="date" placeholder="start date" value={this.state.offer.startDate} onChange={this.onStartDateChange.bind(this)} />
                </Col>
                <Col sm={3}>
                  <Form.Control controlId="endDate" type="date" placeholder="end date" value={this.state.offer.endDate} onChange={this.onEndDateChange.bind(this)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Attach File:
                </Form.Label>
                <Form.File />
              </Form.Group>
              <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/VIP/Admin/Manage">
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={1}>
                    <Button type="submit" variant="outline-info">
                      Save
                    </Button>
                  </Col>
                </Row>
                <br />
              </Container>
              <br />
              <br />
            </Form>
          </Container>
          <br />
        </div>
      </div>
    );
  }
}

EditOffer.propTypes = {
  id : PropTypes.string.isRequired
}

export default EditOffer;
