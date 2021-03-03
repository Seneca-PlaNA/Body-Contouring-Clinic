import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../App.css';
import styles from '../../app.module.css';
import SideBar from '../../SideBar/SideBar';
import PopUp from '../../PopUp';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class AppointmentAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Admin/Appointments', title: 'View All Appointments' },
        { url: '/Appointment/Admin/Create', title: 'New Appointment' },
      ],
      show: false,
      children: 'appointment',
      deletedLink: '/Appointment/Admin/Deleted',
      appointment: [],
      customer: [],
      schedule: [],
      times: [],
      date: [],
      service: [],
      staff: [],
      completed: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  deleteAppointment = () => {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  };

  handleDelete = () => {
    this.deleteAppointment()
      .then((response) => (response.json()))
      .then(()=> this.setState({
        show: false,
      }))
      .catch((err) => (console.log(err)));
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          appointment: data,
          customer: data.customer.account,
          schedule: data.schedule,
          times: data.schedule.times[0],
          date: data.schedule.date,
          staff: data.schedule.staff.account,
          service: data.service
        });
    });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: '/Appointment/Admin'
      }}/>
    }
    return (
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Appointment Details</h2>
            <Container>
              <Row>
                <Col>
                  <table className={styles.appointmentTable}>
                    <tr>
                      <td>Customer Name: </td>
                      <td>{this.state.customer.firstName} {this.state.customer.lastName}</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{this.state.date.date}</td>
                    </tr>
                    <tr>
                      <td>Time:</td>
                      <td>{this.state.times.time}</td>
                    </tr>
                    <tr>
                      <td>Technician:</td>
                      <td>{this.state.staff.firstName} {this.state.staff.lastName}</td>
                    </tr>
                    <tr>
                      <td>Service:</td>
                      <td>{this.state.service.name}</td>
                    </tr>
                    <tr>
                      <td>Contact #:</td>
                      <td>{this.state.appointment.contactNumber}</td>
                    </tr>
                    <tr>
                      <td>Special Request:</td>
                      <td>{this.state.appointment.specialRequest}</td>
                    </tr>
                  </table>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <Button variant="outline-info" href="/Appointment/Admin/Message">
                    Leave Message
                  </Button>{' '}
                  <Button variant="outline-danger" onClick={this.showModal}>
                    Delete
                  </Button>{' '}
                  <Link to={`/Appointment/Admin/Edit/${this.props.id}`}>
                      <Button variant="outline-secondary">
                        Edit
                      </Button>
                  </Link>
                </Col>
                <PopUp
                  show={this.state.show}
                  link={this.state.deletedLink}
                  handleClose={this.hideModal}
                  handleDelete={this.handleDelete}
                  text={this.state.children}
                  btn1="Cancel"
                  btn2="Delete"
                />
              </Row>
            </Container>
          </div>
        </div>
    );
  }
}

AppointmentAdmin.propTypes = {
  id : PropTypes.string.isRequired
}

export default AppointmentAdmin;
