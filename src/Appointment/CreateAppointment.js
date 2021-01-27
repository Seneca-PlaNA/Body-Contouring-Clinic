import React from 'react';
import '../App.css';
import { Form, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar/SideBar';

class CreateAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { url: '/Appointment', title: 'Appointment Home' },
                { url: '/Appointment/Appointments', title: 'View All Appointments' },
                { url: '/Appointment/Create', title: 'Create Appointment' },
            ]
        };
    }

    componentDidMount() {
        document.title = "Create New Appointment | Body Contouring Clinic";
    }
    render() {
        const title = {
            margin: '5px 600px',
            color: '#393D47',
        }
        return (
            <>
                <br /><br />
                <div class="row">
                <SideBar items={this.state.items} />
                <h2 style={title}>New Appointment</h2>
                </div>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                        <Form>
                            <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                <Form.Label column sm="4">
                                Services:
                                </Form.Label>
                                <Col sm="8">
                                        <Form.Control as="select">
                                            <option>Active air oxygen therapy</option>
                                            <option>Green peel</option>
                                            <option>Skin rejuventation</option>
                                            <option>laser hair removal</option>
                                        </Form.Control>                                        
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                <Form.Label column sm="4">
                                Technician:
                                </Form.Label>
                                <Col sm="8">
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
                                    Date & Time:
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
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
                </Container>
                <Container style={{'margin-top': '50px', cursor: 'pointer'}}>
                    <Row >
                        <Col></Col>
                        <Col md="auto"><a>Cancel</a></Col>
                        <Col lg="2">Save</Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CreateAppointment;