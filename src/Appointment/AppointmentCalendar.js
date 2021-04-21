/* eslint react/prop-types: 0 */
import React from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import { Button } from 'react-bootstrap';
// import { getAllByPlaceholderText } from '@testing-library/dom';

class AppointmentCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      appointment:[],
      schedule:[],
      customer: [],
      month: 0,
      monthText: String,
      _id: localStorage.getItem('_id'),
    };
    this.calendarRef = React.createRef();
  }
  getAppointment(custId){
    fetch(`${process.env.REACT_APP_API_URL}/appointment?customer=${custId}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        appointment: data
      });
      console.log(this.state.appointment);
      this.formatCalendar(this.state.appointment);
    });
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/customer?account=${this.state._id}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        customer: data,
      });
      console.log(this.state.customer);
      this.getAppointment(this.state.customer._id);
    });
  }

  formatCalendar = (appointments) => {
    if(appointments == null)
    {
      console.log("Error");
    }
    else
    {
      appointments.forEach((appointment)=>{
        console.log(appointment.schedule.time.time);
        var pureDate = (appointment.schedule.date.date).split("/");
        var pureTime = (appointment.schedule.time.time).split("-");
        var pureStart = pureTime[0].split(":");
        var pureEnd = pureTime[1].split(":");

        pureDate[0] = String(Number(pureDate[0]) - 1);
        console.log(pureDate);

        var startTime = new Date(pureDate[2], pureDate[0], pureDate[1], pureStart[0], pureStart[1]);
        var endTime = new Date(pureDate[2], pureDate[0], pureDate[1], pureEnd[0], pureEnd[1]);
        var appnt_id = appointment._id;
        var appnt_title = appointment.service.name;

        var tempAppnmt = {
          id: appnt_id,
          caalendarId: 1,
          title: appnt_title,
          category: 'time',
          dueDateClass: '',
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          isReadOnly: true,
      }

        this.setState({
          schedule: this.state.schedule.concat(tempAppnmt),
          month: Number(pureDate[0]) + 1,
        });

        this.handleMonthText(this.state.month);
        console.log(this.state.schedule);
      });
    }
  }

  handleMonthText = (month) =>{
    var tempText = "";
    console.log(month);

    var editMonth = month >= 0 ? month%12 : 12 - Math.abs(month)%12;
    console.log(editMonth);
    switch (editMonth){
      case 0:
        tempText= "December";
        break;
      case 1:
        tempText = "January";
        break;
      case 2:
        tempText = "Feburary"
        break;
      case 3:
        tempText = "March";
        break;
      case 4:
        tempText = "April";
        break;
      case 5:
        tempText = "May";
        break;
      case 6:
        tempText = "June";
        break;
      case 7:
        tempText = "July";
        break;
      case 8:
        tempText = "August";
        break;
      case 9:
        tempText = "September";
        break;
      case 10:
        tempText = "October";
        break;
      case 11:
        tempText = "November";
        break;
      case 12:
        tempText = "December";
        break;
    }
    this.setState({
      monthText: tempText,
    });
  }
  // ---------- Instance method ---------- //

  // Button to move next month
  handleClickNextButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    var tempNum = this.state.month + 1;
    this.setState({
      month: tempNum,
    });
    this.handleMonthText(tempNum);
    calendarInstance.next();
  };

  // Button to move next month
  handleClickPrevButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    var tempNum = this.state.month - 1;
    this.setState({
      month: tempNum,
    });
    this.handleMonthText(tempNum);
    calendarInstance.prev();
  };

  // 한 주 스케줄 보기    ( defaultView = month 로 수정해놓았습니다 )
  weekChangeButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();

    calendarInstance.changeView('week', true);
  };

  // ---------- Event ---------- //

  // week 상태에서 요일 클릭
  handleClickDayname = (ev) => {
    console.group('onClickDayname');
    console.log(ev.date);
    console.groupEnd();
  };

  beforeCreateSchedule = (ev) => {
    console.group('onbeforeCreateSchedule');
    console.log(ev.date);
    console.groupEnd();
  };

  render() {
    const selectedView = this.props.view; // default view
    console.log(this.state.month);
    return (
      <>
        {/* <button onClick={this.weekChangeButton}>Week</button> */}
        <Button variant="outline-*" onClick={this.handleClickPrevButton}>
          {' '}
          &laquo;{' '}
        </Button>
        <span>{this.state.monthText}</span>
        <Button variant="outline-*" onClick={this.handleClickNextButton}>
          {' '}
          &raquo;{' '}
        </Button>
        <Calendar
          ref={this.calendarRef}
          onClickDayname={this.handleClickDayname}
          onbeforeCreateSchedule={this.beforeCreateSchedule}
          height="900px"
          calendars={[]}
          disableDblClick={true}
          disableClick={false}
          isReadOnly={false}
          schedules = {this.state.schedule}
          scheduleView
          taskView
          template={{
            milestone(schedule) {
              return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
            },
            milestoneTitle() {
              return 'Milestone';
            },
            allday(schedule) {
              return `${schedule.title}<i class="fa fa-refresh"></i>`;
            },
            alldayTitle() {
              return 'All Day';
            },
          }}
          theme="" // 어두운 테마 사용가능
          timezones={[
            {
              timezoneName: 'America/New_York',
              displayLabel: 'GMT-05:00',
              tooltip: 'New York',
            },
          ]}
          useDetailPopup
          // useCreationPopup
          view={selectedView} // You can also set the `defaultView` option.
          month={{
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            //narrowWeekend: true // 토, 일은 사이즈 작게
          }}
        />
      </>
    );
  }
}

export default AppointmentCalendar;
