import React from 'react';
import '../../App.css';
import { Form, Row, Col, Container, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../SideBar/SideBar';
import styles from '../../app.module.css';
import SavedPopUp from '../..//SavedPopUp';

class LeaveMessageToAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { url: '/Appointment', title: 'Appointment Home' },
                { url: '/Appointment/Admin/Appointments', title: 'View All Appointments' },
                { url: '/Appointment/Admin/Create', title: 'New Appointment' },
            ],
            saveModal: false,
            title: 'Message sent!',
            savedBackLink: "/Appointment/Admin/Appointment",
            button: "Back To Appointment",
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
        document.title = "Leave Message to Appointment | Body Contouring Clinic";
    }

    render() {
        return (
            <>
                <br /><br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <SideBar items={this.state.items} />
                    <div className="col-md-6">
                    <h2 className={styles.appointmentTitle}>Leave Message</h2>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={8}>
                            <Form>
                                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                    <Form.Label column sm="4">
                                    Services:
                                    </Form.Label>
                                    <Col sm="8" style={{marginLeft: '0px'}} className="row">
                                            <Form.Control inline disabled placeholder="Green Peel" />      
                                    </Col>
                                </Form.Group>                                 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                    Technician:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control disabled placeholder="Piper Chapman" />                                                                                                
                                    </Col>
                                </Form.Group>                                    
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Date
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control disabled placeholder="2021-Apr-30" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Time
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control disabled placeholder="14:30" />
                                    </Col>
                                </Form.Group>        
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Contact Number:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control disabled placeholder="647-596-9521" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label column sm="4">
                                        Special Request:
                                    </Form.Label>        
                                    <Col sm="8">
                                        <Form.Control disabled as="textarea" rows={3} placeholder="Vanilla essential oil" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label column sm="4">
                                        Message Box:
                                    </Form.Label>        
                                    <Col sm="8">
                                        <Form.Control as="textarea" rows={3} />
                                    </Col>
                                </Form.Group>        
                            </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row >
                            <Col></Col>
                            <Col md="auto"><Button variant="outline-secondary" href="/Appointment/Admin/Appointment">Cancel</Button></Col>
                            <Button action onClick={this.showSave} variant="outline-info">Save</Button>
                            <SavedPopUp show={this.state.saveModal} handelClose={this.hideSave} text={this.state.title} href={this.state.savedBackLink} button={this.state.button} />

                        </Row>    
                    </Container>
                    <Container style={{'margin-top': '50px', cursor: 'pointer'}}>

                    </Container>
                    </div>
                </div>
 
            </>
        )
    }
}

export default LeaveMessageToAppointment;