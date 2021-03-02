import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import searchIcon from '../../resources/searchIcon.png';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import styles from '../../app.module.css';
import { Link } from 'react-router-dom';

class AppointmentsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Admin/Appointment', title: 'View All Appointments' },
        { url: '/Appointment/Admin/Create', title: 'Create Appointment' },
      ],
      appointments: [],
    };
  }

  getAppointments() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/appointments`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  };

  componentDidMount() {
    document.title = 'All Appointments | Body Contouring Clinic';
    this.getAppointments()
    .then((data) => {
      this.setState({
        appointments: data,
      });
  });
  }

  render() {
    const pagination = {
      color: '#B58970',
    };
    return (
      <>
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-6">
            <h2 className={styles.appointmentTitle}>Appointments</h2>
            <Container>
              <Row>
                <Col></Col>
                <Col xs={10}>
                  <Form inline>
                    <Form.Control as="select">
                      <option value="30">Today</option>
                      <option value="60">Tomorrow</option>
                      <option value="90">This Week</option>
                      <option value="120">This Month</option>
                    </Form.Control>
                    <Form.Control type="date" style={{ 'margin-left': '30px' }} />
                    <Form.Control as="select" style={{ 'margin-left': '30px' }}>
                      <option>Customer</option>
                      <option>Info</option>
                    </Form.Control>
                    <Form.Control
                      type="text"
                      placeholder="Search.."
                      style={{ 'margin-left': '30px' }}
                    ></Form.Control>
                    <Button
                      type="submit"
                      variant="outline-*"
                      style={{ background: 'none', 'margin-left': '5px' }}
                    >
                      <img src={searchIcon} alt="Search" />
                    </Button>
                  </Form>
                  <table>
                    <tr>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Info</th>
                      <th>Price</th>
                    </tr>
                    {this.state.appointments.map((result)=>(
                      // eslint-disable-next-line react/jsx-key
                      <tr>
                      <td>{result.customer.account.firstName} {result.customer.account.lastName}</td>
                      <td>{result.schedule.date.date}</td>
                      <td>{result.schedule.times.map((period)=>(period.time))} </td>
                      <td>{result.service.serviceName}</td>
                      <td>$99</td>
                      <td>
                        <Link to={`/Appointment/Admin/Appointment/${result._id}`}>
                          <Button variant="outline-secondary">
                            details
                          </Button>
                        </Link>
                        {/* <a href={`/Appointment/Admin/Appointment/${result._id}`}>details</a> */}
                      </td>
                    </tr>
                    ))}
                  </table>
                  <br />
                  <span style={pagination}>
                    {'<'} 1 2 3 4 5 {'>'}
                  </span>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default AppointmentsAdmin;
