import React from 'react';
import SideBar from '../../SideBar/SideBar';
import '../../App.css';
import searchIcon from '../../resources/searchIcon.png';
import { Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CustomerHomeAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      profile: [],
      items: [{ url: '/Customer/Admin', title: 'Home' },
      { url: `/Customer/Admin/ManageBalance`, title: 'ManageBalance' },
],
    };
  }

  getAllCustomer() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/accounts`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  componentDidMount() {
    this.getAllCustomer().then((data) => {
      this.setState({
        profile: data,
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Hi, Staff.fullName</h2>
          <hr />
          <div className="contents">
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search customer"
                style={{ 'margin-left': '800px' }}
              ></Form.Control>
              <Button
                type="submit"
                variant="outline-*"
                style={{ background: 'none', 'margin-left': '5px' }}
              >
                <img src={searchIcon} alt="Search" />
              </Button>
            </Form>
          </div>
          <h4 className="PageTitle">Customer List</h4>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Balance</th>
                <th>Customer Level</th>
                <th>Detail</th>
              </tr>
            </thead>
            {this.state.profile.map((result) => (
              <tbody key={result._id}>
                <tr>
                  <td>
                    {result.firstName} {result.lastName}
                  </td>
                  <td>$199</td>
                  <td>Normal</td>
                  <td>
                    <Link to={`/customer/admin/profile/${result._id}`}>Detail</Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    );
  }
}

export default CustomerHomeAdmin;
