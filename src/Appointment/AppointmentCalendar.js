import React from "react";
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import { Button } from 'react-bootstrap';

class AppointmentCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
    }
  
    // ---------- Instance method ---------- //

    // Button to move next month
    handleClickNextButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();
  
        calendarInstance.next();
    };

    // Button to move next month
    handleClickPrevButton = () => {
      const calendarInstance = this.calendarRef.current.getInstance();

      calendarInstance.prev();
    };

    // 한 주 스케줄 보기    ( defaultView = month 로 수정해놓았습니다 )
    weekChangeButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.changeView('week', true);
    }


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
        
    }

    render() {
        const selectedView = this.props.view;     // default view
        const today = new Date(); 

        return (
          <>

            {/* <button onClick={this.weekChangeButton}>Week</button> */}
            <Button variant="outline-*"onClick={this.handleClickPrevButton}> &laquo; </Button>
            <span>This month </span>
            <Button variant="outline-*"onClick={this.handleClickNextButton}> &raquo; </Button>
            <Calendar
                ref={this.calendarRef}
                onClickDayname={this.handleClickDayname}
                onbeforeCreateSchedule={this.beforeCreateSchedule}
                height="900px"
                calendars={[

                ]}
                disableDblClick={true}
                disableClick={false}
                isReadOnly={false}
                schedules={[
                  {
                    id: '1',
                    calendarId: '0',
                    title: 'TOAST UI Calendar Study',
                    category: 'time',
                    dueDateClass: '',
                    start: today.toISOString(),
                    end: today.toISOString(),
                    // end: getDate('hours', today, 3, '+').toISOString()
                  },
                  {
                    id: '2',
                    calendarId: '0',
                    title: 'Brooks - Green Peel',
                    category: 'milestone',
                    dueDateClass: '',
                    start: today.toISOString(),
                    end: today.toISOString(),
                    // start: getDate('date', today, 1, '+').toISOString(),
                    // end: getDate('date', today, 1, '+').toISOString(),
                    isReadOnly: true
                  },
                  {
                    id: '3',
                    calendarId: '0',
                    title: 'Piper - Hair Removal',
                    category: 'allday',
                    dueDateClass: '',
                    start: today.toISOString(),
                    end: today.toISOString(),
                    // start: getDate('date', today, 2, '-').toISOString(),
                    // end: getDate('date', today, 1, '-').toISOString(),
                    isReadOnly: true
                  },
                ]}
                scheduleView
                taskView
                template={{
                  milestone(schedule) {
                    return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
                      schedule.title
                    }</span>`;
                  },
                  milestoneTitle() {
                    return 'Milestone';
                  },
                  allday(schedule) {
                    return `${schedule.title}<i class="fa fa-refresh"></i>`;
                  },
                  alldayTitle() {
                    return 'All Day';
                  }
                }}
                theme='' // 어두운 테마 사용가능
                timezones={[
                  {
                    timezoneName: 'America/New_York',
                    displayLabel: 'GMT-05:00',
                    tooltip: 'New York',
                  }
                ]}
                useDetailPopup
                useCreationPopup
                view={selectedView} // You can also set the `defaultView` option.
                month={{
                  daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                  //narrowWeekend: true // 토, 일은 사이즈 작게
                }}
            />

          </>
        );
    }
}

export default AppointmentCalendar;