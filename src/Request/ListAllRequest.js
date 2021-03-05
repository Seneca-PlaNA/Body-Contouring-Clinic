import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ListAllRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
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
    console.log(this.state.requests);
    const pagination = {
      color: '#B58970',
    };

    return (
      <div className="ListAll">
        <table>
          <tr>
            <th>
              <input type="checkbox" value="selectAll" />
            </th>
            <th>title</th>
            <th>Category</th>
            <th>Service</th>
            <th>Created Date</th>
            <th>Last Updated Date</th>
            <th>Status</th>
          </tr>
          {this.state.requests.map((request) => (
            <tr key={request._id}>
              <td>
                <input type="checkbox" value={request._id} />
              </td>
              <td>
                <Link to={`/Request/Detail/${request._id}`} style={{ color: 'black' }}>
                  {request.title}
                </Link>
              </td>
              <td>{request.requestCategory.name}</td>
              <td>{request.serviceCategory == null ? '' : request.serviceCategory.name}</td>
              <td>{moment(request.date).format('ll')}</td>
              <td>{moment(request.lastRequestTime).format('lll')}</td>
              <td>{request.status}</td>
            </tr>
          ))}
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

export default ListAllRequest;
