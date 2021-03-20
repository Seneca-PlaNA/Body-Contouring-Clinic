import React from 'react';
import SideBar from '../../SideBar/SideBar';
import '../../App.css';
import searchIcon from '../../resources/searchIcon.png';
import { Form, Button, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CustomerBalanceAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      admin: {},
      profile: [],
      items: [{ url: `/Customer/Admin`, title: 'Home' },
              { url: `/Customer/Admin/Balance`, title: 'Balance Management' },
      ],
      _id: localStorage.getItem('_id'),
      filterData:[],
      seachCustomer: '',
      currentPage: 1,
      perPage: 8,
    };
  }

  prevPage() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: parseInt(this.state.currentPage) - 1,
      });
    }
  }
  nextPage() {
    if (
      this.state.currentPage < Math.ceil(this.state.filterData.length / this.state.perPage)
    ) {
      this.setState({
        currentPage: parseInt(this.state.currentPage) + 1,
      });
    }
  }
  handlePage(e) {
    this.setState({
      currentPage: Number(e.target.id),
    });
  }

  handleSearchCustomerChange(e) {
    this.setState({
      seachCustomer: e.target.value,
    });
  }

  handleSearchCustomer(){
      const newCustomers = this.state.profile.filter((req) => {
        let name = req.firstName + req.lastName;
        return name.toLowerCase().includes(this.state.seachCustomer.toLowerCase());
      });
      console.log(newCustomers);
      this.setState({ filterData: newCustomers });
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
        filterData: data,
      });
    });

    this.getCustomerProfile(this.state._id).then((data) => {
      this.setState({
        admin: data,
      });
    });
  }

  render() {
    const indexOfLast = this.state.currentPage * this.state.perPage;
    const indexOfFirst = indexOfLast - this.state.perPage;
    const currentItems = this.state.filterData.slice(indexOfFirst, indexOfLast);

    const pageNums = [];
    for (let i = 1; i <= Math.ceil(this.state.filterData.length / this.state.perPage); i++) {
      pageNums.push(
        <Pagination.Item key={i} id={i} onClick={this.handlePage.bind(this)}>
          {i}
        </Pagination.Item>
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">
            Hi, Staff - {this.state.admin.firstName} {this.state.admin.lastName}{' '}
          </h2>
          <hr />
          <div className="contents">
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search customer"
                style={{ 'margin-left': '800px' }}
                value={this.state.seachCustomer}
                onChange={this.handleSearchCustomerChange.bind(this)}
              ></Form.Control>
              <Button
                variant="outline-*"
                style={{ background: 'none', 'margin-left': '5px' }}
                onClick={this.handleSearchCustomer.bind(this)}
              >
                <img src={searchIcon} alt="Search" />
              </Button>
            </Form>
          </div>
          <h4 className="PageTitle">Customer Balance List</h4>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Customer Balance</th>
                <th>Detail</th>
              </tr>
            </thead>

              <tbody>
              {currentItems.map((result, index) => (
                <tr key={index}>
                  <td>
                    {result.userID}
                  </td>
                  <td>
                    {result.firstName} {result.lastName}
                  </td>
                  <td>{result.balanceHistory == null? "": result.balanceHistory.currentBalance}</td>
                  <td>
                    <Link to={`/Customer/Admin/Balance/${result.balanceHistory._id}`}>Detail</Link>
                  </td>
                </tr>
                ))}
              </tbody>

          </Table>
          <br/>
          <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination.Prev onClick={this.prevPage.bind(this)} />
                    <Pagination>{pageNums}</Pagination>
                    <Pagination.Next onClick={this.nextPage.bind(this)} />
          </Pagination>
        </div>
      </div>
    );
  }
}

export default CustomerBalanceAdmin;
