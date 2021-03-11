/* eslint react/prop-types: 0 */
import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Container, Form, Row, Col } from 'react-bootstrap';

class CustomerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      items: [
        { url: '/Customer/', title: 'Home' },
        { url: `/Customer/${this.props.id}`, title: 'Profile' },
        { url: `/Customer/Edit/${this.props.id}`, title: 'Edit Profile' },
        { url: `/Customer/Balance/${this.props.id}`, title: 'Balance' },
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
          <h2 className="PageTitle">Profile</h2>
          <hr />
          <br />
          <Container class="col-md-12">
            <Form style={{ fontSize: '20px', marginLeft: '80px', textAlign: 'left' }}>
              <Form.Group as={Row}>
                <Form.Label column md={3}>
                  Name:
                </Form.Label>
                <Col sm={3}>
                  <Form.Label column md={0}>
                    {this.state.profile.firstName} {this.state.profile.lastName}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Email:
                </Form.Label>
                <Col sm={3}>
                  <Form.Label column md={0}>
                    {this.state.profile.email}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  User Id:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    {this.state.profile.userID}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Address:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    {this.state.profile.address}
                  </Form.Label>
                </Col>
              </Form.Group>
              {/* <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Current Balance:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    User.Balance
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Your level:
                </Form.Label>
                <Col sm={1}>
                  <Form.Label column md={0}>
                    User.level
                  </Form.Label>
                </Col>
              </Form.Group> */}
            </Form>
          </Container>
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerProfile;
