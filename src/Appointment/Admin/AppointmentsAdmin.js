import React from 'react';
import { Form, Button } from 'react-bootstrap';
import searchIcon from '../../resources/searchIcon.png';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Link } from 'react-router-dom';

class AppointmentsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Admin', title: 'View All Appointments' },
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
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Appointments</h2>
            <div className="contents">
              <Form inline>
                <Form.Control as="select">
                  <option value="1">All</option>
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
                      <td>{result.schedule == null ? '' : result.schedule.date.date}</td>
                      <td>{result.schedule == null ? '' : result.schedule.time.time}</td>
                      <td>{result.service.name}</td>
                      <td>${result.service.price}</td>
                      <td>
                        <Link to={`/Appointment/Admin/Appointment/${result._id}`}>
                          <Button variant="outline-secondary">
                            details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                    ))}
               </table>
                  <br />
                  <span style={pagination}>
                    {'<'} 1 2 3 4 5 {'>'}
                  </span>
            </div>
            <br/><br/>
          </div>
        </div>  
          )
  }      
}

export default AppointmentsAdmin;
