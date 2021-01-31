import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import searchIcon from '../../resources/searchIcon.png';
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../SideBar/SideBar";
import styles from '../../app.module.css';

class AppointmentsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: "/Appointment", title: "Appointment Home" },
        { url: "/Appointment/Admin/Appointment", title: "View All Appointments" },
        { url: "/Appointment/Admin/Create", title: "Create Appointment" },
      ],
    };
  }

  componentDidMount() {
    document.title = "All Appointments | Body Contouring Clinic";
  }

  render() {
    const pagination = {
      color: "#B58970",
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
                      <Form.Control type='date' style={{'margin-left':'30px'}}/>
                      <Form.Control as="select" style={{'margin-left':'30px'}}>
                          <option>Customer</option>
                          <option>Info</option>
                      </Form.Control>
                      <Form.Control type="text" placeholder="Search.." style={{'margin-left':'30px'}}></Form.Control>
                      <Button type="submit" variant="outline-*" style={{'background':'none','margin-left':'5px'}}><img src={searchIcon} alt="Search"/></Button>
                  </Form>
                  <table>
                    <tr>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Info</th>
                      <th>Price</th>
                    </tr>
                    <tr>
                      <td>Brook Soso</td>
                      <td>2021-01-14</td>
                      <td>13:00</td>
                      <td>Laser-Any Body area 6 sessions</td>
                      <td>$99</td>
                      <td>
                        <a href="/Appointment/Admin/Appointment">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Mei Chang</td>
                      <td>2021-01-21</td>
                      <td>10:30</td>
                      <td>Pay as you go add on Medium</td>
                      <td>$79</td>
                      <td>
                        <a href="/Appointment/Admin/Appointment">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Brook Soso</td>
                      <td>2021-01-14</td>
                      <td>13:00</td>
                      <td>Laser-Any Body area 6 sessions</td>
                      <td>$99</td>
                      <td>
                        <a href="/Appointment/Admin/Appointment">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Mei Chang</td>
                      <td>2021-01-21</td>
                      <td>10:30</td>
                      <td>Pay as you go add on Medium</td>
                      <td>$79</td>
                      <td>
                        <a href="/Appointment/Admin/Appointment">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Brook Soso</td>
                      <td>2021-01-14</td>
                      <td>13:00</td>
                      <td>Laser-Any Body area 6 sessions</td>
                      <td>$99</td>
                      <td>
                        <a href="/Appointment/Admin/Appointment">details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Mei Chang</td>
                      <td>2021-01-21</td>
                      <td>10:30</td>
                      <td>Pay as you go add on Medium</td>
                      <td>$79</td>
                      <td>
                        <a href="/Appointment/Admin/Appointment">details</a>
                      </td>
                    </tr>
                  </table>
                  <br />
                  <span style={pagination}>
                    {"<"} 1 2 3 4 5 {">"}
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
