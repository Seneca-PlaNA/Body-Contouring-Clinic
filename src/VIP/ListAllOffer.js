import React from 'react';
import '../App.css';
import { Button, Card, CardColumns } from 'react-bootstrap';

class ListAllOffer extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: [],
    };
  }

  getOffer() {
    return new Promise((resolve) => {
      fetch('http://localhost:3001/offers')
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }
  componentDidMount() {
    // fetch('http://localhost:3001/offers').then((res) => {
    //   this.setState({ results: res.json() });
    // });
    this.getOffer().then((data) => {
      this.setState({
        offers: data,
      });
    });
  }

  render() {
    return (
      <div>
        {'offer:' + JSON.stringify(this.state.offers[0])}
        <CardColumns>
          {this.state.offers.map((result) => {
            console.log('offer: ' + result.offerName);
            <Card>
              <Card.Img variant="top" src={result.imageURL} />
              <Card.Body>
                <Card.Title>{result.offerName}</Card.Title>
                <Card.Text>{result.description}</Card.Text>
                <Button variant="outline-info" href="/Appointment/Create">
                  Book
                </Button>
              </Card.Body>
            </Card>;
          })}
        </CardColumns>
      </div>
    );
  }
}

export default ListAllOffer;
