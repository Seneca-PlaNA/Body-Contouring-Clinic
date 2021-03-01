import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Row, Col, Button } from 'react-bootstrap';
import PopUp from '../../PopUp';
import { Link } from 'react-router-dom';

class ManageOffer extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/VIP/Admin', title: 'Special Offer' },
        { url: '/VIP/Admin/Manage', title: 'Offer Manage' },
      ],
      children: 'Offer',
      offers: [],
      selectedOffer: {},
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleDelete = () => {
    this.deleteOffer()
    .then(() => {
      this.getOffers()
      .then((data) => {
        this.setState({
          offers: data,
            });
        });
    });

    this.setState({ 
      show: false,
      selectedOffer: null })
  };

  getOffers() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/offer`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  deleteOffer(){
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/offer/`+ this.state.selectedOffer._id, {method: 'DELETE'})
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  componentDidMount() {
    this.getOffers()
      .then((data) => {
        this.setState({
          offers: data,
        });
    });
  }
  render() {
    const pagination = {
      color: '#B58970',
    };

    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Monthly Special Offers</h2>
          <br />
          <div className="contents">
            <br />
            <table>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>ID</th>
                <th>Title</th>
                <th>Contents</th>
                <td></td>
                <td></td>
              </tr>
              { this.state.offers.map((result, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr key={result._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index}</td>
                  <td>{result.offerName}</td>
                  <td>{result.description}</td>
                  <td>
                    <Link to={`/VIP/Admin/Manage/Edit/${result._id}`}>
                      <Button variant="outline-secondary">
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button variant="outline-danger" onClick={()=>{
                      this.setState({
                        show: true,
                        selectedOffer: result,
                      });
                    }}>
                      Delete
                    </Button>
                  </td>
                  <PopUp
                    show={this.state.show}
                    handleClose={this.hideModal}
                    handleDelete={this.handleDelete}
                    text={this.state.children}
                    btn1="Cancel"
                    btn2="Delete"
                  />
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
            <Row>
              <Col xs={10}></Col>
              <Col xs={1}>
                <Button variant="outline-info" href="/VIP/Admin/Manage/Create">
                  Create
                </Button>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default ManageOffer;
