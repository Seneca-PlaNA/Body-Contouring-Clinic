import React from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import moment from 'moment';

class CreateAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveModal: false,
      savedBackLink: '/Appointment/Appointment',
      button: 'Back To Appointment',
      title: 'Appointment Saved!',

      completed: false,
      _id: localStorage.getItem('_id'),
      appointment: {
        customer: String,
        contactNumber: String,
        specialRequest: String,
        service: String,
        schedule: String,
        confirmation: 'false',
      },
      services: [],
      customer: {},
      filterData: [],
      technicians: [],
      dateData: [],
      uniqueDates: [],
      schedule: {
        booked: 'true',
      },
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
  };

  handlSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/create-appointment`, {
      method: 'POST',
      body: JSON.stringify(this.state.appointment),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => this.setState({ completed: true }))
      .catch((err) => console.log(err));
    fetch(`${process.env.REACT_APP_API_URL}/workSchedule/${this.state.appointment.schedule._id}`, {
      method: 'PUT',
      body: JSON.stringify(this.state.schedule),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  onServiceChange(event) {
    this.setState(() => ({
      appointment: {
        ...this.state.appointment,
        customer: this.state.customer._id,
        service: event.target.value,
      },
    }));
  }

  onContactNumChange(event) {
    this.setState(() => ({
      appointment: {
        ...this.state.appointment,
        contactNumber: event.target.value,
      },
    }));
  }

  onSpecialRequestChange(event) {
    this.setState(() => ({
      appointment: {
        ...this.state.appointment,
        specialRequest: event.target.value,
      },
    }));
  }

  onTechnicianChange(event) {
    fetch(`${process.env.REACT_APP_API_URL}/staffWorkSchedules?staff=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          filterData: data,
          uniqueDates: data
            .filter((d) => d.booked != true)
            .map((d) => d.date)
            .map(({ _id, date }) => ({ _id, date }))
            .filter((obj, pos, arr) => {
              return arr.map((mapObj) => mapObj._id).indexOf(obj._id) === pos;
            }),
        });
      });
  }

  onDateChange(event) {
    fetch(`${process.env.REACT_APP_API_URL}/workSchedule?date=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dateData: data.filter((s) => s.booked != true),
        });
      });
  }

  onTimeChange(event) {
    var finalWorkSchedule = {};
    this.state.dateData.forEach(function (data) {
      if (data.time._id == event.target.value) {
        finalWorkSchedule = data;
        console.log(data._id);
      }
    });
    this.setState({
      appointment: {
        ...this.state.appointment,
        schedule: finalWorkSchedule,
      },
    });
    // console.log(this.state)
  }

  onScheduleChange(event) {
    this.setState({
      appointment: {
        ...this.state.appointment,
        schedule: event.target.value,
      },
    });
  }

  getService() {
    fetch(`${process.env.REACT_APP_API_URL}/services`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          services: data,
        });
      });
  }

  getTechnicians() {
    fetch(`${process.env.REACT_APP_API_URL}/staffs`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          technicians: data,
        });
      });
  }

  componentDidMount() {
    document.title = 'Create New Appointment | Body Contouring Clinic';

    fetch(`${process.env.REACT_APP_API_URL}/customer?account=${this.state._id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          customer: data,
        });
        this.getService();
        this.getTechnicians();
      });
  }

  render() {
    console.log(this.state.uniqueDates);
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: `/Appointment/Appointments`,
          }}
        />
      );
    }
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <Form onSubmit={this.handlSubmit.bind(this)}>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Service(s):
                </Form.Label>
                <Col sm="8">
                  <Form.Control inline as="select" onChange={this.onServiceChange.bind(this)}>
                    <option>-- select service --</option>
                    {this.state.services.map((result) => (
                      // eslint-disable-next-line react/jsx-key
                      <option key={result._id} value={result._id}>
                        {result.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Technician:
                </Form.Label>
                <Col sm="8">
                  <Form.Control as="select" onChange={this.onTechnicianChange.bind(this)}>
                    <option value="">-- select technician --</option>
                    {this.state.technicians.map((result) => (
                      // eslint-disable-next-line react/jsx-key
                      <option value={result._id}>
                        {result.account.firstName} {result.account.lastName}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Date
                </Form.Label>
                <Col sm="8">
                  <Form.Control inline as="select" onChange={this.onDateChange.bind(this)}>
                    <option value="">-- select Date --</option>
                    {this.state.uniqueDates.map(
                      (result) =>
                        // eslint-disable-next-line react/jsx-key
                        moment(result.date).isAfter() && (
                          <option value={result.date}>{moment(result.date).format('ll')}</option>
                        )
                    )}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Time
                </Form.Label>
                <Col sm="8">
                  <Form.Control inline as="select" onChange={this.onTimeChange.bind(this)}>
                    <option value="">-- select time --</option>
                    {this.state.dateData.map((result) => (
                      // eslint-disable-next-line react/jsx-key
                      <option value={result.time._id}>{result.time.time}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Contact Number:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    placeholder="647-596-9521"
                    value={this.state.appointment.contactNumber}
                    onChange={this.onContactNumChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Special Request:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Vanilla essential oil"
                    value={this.state.appointment.specialRequest}
                    onChange={this.onSpecialRequestChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col></Col>
                <Col md="auto">
                  <Button variant="outline-secondary" href="/Appointment/">
                    Cancel
                  </Button>
                </Col>
                <Button action type="submit" variant="outline-info">
                  Save
                </Button>
              </Row>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default CreateAppointment;
