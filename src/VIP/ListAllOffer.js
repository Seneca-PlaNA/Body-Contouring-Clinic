import React from 'react';
import '../App.css';
import { Button, Card, CardColumns } from 'react-bootstrap';

class ListAllOffer extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount () {
    fetch('http://localhost:3001/offers')
      .then((res) => {
        this.setState({ results: res.json() });
      });
  }

  render() {
    return (
      <div>
        <CardColumns>
          {
            this.state.results.map( (result) => {
              <Card>
                <Card.Img variant="top" src={result.imageURL} />
                <Card.Body>
                  <Card.Title>{result.offerName}</Card.Title>
                  <Card.Text>
                    {result.description}
                  </Card.Text>
                  <Button variant="outline-info" href="/Appointment/Create">
                    Book
                  </Button>
                </Card.Body>
              </Card>
            })          
          }
        </CardColumns>
      </div>
    );
  }
}

export default ListAllOffer;
