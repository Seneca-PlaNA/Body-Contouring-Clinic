import React from 'react';
import '../../App.css';
import searchIcon from '../../resources/searchIcon.png';
import ListAllRequestbyAdmin from './ListAllRequestbyAdmin';
import SideBar from '../../SideBar/SideBar';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

class RequestHomebyAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/FAQ/Admin', title: 'FAQ' },
      ],
      children: 'Request',
      auth: 'Admin',
      dayValue: 0,
      statusValue: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deleteReq = this.deleteReq.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleStatusChange(e) {
    this.setState({
      statusValue: e.target.value
    });
  }
  handleDayChange(e) {
    this.setState({
      dayValue: e.target.value
    });
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  deleteReq = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">View All Request</h2>
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
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="120">Last 120 Days</option>
              </Form.Control>
              <Form.Control type="date" style={{ 'margin-left': '30px', 'margin-right': '15px' }} />
              ~<Form.Control type="date" style={{ 'margin-left': '15px' }} />
              <Form.Control as="select" style={{ 'margin-left': '30px' }}>
                <option value="title">Customer ID</option>
                <option value="content">Customer Name</option>
                <option value="req_Id">Request ID</option>
              </Form.Control>
              <Form.Control
                type="text"
                placeholder="Search.."
                style={{ 'margin-left': '30px' }}
              ></Form.Control>
              <Button
                type="submit"
                variant="outline-*"
                style={{ background: 'none', 'margin-left': '5px' }}
              >
                <img src={searchIcon} alt="Search" />
              </Button>
              <Form.Control
                as="select"
                name="request-status"
                value={this.state.statusValue}
                onChange={this.handleStatusChange}
                style={{ 'margin-left': '30px', width: '100px' }}
              >
                <option value="none" default>
                  All
                </option>
                <option value="unsolved">Unsolved</option>
                <option value="in-progress">In-Progress</option>
                <option value="solved">Solved</option>
              </Form.Control>
            </Form>
            <br />
            <ListAllRequestbyAdmin status={this.state.statusValue} day={this.state.dayValue} />
            <Container>
              <Row>
                <Col xs={10}></Col>
                <Col xs={1}></Col>
                <Col xs={1}>
                  <Button variant="outline-info" href="/Request/Admin/Answer">
                    Answer
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

export default RequestHomebyAdmin;
