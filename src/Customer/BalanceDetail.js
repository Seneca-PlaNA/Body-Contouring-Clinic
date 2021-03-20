import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import SideBar from '../SideBar/SideBar';

class BalanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Customer', title: 'Home' },
        { url: `/Customer/Profile`, title: 'Profile' },
        { url: `/Customer/Edit/${localStorage.getItem('_id')}`, title: 'Edit Profile' },
        { url: `/Customer/Balance/${localStorage.getItem('_id')}`, title: 'Balance' },
      ],
//      _id: localStorage.getItem('_id'),
      children: 'Balance',
      balance: {
        date: String
      },
      service: {
        price: Number,
        name: String,
      },
    };
  }



  getBalance(id){
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/balance/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
      });
    });
  }

  componentDidMount() {
      this.getBalance(this.props.id).then((data) =>{
        this.setState({
          balance: {
            ...this.state.balance,
            date: data.date
          },
          service: {
            ...this.state.service,
            price: data.services[0].price,
            name: data.services[0].name,
          }
        });
      });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-6">
          <h2>Balance Details</h2>
          <hr />
          <Container>
            <Row>
              <Col></Col>
              <Col xs={7}>

               <table>
                   <tr>
                    <td>Date:</td>
                    <td>{this.state.balance.date}</td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>{this.state.service.price}</td>
                  </tr>
                  <tr>
                    <td>Service:</td>
                    <td>{this.state.service.name}</td>
                  </tr>
                </table>
              </Col>
              <Col></Col>
            </Row>
            <br />
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="outline-info" href="/Customer/Balance">
                Back
              </Button>
            </Col>
          </Container>
        </div>
      </div>
    );
  }
}

export default BalanceDetail;
