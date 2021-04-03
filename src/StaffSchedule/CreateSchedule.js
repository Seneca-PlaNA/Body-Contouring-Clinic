import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import moment from 'moment';

class CreateSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Staff/Schedules/Calendar', title: 'Schedule Calendar' },
        { url: '/Staff/Schedule/Create', title: 'Create Schedule' },
        { url: '/Staff/Schedules', title: 'View Schedule List' },
      ],
      _id: localStorage.getItem('_id'),
      workSchedule: {
        staff: {}, // temporary till the login auth
        date: String,
        time: String,
        description: String,
      },
      dates: [],
      times: [],
      completed: false,
      dateIsSelected: true,
      timeIsSelected: true,
      errors: [],
      form: [],
      date: '',
      time: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findErrors() {
    const errList = {};
    if (!this.state.date || this.state.date === '') {
      errList.date = 'Date is required';
      this.setState(() => ({ dateIsSelected: false }));
    }
    if (!this.state.time || this.state.time === '') {
      errList.time = 'Time is required';
      this.setState(() => ({ timeIsSelected: false }));
    }
    return errList;
  }

  handleSubmit(e) {
    console.log(this.state.dateIsSelected);
    e.preventDefault();
    const errList = this.findErrors();
    if (Object.keys(errList).length > 0) {
      this.setState(() => ({
        errors: errList,
      }));
    }
    fetch(`${process.env.REACT_APP_API_URL}/create-workSchedule`, {
      method: 'POST',
      body: JSON.stringify(this.state.workSchedule),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => this.setState({ completed: true }))
      .catch((err) => console.log(err));
  }

  onDateChange(e) {
    console.log(e.target.value);
    if (e.target.value.length < 6) {
      console.log('hey');
      this.setState(() => ({
        workSchedule: {
          ...this.state.workSchedule,
          date: e.target.value,
        },
        dateIsSelected: false,
        date: e.target.value,
      }));
    } else {
      console.log('valid');
      this.setState(() => ({
        workSchedule: {
          ...this.state.workSchedule,
          date: e.target.value,
        },
        dateIsSelected: true,
        date: e.target.value,
      }));
    }
    console.log(this.state.date);
  }

  onTimeChange(e) {
    if (e.target.value.length < 6) {
      this.setState(() => ({
        workSchedule: {
          ...this.state.workSchedule,
          staff: this.state.staff._id,
          time: e.target.value,
        },
        timeIsSelected: false,
        time: e.target.value,
      }));
    } else {
      this.setState(() => ({
        workSchedule: {
          ...this.state.workSchedule,
          staff: this.state.staff._id,
          time: e.target.value,
        },
        timeIsSelected: true,
        time: e.target.value,
      }));
    }
  }

  onDescriptionChange(e) {
    this.setState(() => ({
      workSchedule: {
        ...this.state.workSchedule,
        description: e.target.value,
      },
    }));
  }

  getDates() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/dates`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  getTimes() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/times`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/staff?account=${this.state._id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          staff: data,
        });
      });
    this.getDates().then((data) => {
      this.setState({
        dates: data.filter((d) => {
          return moment(d.date).isAfter();
        }),
      });
    });
    this.getTimes().then((data) => {
      this.setState({
        times: data,
      });
    });
  }
  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: '/Staff/Schedules',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Create New Schedule</h2>
          <br />
          <Container>
            <Form noValidate onSubmit={this.handleSubmit.bind(this)} method="POST">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Date:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="select"
                    onChange={this.onDateChange.bind(this)}
                    isInvalid={!this.state.dateIsSelected}
                  >
                    <option value="">--Choose--</option>
                    {this.state.dates.map((date) => (
                      <option key={date._id} value={date._id}>
                        {moment(date.date).format('ll')}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{this.state.errors.date}</Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Time:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="select"
                    onChange={this.onTimeChange.bind(this)}
                    isInvalid={!this.state.timeIsSelected}
                  >
                    <option value="">--Choose--</option>
                    {this.state.times.map((time) => (
                      <option key={time._id} value={time._id}>
                        {time.time}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{this.state.errors.time}</Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Description:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.onDescriptionChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <br />
              <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/Staff/Schedules">
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={1}>
                    <Button variant="outline-info" type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <br />
            <br />
          </Container>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CreateSchedule;
