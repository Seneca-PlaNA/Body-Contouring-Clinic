/* eslint-disable react/jsx-key */
import React from 'react';
import '../../App.css';
import ViewFAQ from './ViewFAQ';
import { Accordion, Container, Tabs, Tab, Card } from 'react-bootstrap';

class ViewAllFAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      faqs: [],
      faqCategory: [],
    };
  }

  getFAQs() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/faqs`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  getFAQCategory(id) {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/faq-category/${id}`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  componentDidMount() {
    this.getFAQs()
      .then((data) => {
        this.setState({
          faqs: data,
        });
    });
  }
  render() {
    return (
      <div className="contents" style={{ 'text-align': 'left', 'margin-right': '280px' }}>
        <Container>
          <Tabs
            id={this.state.faqs._id}
            activeKey={this.state.key}
            onSelect={(key) => this.setState({ key })}
          >
            { this.state.faqs.map( (result) => (
            <Tab 
              eventKey={result.faqCategory._id}
              title={result.faqCategory.name}
              style={{ color: '#393F44', 'margin-top': '10px' }}
            >
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                     {result.title}
                     </Accordion.Toggle>
                     <Accordion.Collapse eventKey="0">
                       <Card.Body>{result.contents}</Card.Body>
                     </Accordion.Collapse>
                </Card>
              </Accordion>
                          
            </Tab> 
          ))}
          </Tabs>

                      <br/><br/><br/><br/><br/>
        </Container>
        <ViewFAQ show={this.state.show} 
        />
        <br />
        <br />
      </div>
    );
  }
}

export default ViewAllFAQ;
