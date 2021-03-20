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
      admin: {},
      profile: [],
      items: [{ url: `/Customer/Admin/${this.props.id}`, title: 'Home' }],
      _id: localStorage.getItem('_id'),
      accountLevelId: {},
      balanceHistory: {},
    };
    console.log(this.state.profile)
    console.log(this.props.id)
  }
  getCustomerProfile(id) {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
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
/*          accountLevelId: {
           ...this.state.profile,
          accountLevelId: data.accountLevelId,
        },  */
      }); console.log(this.state.profile);  

    this.getCustomerProfile(this.state._id).then((data) => {
      this.setState({
        admin: data,
      });
    });
  });
}

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">
            Hi, {this.state.admin.firstName} {this.state.admin.lastName}{' '}
          </h2>
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
{/*                 <th>Customer Balance</th> */}
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
{/*                   <td>{result.balanceHistory.balances.balanceAccount}</td> */}
{/*                   <td>{result.accountLevelId._id}</td> */}
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
