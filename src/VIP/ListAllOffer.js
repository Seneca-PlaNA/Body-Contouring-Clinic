/* eslint-disable react/jsx-key */
import React from 'react';
import '../App.css';
import { Button, Card, CardColumns } from 'react-bootstrap';
import moment from 'moment';

class ListAllOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
    };
  }

  getOffers() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/offers`)
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
                <Card.Title>{result.name}</Card.Title>
                <Card.Text>{moment(result.startDate).format('ll')} ~ {moment(result.endDate).format('ll')}</Card.Text>
                <Card.Text>{result.description}</Card.Text>
                <Card.Text>$ {result.price}</Card.Text>
                <Button variant="outline-info" href={`/Appointment/Offer/Create/${result._id}`}>
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
