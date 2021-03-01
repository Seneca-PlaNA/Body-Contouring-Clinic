import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

class ListAllRequestbyAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      requests: [],
      requestCategory: ' ',
    };
  }

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

  componentDidMount() {
    this.getRequests().then((data) => {
      this.setState({
        requests: data,
      });
    });
  }
  render() {
    const pagination = {
      color: '#B58970',
    };
    {
      console.log(this.props.status);
    }
    {
      console.log(this.state.loaded);
    }
    return (
      <div className="ListAll">
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
            <th>Date</th>
            <th>Status</th>
          </tr>

          {this.state.requests.map((request) =>
            // (this.props.status.length == 0 ||
            // this.props.status == 'none') ||
            //   parseInt(this.props.day) == 0 ||
            //   this.props.day.length == 0
            //   ? request._id.length > 0
            //   : this.props.status == request.status &&
            //   moment(request.date) > moment().subtract(parseInt(this.props.day), 'days')
            //   &&
              (
                  <tr key={request._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <Link to={`/Request/Admin/Answer/${request._id}`} style={{ color: 'black' }}>
                        {request.title}
                      </Link>
                    </td>
                    <td>{request.requestCategory.name}</td>
                    <td>{request.serviceCategory.name}</td>
                    <td>{request.customer.account.userID}</td>
                    <td>
                      {request.customer.account.firstName + ' ' + request.customer.account.lastName}
                    </td>
                    <td>{request.date}</td>
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
