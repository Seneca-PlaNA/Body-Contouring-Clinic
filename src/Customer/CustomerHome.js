import React from 'react';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { Table } from 'react-bootstrap';

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      items: [
        { url: '/Customer/', title: 'Home' },
        { url: `/Customer/${localStorage.getItem('_id')}`, title: 'Profile' },
        { url: `/Customer/Edit/${localStorage.getItem('_id')}`, title: 'Edit Profile' },
        { url: `/Customer/Balance/${localStorage.getItem('_id')}`, title: 'Balance' },
      ],
      _id: localStorage.getItem('_id'),
    };
  }

  getCustomerProfile(id) {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  componentDidMount() {
    this.getCustomerProfile(this.state._id).then((data) => {
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
        <div className="col-md-6" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">
            Hi, {this.state.profile.firstName} {this.state.profile.lastName}{' '}
          </h2>
          <hr />
          <br />
          <h4>Appointment of Clinic</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Therapy Name</th>
                <th>Staff Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Body Clinic</td>
                <td>Mintae Kim</td>
                <td>2021/1/1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Face Clinic</td>
                <td>Mintae Kim</td>
                <td>2021/1/1</td>
              </tr>
            </tbody>
          </Table>
          <a href="/Appointment/">Go to appointment</a>
          <hr />

          <h4>History of Request</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Change the appointment</td>
                <td>Progress</td>
                <td>2021-1-1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Change my plan</td>
                <td>Solved</td>
                <td>2021-1-1</td>
              </tr>
            </tbody>
          </Table>
          <a href="/Request/">Go to request</a>
          <hr />

          <h4>History of balance</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Price</th>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>$200</td>
                <td>Harry Potter</td>
                <td>2021-1-1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>$110</td>
                <td>Harry Potter</td>
                <td>2021-1-1</td>
              </tr>
            </tbody>
          </Table>
          <a href="/Customer/Balance">Go to balance</a>
          <hr />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerHome;
