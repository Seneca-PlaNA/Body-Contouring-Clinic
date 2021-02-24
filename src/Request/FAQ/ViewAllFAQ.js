import React from 'react';
import '../../App.css';
import ViewFAQ from './ViewFAQ';
import { ListGroup, Container, Tabs, Tab } from 'react-bootstrap';

class ViewAllFAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.showFAQ = this.showFAQ.bind(this);
    this.hideFAQ = this.hideFAQ.bind(this);
  }

  showFAQ = () => {
    this.setState({ show: true });
  };

  hideFAQ = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="contents" style={{ 'text-align': 'left', 'margin-right': '280px' }}>
        <Container>
          <Tabs
            id="controlled-tab-example"
            activeKey={this.state.key}
            onSelect={(key) => this.setState({ key })}
          >
            <Tab
              eventKey="shipping"
              title="Shipping"
              style={{ color: '#393F44', 'margin-top': '10px' }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={this.showFAQ}>
                  What are the shipping fee and delivery timeline?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  What does in-stock, backordered and made-to-order mean?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  What is the last date to place an order to receive by Dec 24th?
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab
              eventKey="myOrder"
              title="My Order"
              style={{ color: '#393F44', 'margin-top': '10px' }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={this.showFAQ}>
                  What are the shipping fee and delivery timeline?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  What does in-stock, backordered and made-to-order mean?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  What is the last date to place an order to receive by Dec 24th?
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab
              eventKey="payment"
              title="Payment"
              style={{ color: '#393F44', 'margin-top': '10px' }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={this.showFAQ}>
                  How do I find my order number?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  Can I cancel my order?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  Can I update my order?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  Can I change my address?
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab
              eventKey="returns"
              title="Returns"
              style={{ color: '#393F44', 'margin-top': '10px' }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={this.showFAQ}>
                  How do I find my order number?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  Can I cancel my order?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  Can I update my order?
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.showFAQ}>
                  Can I change my address?
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </Container>
        <ViewFAQ show={this.state.show} handleClose={this.hideFAQ} />
        <br />
        <br />
      </div>
    );
  }
}

export default ViewAllFAQ;
