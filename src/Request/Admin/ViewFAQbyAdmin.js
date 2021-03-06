import React from 'react';
import '../../App.css';
import { Button, Modal } from 'react-bootstrap';

class ViewFAQbyAdmin extends React.Component {
  render() {
    return (
      <Modal show={this.prop.show} centered>
        <Modal.Header closeButton onClick={this.prop.handleClose}>
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
          <Button variant="outline-secondary" href="/Request/FAQ/Admin/Edit">
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ViewFAQbyAdmin;
