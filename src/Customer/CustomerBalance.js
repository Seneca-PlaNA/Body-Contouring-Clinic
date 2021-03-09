import React from 'react';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';

class CustomerBalance extends React.Component {
  state = {
    items: [
      { url: '/Customer/', title: 'Home' },
      { url: `/Customer/${this.props.id}`, title: 'Profile' },
      { url: `/Customer/Edit/${this.props.id}`, title: 'Edit Profile' },
      { url: `/Customer/Balance${this.props.id}`, title: 'Balance' },
    ],
  };
  constructor(prop) {
    super(prop);
  }

  render() {
    const pagination = {
      color: '#B58970',
      textAlign: 'center',
      marginLeft: '50px',
    };
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-6" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Hi, User.fullName</h2>
          <hr />
          <br />
          <h4>Balance Information</h4>
          <Container class="col-md-6">
            <Form style={{ fontSize: '20px', marginLeft: '80px', textAlign: 'left' }}>
              <Form.Group as={Row}>
                <Form.Label column md={3}>
                  Current Balance:
                </Form.Label>
                <Col sm={2}>
                  <Form.Label column md={0}>
                    $199
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label column md={3}>
                    Level:
                  </Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Label column md={0}>
                    VIP
                  </Form.Label>
                </Col>
              </Form.Group>
            </Form>
          </Container>
          <br />
          <h4>Balance History</h4>
          <Container class="col-md-6">
            <Table>
              <Row>
                <Col md={12}>
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>Therapy Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                    <tr>
                      <td>2021-01-14</td>
                      <td>Body Clinic</td>
                      <td>Laser skin clean therapy</td>
                      <td>$100</td>
                      <td>
                        <a href="/Customer/BalanceDetail">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>2021-01-21</td>
                      <td>Face Clinic</td>
                      <td>Remove Black head</td>
                      <td>$50</td>
                      <td>
                        <a href="/Customer/BalanceDetail">details</a>
                      </td>
                    </tr>
                  </table>
                  <br />
                </Col>
              </Row>
              <span style={pagination}>
                <a href="#"> &laquo; </a>
                <a href="#"> 1 </a>
                <a className="active" href="#">
                  {' '}
                  2{' '}
                </a>
                <a href="#"> 3 </a>
                <a href="#"> 4 </a>
                <a href="#"> 5 </a>
                <a href="#"> 6 </a>
                <a href="#"> &raquo; </a>
              </span>
            </Table>
          </Container>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerBalance;
