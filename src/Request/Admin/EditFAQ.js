import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

class EditFAQ extends React.Component {

    constructor() {
        super();
        this.state = {
          items : [
            {url:'/Request/Admin', title: 'View All Request'},
            {url:'/Request/Admin/FAQ', title: 'FAQ'},
            ],
        };
      }

    render() {
        
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <SideBar items={this.state.items}/>
                <div className="col-md-8" style={{'margin-left':'80px'}}>
                    <h2 className="PageTitle">Edit FAQ for title</h2><br/>
                    <Container>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Category:</Form.Label>
                                <Col sm={6}>
                                    <Form.Control as="select">
                                        <option value="">MemberShip</option>
                                        <option value="">Shipment</option>
                                        <option value=""></option>  
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Title:</Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="text" placeholder="Request Title"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Contents:</Form.Label>
                                <Col sm={6}>
                                    <Form.Control as="textarea" rows={3} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Attach File:</Form.Label>
                                <Form.File/>
                            </Form.Group>
                            <br/><br/>
                            <Container>
                                <Row >
                                    <Col xs={6}></Col>
                                    <Col xs={1}><Button variant="outline-secondary" href="/Request/Admin/FAQ/">Cancel</Button></Col>
                                    <Col xs={1}><Button type="submit" variant="outline-info" >Save</Button></Col>
                                </Row>
                            </Container>
                        </Form>
                        <br/><br/>
                    </Container>
                    <br/>
                </div>
            </div>
        );
    }
}

export default EditFAQ;