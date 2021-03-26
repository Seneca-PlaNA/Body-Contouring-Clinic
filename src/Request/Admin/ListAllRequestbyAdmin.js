import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';

class ListAllRequestbyAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      requests: this.props.requests,
      filterRequests: [],
      requestCategory: ' ',
    };
  }

  getRequests() {
    moment();
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/requests`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  updateRequest() {
    if (this.props.startDate && this.props.endDate) {
      console.log('start ' + this.props.startDate);
      console.log('end ' + this.props.endDate);
      const newRequest = this.state.requests.filter((req) => {
        console.log(req.date);
        return moment(req.date).isBetween(this.props.startDate, this.props.endDate);
      });
      console.log(newRequest);
      this.setState({ filterRequests: newRequest });
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
    const pagination = {
      color: '#B58970',
    };

    console.log(this.props.day);
    return (
      <div className="ListAll">
        <Button onClick={this.updateRequest.bind(this)}>Update</Button>
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

          {this.state.requests.map(
            (request) =>
              (this.props.status.length == 0 || this.props.status == 'none'
                ? request
                : this.props.status == request.status) && (
                <tr key={request._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Link to={`/Request/Admin/Details/${request._id}`} style={{ color: 'black' }}>
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
        <br />
        <span style={pagination}>
          <a href="#"> &laquo; </a>
          <a href="#"> 1 </a>
          <a className="active" href="#">
            {' '}
            2{' '}
          </a>
          <a href="#"> 3 </a>
          <a href="#"> 4 </a>
          <a href="#"> 5 </a>
          <a href="#"> 6 </a>
          <a href="#"> &raquo; </a>
        </span>
        <br />
      </div>
    );
  }
}

ListAllRequestbyAdmin.propTypes = {
  status: PropTypes.string,
  day: PropTypes.string,
};
export default ListAllRequestbyAdmin;
