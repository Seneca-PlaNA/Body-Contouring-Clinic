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
      faqCategory: ' ',
    };
/*     this.showFAQ = this.showFAQ.bind(this);
    this.hideFAQ = this.hideFAQ.bind(this); */
  }

/*   showFAQ = () => {
    this.setState({ show: true });
  };

  hideFAQ = () => {
    this.setState({ show: false });
  }; */
  getFAQs() {
    return new Promise((resolve) => {
      fetch('http://localhost:3001/faqs')
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  getFAQCategory(id) {
    return new Promise((resolve) => {
      fetch(`http://localhost:3001/faq-category/${id}`)
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
        { this.state.faqs.map( (result) => (
          <Tabs
            id={result._id}
            activeKey={this.state.key}
            onSelect={(key) => this.setState({ key })}
          >
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
          </Tabs>
        ))}
                      <br/><br/><br/><br/><br/>
        </Container>
        <ViewFAQ show={this.state.show} 
        //handleClose={this.hideFAQ} 
        />
        <br />
        <br />
      </div>
    );
  }
}

export default ViewAllFAQ;
