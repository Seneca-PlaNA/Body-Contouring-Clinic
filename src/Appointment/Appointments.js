import React from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Appointments', title: 'View All Appointments' },
        { url: `/Appointment/Create`, title: 'Create Appointment' },
      ],
      _id: localStorage.getItem('_id'),
      appointments: [],
      customer: {},
      account: {},
    };
  }

  getAppointment(custId){
    fetch(`${process.env.REACT_APP_API_URL}/appointment?customer=${custId}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        appointments: data
      });
    });
  }

  componentDidMount() {
    document.title = 'All Appointments | Body Contouring Clinic';

    fetch(`${process.env.REACT_APP_API_URL}/customer?account=${this.state._id}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        customer: data,
        account: data.account,
      });
      this.getAppointment(this.state.customer._id);
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
          <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Hello, {this.state.account.firstName} {this.state.account.lastName},
            <br/>These are all your upcoming appointments</h2>
            <div className="contents">
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Info</th>
                      <th>Price</th>
                    </tr>
                    {this.state.appointments.map((appointment)=>(
                      // eslint-disable-next-line react/jsx-key
                      <tr>
                        <td>{appointment.schedule == null ? '' : appointment.schedule.date.date}</td>
                        <td>{appointment.schedule == null ? '' : appointment.schedule.time.time}</td>
                        <td>{appointment.service.name}</td>
                        <td>${appointment.service.price}</td>
                        <td>
                          <Link to={`/Appointment/Appointment/${appointment._id}`}>
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
          </div>
        </div>
      </>
    );
  }
}


export default Appointments;
