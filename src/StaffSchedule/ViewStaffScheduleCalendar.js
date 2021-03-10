import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import StaffScheduleCalendar from './StaffScheduleCalendar';
import SavedPopUp from '../SavedPopUp';

class ViewStaffScheduleCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Staff/Schedules/Calendar', title: 'Schedule Calendar' },
        { url: '/Staff/Schedule/Create', title: 'Create Schedule' },
        { url: '/Staff/Schedules', title: 'View Schedule List' },
      ],
      weekCalendarView: 'week',
      dayCalendarView: 'day',
      savedBackLink: '/Staff/Schedule/Edit',
      title: 'Schedule Updated!',
      button: 'Back to schedule',
      saveModal: false,

      staff: '602b54964bff0f4ab039060d', // temporary till the login auth
      workSchedules: [],
      schedules: [],
      today: new Date(),
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
    console.log('hey');
  };

  componentDidMount() {
    document.title = 'Your Schedule Calendar | Body Contouring Clinic';
    fetch(`${process.env.REACT_APP_API_URL}/staffWorkSchedules?staff=${this.state.staff}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          workSchedules: data,
        });
        this.formatDateTimeForCalendar(this.state.workSchedules);
      });
  }

  formatDateTimeForCalendar = (schedules) => {
    if (!schedules) {
      console.log('error');
    } else {
      schedules.forEach((sch) => {
        let dateInts = sch.date.date.split('/');
        let timeInts = sch.time.time.split('-');
        let startTimeInts = timeInts[0].split(':');
        let endTimeInts = timeInts[1].split(':');

        console.log(startTimeInts);
        console.log(endTimeInts);
        console.log(dateInts);
        let startTime = new Date(
          dateInts[2],
          (dateInts[0]-1),
          dateInts[1],
          startTimeInts[0],
          startTimeInts[1]
        );
        let endTime = new Date(
          dateInts[2],
          (dateInts[0]-1),
          dateInts[1],
          endTimeInts[0],
          endTimeInts[1]
        );

        let schedule = {
          id: sch._id,
          title: !sch.description ? ' ' : sch.description,
          category: 'time',
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          isReadOnly: true,
        };

        this.setState({
          schedules: this.state.schedules.concat(schedule),
        });
      });
    }
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-9">
            <Container style={{ marginLeft: '0px', marginRight: '0px', float: 'center' }}>
              <h2>Your schedule</h2>
              <SavedPopUp
                show={this.state.saveModal}
                handelClose={this.hideSave}
                text={this.state.title}
                href={this.state.savedBackLink}
                button={this.state.button}
              />
              <Row>
                <Col sm={5}>
                  <StaffScheduleCalendar view={this.state.dayCalendarView} schedule={this.state.schedules} today={this.state.today} />
                </Col>
                <Col sm={2}></Col>
                <Col>
                  <StaffScheduleCalendar view={this.state.weekCalendarView} schedule={this.state.schedules} today={this.state.today} />
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

export default ViewStaffScheduleCalendar;
