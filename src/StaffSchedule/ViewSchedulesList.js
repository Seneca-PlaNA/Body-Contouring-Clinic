import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

class ViewSchedulesList extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/Staff/Schedules/Calendar', title: 'Schedule Calendar' },
        { url: '/Staff/Schedule/Create', title: 'Create Schedule' },
        { url: '/Staff/Schedules', title: 'View Schedule List' },
      ],
      loaded: true,
      _id: localStorage.getItem('_id'),
      staff: [],
      account: [],
      workSchedules: [],
      date: [],
      time: [],
    };
  }

  getWorkSchedules(id) {
    document.title = 'Your Schedule List | Body Contouring Clinic';
    fetch(`${process.env.REACT_APP_API_URL}/staffWorkSchedules?staff=${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          workSchedules: data,
        });
      });
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/staff?account=${this.state._id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          staff: data,
          account: data.account,
        });
        console.log(this.state.staff);
        this.getWorkSchedules(this.state.staff._id);
      });
  }

  render() {
    console.log(this.state.workSchedules);
    if (this.state.loaded) {
      return (
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Hi, {this.state.account.firstName + ' ' + this.state.account.lastName}, these are your schedules</h2>
            <br />
            <div className="contents">
              <Form inline>
                <Form.Control
                  as="select"
                  name="days"
                  value={this.state.dayValue}
                  onChange={this.handleDayChange}
                >
                  <option value="0">N/A</option>
                  <option value="30">This Week</option>
                  <option value="60">This Month</option>
                  <option value="90">Next Month</option>
                </Form.Control>
              </Form>
              <br />
              <table>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                </tr>

                {this.state.workSchedules.map((sch) => (
                  <tr key={sch._id}>
                    <td>{sch.date.date}</td>
                    <td>{sch.time.time}</td>
                    <td>
                      <Button variant="outline-secondary" href={`/Staff/Schedule/Detail/${sch._id}`}>
                        Details
                      </Button>{' '}
                      <Button variant="outline-info" href={`/Staff/Schedule/Edit/${sch._id}`}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </table>
              <Container>
                <Row>
                  <Col xs={10}></Col>
                  <Col xs={1}></Col>
                  <Col xs={1}>
                    <Button variant="outline-info" href="/Staff/Schedule/Create">
                      Create
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
}

export default ViewSchedulesList;
