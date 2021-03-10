import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

class CustomerAccountEditAdmin extends React.Component {
  state = {
    items: [{ url: '/Customer/Admin', title: 'Home' },
    { url: `/Customer/Admin/ManageBalance`, title: 'ManageBalance' },
],
  };
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Edit Account</h2>
          <br />
          <Container>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Service Name:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="email" placeholder="Skin Therapy"></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Service price:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text"></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Deposit
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text"></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Date:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="date" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Staff Name
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text"></Form.Control>
                </Col>
              </Form.Group>
              <Row>
                <Col xs={2}></Col>
                <Col>
                  <Button variant="outline-info" href="/Customer/Admin/Account">
                    Back
                  </Button>
                  &nbsp;
                  <Button variant="outline-info" href="/Customer/Admin/Account">
                    Edit Account
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
          <br />
        </div>
      </div>
    );
  }
}

export default CustomerAccountEditAdmin;
