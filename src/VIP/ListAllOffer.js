/* eslint-disable react/jsx-key */
import React from 'react';
import '../App.css';
import { Button, Card, CardColumns } from 'react-bootstrap';
const API_URL = process.env.API_URL

class ListAllOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
    };
  }

  getOffers() {
    return new Promise((resolve) => {
      fetch({API_URL} +'/offers')
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
    return (
      <div>
        <CardColumns>
          { this.state.offers.map( (result) => (
            <Card>
              <Card.Img variant="top" src={result.imageURL} />
              <Card.Body>
                <Card.Title>{result.offerName}</Card.Title>
                <Card.Text>{result.description}</Card.Text>
                <Button variant="outline-info" href={`/Appointment/Create?offerId=${result._id}`}>
                  Book
                </Button>
              </Card.Body>
            </Card>
         ))}
        </CardColumns>
      </div>
    );
  }
}

export default ListAllOffer;
