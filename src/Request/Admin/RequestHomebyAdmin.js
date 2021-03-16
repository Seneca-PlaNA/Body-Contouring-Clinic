import React from 'react';
import '../../App.css';
import searchIcon from '../../resources/searchIcon.png';
// import ListAllRequestbyAdmin from './ListAllRequestbyAdmin';
import SideBar from '../../SideBar/SideBar';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
      status: '',
      startDate: '',
      filter: '',
      requests: [],
      filterRequests: [],
      searchType: [],
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deleteReq = this.deleteReq.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleStatusChange(e) {
    this.setState({
      status: e.target.value,
    });
  }
  handleDayChange(e) {
    this.setState({
      dayValue: e.target.value,
    });
  }
  handleSearchTypeChange(e) {
    this.setState({
      searchType: e.target.value,
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

  onStartDateChange = () => {
    this.setState({ startDate: document.getElementById('startDate').value });
  };

  onEndDateChange = () => {
    this.setState({ endDate: document.getElementById('endDate').value });
  };

  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };
  getRequests() {
    moment();
    return new Promise((resolve) => {
      fetch('http://localhost:3001/requests')
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }
  updateRequest() {
    if (this.state.startDate && this.state.endDate) {
      const newRequest = this.state.requests.filter((req) => {
        return moment(req.date).isBetween(this.state.startDate, this.state.endDate);
      });
      this.setState({ filterRequests: newRequest });
    } else if (this.state.dayValue) {
      this.setState({
        startDate: '',
        endDate: '',
      });
      const newRequests = this.state.requests.filter((req) => {
        return moment().subtract(parseInt(this.state.dayValue), 'days').isBefore(moment(req.date));
      });
      this.setState({ filterRequests: newRequests });
    } else if (this.state.searchType) {
      if (this.state.searchType == 'title') {
        const newRequests = this.state.requests.filter((req) => {
          return req.title.toLowerCase().includes(this.state.filter.toLowerCase());
        });
        this.setState({ filterRequests: newRequests });
      } else if (this.state.searchType == 'customerID') {
        const newRequests = this.state.requests.filter((req) => {
          return req.customer.account.userID
            .toLowerCase()
            .includes(this.state.filter.toLowerCase());
        });
        this.setState({ filterRequests: newRequests });
      }
    }
  }

  componentDidMount() {
    this.getRequests().then((data) => {
      this.setState({
        requests: data,
        filterRequests: data,
      });
    });
  }
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
                <option value="9999">N/A</option>
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="120">Last 120 Days</option>
              </Form.Control>
              <Form.Control
                id="startDate"
                onChange={this.onStartDateChange.bind(this)}
                type="date"
                style={{ 'margin-left': '30px', 'margin-right': '15px' }}
              />
              ~
              <Form.Control
                id="endDate"
                onChange={this.onEndDateChange.bind(this)}
                type="date"
                style={{ 'margin-left': '15px' }}
              />
              <Form.Control
                as="select"
                style={{ 'margin-left': '30px' }}
                onChange={this.handleSearchTypeChange.bind(this)}
              >
                <option value="customerID">Customer ID</option>
                <option value="customerName">Customer Name</option>
                <option value="title">Title</option>
              </Form.Control>
              <Form.Control
                type="text"
                placeholder="Search.."
                style={{ 'margin-left': '30px' }}
                value={this.state.filter}
                onChange={this.handleChange}
              ></Form.Control>
              <Button
                variant="outline-*"
                style={{ background: 'none', 'margin-left': '5px' }}
                onClick={this.updateRequest.bind(this)}
              >
                <img src={searchIcon} alt="Search" />
              </Button>
              <Form.Control
                as="select"
                name="request-status"
                value={this.state.status}
                onChange={this.handleStatusChange}
                style={{ 'margin-left': '50px' }}
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
            <table>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Title</th>
                <th>Category</th>
                <th>Service</th>
                <th>Customer UserID</th>
                <th>Customer Name</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>

              {this.state.filterRequests.map(
                (request) =>
                  (this.state.status.length == 0 || this.state.status == 'none'
                    ? request
                    : this.state.status == request.status) && (
                    <tr key={request._id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <Link to={`/Request/Admin/${request._id}`} style={{ color: 'black' }}>
                          {request.title}
                        </Link>
                      </td>
                      <td>{request.requestCategory.name}</td>
                      <td>{request.serviceCategory.name}</td>
                      <td>{!request.customer ? ' ' : request.customer.account.userID}</td>
                      <td>
                        {!request.customer
                          ? ' '
                          : request.customer.account.firstName +
                            ' ' +
                            request.customer.account.lastName}
                      </td>
                      <td>{moment(request.date).format('lll')}</td>
                      <td>{request.status}</td>
                    </tr>
                  )
              )}
            </table>
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
