import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppointmentCalendar from './AppointmentCalendar';


class AppointmentHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarView: 'month',
        }
    }

    componentDidMount() {
        document.title = "Appointment Home | Body Contouring Clinic";
    }

    render() {
        const calendar = {
            width: '1200px',
            height: '1000px',
        };
        return (
            <div className="App-basic">                
                <h2>Hello, user.fullName</h2><br/>
                <Card className="p-3">
                    <blockquote className="blockquote mb-0 card-body" style={calendar}>
                    <p>
                        <AppointmentCalendar view={this.state.calendarView} />
                    </p>
                    </blockquote>
                </Card>
                <br/><br/>
                <Container>
                    <Row>
                        <Col><Button variant="outline-info" href='/Appointment/Appointments'>View All Appointments</Button></Col>
                        <Col><Button variant="outline-info" href='/Appointment/Create'>Create Appointment</Button></Col>
                    </Row>
                    <br/><br/>
                </Container>
            </div>
        );
    }
}

export default AppointmentHome;