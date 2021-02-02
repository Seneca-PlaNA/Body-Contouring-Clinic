import React from "react";
import "../../App.css";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../SideBar/SideBar";
import styles from "../../app.module.css";
import SavedPopUp from "../../SavedPopUp";

class CreateAppointmentAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: "/Appointment", title: "Appointment Home" },
        {
          url: "/Appointment/Admin/Appointments",
          title: "View All Appointments",
        },
        { url: "/Appointment/Admin/Create", title: "Create Appointment" },
      ],
      saveModal: false,
      savedBackLink: "/Appointment/Admin/Appointment",
      button: "Back To Appointment",
      title: "Appointment Saved!"
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
  };
  componentDidMount() {
    document.title = "Create New Appointment | Body Contouring Clinic";
  }
  render() {
    const title = {
      margin: "5px 600px",
      color: "#393D47",
    };
    return (
      <>
        <br />
        <br />
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-6">
            <h2 className={styles.appointmentTitle}>New Appointment</h2>
            <Container>
              <Row>
                <Col></Col>
                <Col xs={8}>
                  <Form>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Customer Name:
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control placeholder="Natalie Fig" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                      <Form.Label column sm="4">
                        Services:
                      </Form.Label>
                      <Col sm="8" style={{ marginLeft: "0px" }} className="row">
                        <Form.Control inline as="select" className="col-md-7">
                          <option>Active air oxygen therapy</option>
                          <option>Green peel</option>
                          <option>Skin rejuventation</option>
                          <option>laser hair removal</option>
                        </Form.Control>
                        <Button style={{ marginLeft: "50px" }}>
                          Add Services
                        </Button>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                      <Form.Label column sm="4">
                        Technician:
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control as="select">
                          <option>Piper Chapman</option>
                          <option>Alex Vause</option>
                          <option>Daya Diaz</option>
                          <option>Tasha Jefferson</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Date:
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control type="date" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Time:
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control type="time" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Contact Number:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control placeholder="647-596-9521" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Special Request:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="textarea" rows={3} />
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col md="auto">
                  <Button variant="outline-secondary" href="/Appointment">
                    Cancel
                  </Button>
                </Col>
                <Button onClick={this.showSave} variant="outline-info">
                  Save
                </Button>
                <SavedPopUp
                  show={this.state.saveModal}
                  handelClose={this.hideSave}
                  text={this.state.title}
                  href={this.state.savedBackLink}
                  button={this.state.button}
                />
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default CreateAppointmentAdmin;
