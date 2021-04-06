import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Form, Row, Col, Container, Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { post } from 'axios';

class CreateRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Request/', title: 'View All Request' },
        { url: '/Request/Create', title: 'Create Request' },
        { url: '/Request/FAQ', title: 'FAQ' },
      ],
      request: {
        title: String,
        requestCategory: String,
        serviceCategory: String,
        contents: String,
        customer: {},
        date: new Date(),
        lastRequestTime: new Date(),
        status: 'unsolved',
        attachedFile: String,
      },
      _id: localStorage.getItem('_id'),
      customer: {},
      requestCategories: [],
      serviceCategories: [],
      completed: false,
      file: null,
      imageSuccess : false,
      authName: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/create-request`, {
      method: 'POST',
      body: JSON.stringify(this.state.request),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => this.setState({ completed: true }))
      .catch((err) => console.log(err));
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
        request: {
          ...this.state.request,
          attachedFile: tempData,
        }
      }));
    })
    .then(()=>{
      this.setState({
        imageSuccess: true
      })
    });
  }

  onTitleChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        customer: this.state.customer._id,
        title: e.target.value,
      },
    }));
  }

  onRequestCategoryChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        requestCategory: e.target.value,
      },
    }));
  }

  onServiceCategoryChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        serviceCategory: e.target.value,
      },
    }));
  }

  onContentsChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        contents: e.target.value,
      },
    }));
  }

  getRequestCategories() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/request-categories`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  getServiceCategories() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/service-categories`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  getCustomerProfile(id) {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  componentDidMount() {

    this.getCustomerProfile(this.state._id)
    .then((data)=>{
      this.setState({
        authName: data.accountLevelId,
      });
    });

    fetch(`${process.env.REACT_APP_API_URL}/customer?account=${this.state._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          customer: data,
        });
      });
    console.log(this.state._id);
    this.getRequestCategories().then((data) => {
      this.setState({
        requestCategories: data,
      });
    });
    this.getServiceCategories().then((data) => {
      this.setState({
        serviceCategories: data,
      });
    });
  }
  render() {
    if(this.state.authName == null)
    {
      return (
        <Redirect push to={{pathname: '/', }}  refresh="true"/>
      );
    }
    
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: '/request',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Create New Request</h2>
          <br />
          <Container>
            <Form onSubmit={this.handleSubmit.bind(this)} method="POST">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    placeholder="Request Title"
                    onChange={this.onTitleChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Request Category:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="select" onChange={this.onRequestCategoryChange.bind(this)}>
                    <option value="">--Choose--</option>
                    {this.state.requestCategories.map((reqCategory) => (
                      <option key={reqCategory._id} value={reqCategory._id}>
                        {reqCategory.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Involved Service:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="select" onChange={this.onServiceCategoryChange.bind(this)}>
                    <option value="">--Choose--</option>
                    {this.state.serviceCategories.map((servCategory) => (
                      <option key={servCategory._id} value={servCategory._id}>
                        {servCategory.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.onContentsChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Attach File:
                </Form.Label>
                <Form.File type="file" onChange={this.onFormSubmit.bind(this)} accept=".gif, .jpg, .png .pdf .txt"/>
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
              <br />
              <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/Request/">
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={1}>
                    <Button variant="outline-info" type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <br />
            <br />
          </Container>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CreateRequest;
