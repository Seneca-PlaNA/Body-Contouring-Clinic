import React from 'react';
import '../../App.css';
import searchIcon from '../../resources/searchIcon.png';
import SideBar from '../../SideBar/SideBar';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

class CustomerAccountAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [{ url: `/Customer/Admin/${this.props.id}`, title: 'Home' }],
      children: 'Customer',
      auth: 'Admin',
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">View All Account</h2>
          <br />
          <div className="contents">
            <Form inline>
              <Form.Control as="select">
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="120">Last 120 Days</option>
              </Form.Control>
              <Form.Control type="date" style={{ 'margin-left': '30px' }} />
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
            <br />
            <div className="ListAll">
              <table>
                <tr>
                  <th>ID</th>
                  <th>Service Name</th>
                  <th>Price</th>
                  <th>Deposit</th>
                  <th>Total balance</th>
                  <th>Date</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Body Clinic</td>
                  <td>-$100</td>
                  <td>+$300</td>
                  <td>$200</td>
                  <td>2021/01/11</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Face Clinic</td>
                  <td>-$90</td>
                  <td>0</td>
                  <td>$0</td>
                  <td>2021/01/01</td>
                </tr>
              </table>

              <br />
            </div>
            <Container>
              <Row>
                <Col xs={8}></Col>
                <Col>
                  <Button variant="outline-info" href="/Customer/Admin/Profile">
                    Back
                  </Button>
                  &nbsp;
                  <Button variant="outline-info" href="/Customer/Admin/Account/Edit">
                    Edit Account
                  </Button>
                </Col>
              </Row>
            </Container>
            <br />
            <br />
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerAccountAdmin;
