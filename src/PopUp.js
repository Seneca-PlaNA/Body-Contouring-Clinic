import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap'

class PopUp extends React.Component {
    render() {
      return (
        <Modal show={this.props.show} centered>
           <Modal.Header closeButton onClick={this.props.handleClose}>
            <Modal.Title>Delete {this.props.text}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure to delete {this.props.text}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>{this.props.btn1}</Button>
            <Button variant="primary" onClick={this.props.handleDelete}>{this.props.btn2}</Button>
          </Modal.Footer> 
        </Modal>
      );
    }
  }

  export default PopUp;