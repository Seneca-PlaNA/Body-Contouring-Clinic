import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../SideBar/SideBar";
import AppointmentCalendar from "../Appointment/AppointmentCalendar";
import SavedPopUp from "../SavedPopUp";

class EditStaffSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: "/Staff/Schedule", title: "Your Schedule" },
        { url: "/Staff/Schedule/Edit", title: "Set Schedule" },
      ],
      weekCalendarView: "week",
      dayCalendarView: "day",
      savedBackLink: "/Staff/Schedule/Edit",
      title: "Schedule Updated!",
      button: "Back to schedule",
      saveModal: false,
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
      this.setState({ saveModal: false });
      console.log("hey");
  };

  componentDidMount() {
    document.title = "Set Your Schedule | Body Contouring Clinic";
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-9">
            <Container
              style={{ marginLeft: "0px", marginRight: "0px", float: "center" }}
            >
              <h2>
                Modify your schedule{" "}
                <Button variant="outline-info" onClick={this.showSave}>
                  Save
                </Button>
              </h2>
              <SavedPopUp show={this.state.saveModal} handelClose={this.hideSave} text={this.state.title} href={this.state.savedBackLink} button={this.state.button} />
              <Row>
                <Col sm={5}>
                  <AppointmentCalendar view={this.state.dayCalendarView} />
                </Col>
                <Col sm={2}></Col>
                <Col>
                  <AppointmentCalendar view={this.state.weekCalendarView} />
                </Col>
              </Row>
            </Container>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </>
    );
  }
}

export default EditStaffSchedule;
