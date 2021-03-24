import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { post } from 'axios';

class EditOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      items: [
        { url: '/VIP/Admin', title: 'Special Offer' },
        { url: '/VIP/Admin/Manage', title: 'Offer Manage' },
      ],
      children: 'Offer',
      offer: {},
      startDate : String,
      endDate: String,
      completed : false,
      file: null,
      imageSuccess : false,
    };
    this.imageShow = this.imageShow.bind(this);
    this.imageHide = this.imageHide.bind(this);
  }
  imageShow = () => {
    this.setState({
      imageSuccess : true
    })
  }

  imageHide = () => {
    this.setState({
      imageSuccess : false
    })
  }

  handlSubmit(event) {
    event.preventDefault();
    console.log(this.state.offer);
    fetch(`${process.env.REACT_APP_API_URL}/offer/${this.props.id}`,{
      method: "PUT",
      body: JSON.stringify(this.state.offer),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onFormSubmit(event){
    this.setState({
      file: event.target.files[0],
    });
  }

  fileUpload(){
    const url = process.env.REACT_APP_IMAGE_URL + "/upload";
    const formData = new FormData();
    formData.append('file', this.state.file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    post(url, formData,config)
    .then((data)=>{
      var tempData = JSON.stringify(data.data.fileName).replace('"','').replace('"','');
      console.log("ResultData: " + tempData );
      this.setState(()=>({
        offer: {
          ...this.state.offer,
          imageURL: tempData,
        }
      }));
    })
    .then(()=>{
      this.setState({
        imageSuccess: true
      })
    });
  }

  onNameChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
        name: event.target.value,
      }
    }));
    console.log(this.state.offer);
  }

  onDescriptionChange(event) {
    this.setState(() => ({
      offer: {
       ...this.state.offer,
        description: event.target.value,
      }
    }));
  }

  onPriceChange(event) {
    this.setState(() => ({
      offer: {
        ...this.state.offer,
        price: event.target.value,
      },
    }));
  }

  onStartDateChange(event) {
    this.setState(() => ({
      startDate: event.target.value,
      offer:{
        ...this.state.offer,
        startDate: event.target.value,
      }
    }));
  }

  onEndDateChange(event) {
    this.setState(() => ({
      endDate: event.target.value,
      offer:{
        ...this.state.offer,
        endDate: event.target.value,
      }
    }));
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/offer/${this.props.id}`)
      .then(response => response.json())
      .then((data) => {
        var sDate = data.startDate.split("T");
        var eDate = data.endDate.split("T");
        console.log(sDate);
        this.setState({
          offer: data,
          startDate : sDate[0],
          endDate : eDate[0],
        });
    });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: '/VIP/Admin/Manage'
      }}/>
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Edit Offer</h2>
          <br />
          <Container>
            <Form onSubmit={this.handlSubmit.bind(this)} method="PUT">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Offer Title" value={this.state.offer.name} onChange={this.onNameChange.bind(this)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="textarea" rows={3} value={this.state.offer.description} onChange={this.onDescriptionChange.bind(this)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Price:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control rows={3} value={this.state.offer.price} onChange={this.onPriceChange.bind(this)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} inline>
                <Form.Label column sm={2}>
                  Active Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control controlId="startDate" type="date" value={this.state.startDate} onChange={this.onStartDateChange.bind(this)} />
                </Col>
                <Col sm={3}>
                  <Form.Control controlId="endDate" type="date" value={this.state.endDate} onChange={this.onEndDateChange.bind(this)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Attach File:
                </Form.Label>
                <Form.File type="file" onChange={this.onFormSubmit.bind(this)}/>
                <Button variant="outline-secondary" onClick={this.fileUpload.bind(this)}>
                      Upload
                </Button>
                <Modal show={this.state.imageSuccess} onHide={this.imageHide}>
                    <Modal.Header closeButton>
                      <Modal.Title>Image Upload Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Image Upload Success</p>
                    </Modal.Body>
                </Modal>
              </Form.Group>
              <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/VIP/Admin/Manage">
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={1}>
                    <Button type="submit" variant="outline-info">
                      Save
                    </Button>
                  </Col>
                </Row>
                <br />
              </Container>
              <br />
              <br />
            </Form>
          </Container>
          <br />
        </div>
      </div>
    );
  }
}

EditOffer.propTypes = {
  id : PropTypes.string.isRequired
}

export default EditOffer;
