import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../resources/searchIcon.png';
import ListAllRequest from './ListAllRequest';
import SideBar from '../SideBar/SideBar';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import PopUp from '../PopUp';


class RequestHome extends React.Component {

    constructor() {
        super();
        this.state = {
          show: false,
          items : [
                {url:'/Request/', title: 'View All Request'},
                {url:'/Request/Create', title: 'Create Request'},
                {url:'/Request/FAQ', title: 'FAQ'},
            ],
          children: 'Request',
          auth: 'General'
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteReq = this.deleteReq.bind(this);
      }

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
      };
    
    deleteReq = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div> 
                <SideBar items={this.state.items}/>
                <div className="col-md-8" style={{'margin-left':'80px'}}>
                    <h2 className="PageTitle">View All Request</h2><br/>
                    <div className="contents">
                        <Form inline>
                            <Form.Control as="select">
                                <option value="30">Last 30 Days</option>
                                <option value="60">Last 60 Days</option>
                                <option value="90">Last 90 Days</option>
                                <option value="120">Last 120 Days</option>
                            </Form.Control>
                            <Form.Control type='date' style={{'margin-left':'30px'}}/>
                            <Form.Control as="select" style={{'margin-left':'30px'}}>
                                <option value="title">Title</option>
                                <option value="content">Category</option>
                                <option value="author">Service</option>
                            </Form.Control>
                            <Form.Control type="text" placeholder="Search.." style={{'margin-left':'30px'}}></Form.Control>
                            <Button type="submit" variant="outline-*" style={{'background':'none','margin-left':'5px'}}><img src={searchIcon} alt="Search"/></Button>
                        </Form>
                        <br/>
                        <ListAllRequest />
                        <Container>
                            <Row >
                                <Col xs={9}></Col>
                                <Col xs={1}><Button variant="outline-info" href="/Request/Create">Create</Button></Col>
                                <Col xs={1}><Button variant="outline-secondary" href='/Request/Edit'>Edit</Button></Col>
                                <Col xs={1}><Button variant="outline-danger" onClick={this.showModal}>Delete</Button></Col>
                                <PopUp show={this.state.show} handleClose={this.hideModal} handleDelete={this.deleteReq} text={this.state.children} btn1='Cancel' btn2='Delete'/>
                            </Row>
                            <br/><br/>
                        </Container>
                        <br/><br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestHome;