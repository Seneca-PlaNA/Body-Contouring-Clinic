/* eslint react/prop-types: 0 */
import React from 'react';
import '../../App.css';
import { Modal, Button } from 'react-bootstrap';

class ViewFAQ extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} centered>
        <Modal.Header closeButton onClick={this.props.handleClose}>
          <Modal.Title>What are the shipping fee and delivery timeline?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Due to the high volume of shipments at this time, shipping couriers are unable to
            guarantee estimated delivery dates. Be sure to keep an eye on your tracking to follow
            its journey! Estimated Dispatch Date The estimated dispatch date will be indicated on
            each product page above the “ADD TO BAG” button (screenshot below). This date will also
            be indicated during checkout!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" href="/Request/Admin/FAQ/Edit">
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ViewFAQ;
