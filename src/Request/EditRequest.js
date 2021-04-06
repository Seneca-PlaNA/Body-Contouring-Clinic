import React from 'react';
import '../App.css';
import SideBar from '../SideBar/SideBar';
import { Form, Row, Col, Container, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router';
import { post } from 'axios';

class EditRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        { url: '/Request/', title: 'View All Request' },
        { url: '/Request/Create', title: 'Create Request' },
        { url: '/Request/FAQ', title: 'FAQ' },
      ],
      request: [],
      requestCategory: [],
      serviceCategory: [],
      completed: false,
      requestCategories: [],
      serviceCategories: [],
      file: null,
      imageSuccess : false,
      _id: localStorage.getItem('_id'),
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
    fetch(`${process.env.REACT_APP_API_URL}/request/${this.props.id}`, {
      method: 'PUT',
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
        title: e.target.value,
      },
    }));
  }

  onCategoryChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        requestCategory: e.target.value,
      },
    }));
  }

  onContentChange(e) {
    console.log(e.target.value);
    this.setState(() => ({
      request: {
        ...this.state.request,
        contents: e.target.value,
      },
    }));
  }

  onRequestCategoryChange(e) {
    this.setState(() => ({
      requestCategory: {
        ...this.state.requestCategory,
        _id: e.target.value,
      },
      request: {
        ...this.state.request,
        requestCategory: e.target.value,
      },
    }));
  }

  onServiceCategoryChange(e) {
    console.log('ser ' + e.target.value);
    this.setState(() => ({
      serviceCategory: {
        ...this.state.serviceCategory,
        _id: e.target.value,
      },
      request: {
        ...this.state.request,
        serviceCategory: e.target.value,
      },
    }));
  }
  getRequest(id) {
    moment();
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/request/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
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

    this.getRequest(this.props.id).then((data) => {
      this.setState({
        request: data,
        requestId: data._id,
        serviceCategory: data.serviceCategory,
        requestCategory: data.requestCategory,
      });
    });
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
        <Redirect push to={{pathname: '/Request',}} />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Edit Request</h2>
          <br />
          <Container>
            <Form onSubmit={this.handleSubmit.bind(this)} method="PUT">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    Value={this.state.request.title}
                    onChange={this.onTitleChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Category:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="select"
                    onChange={this.onRequestCategoryChange.bind(this)}
                    value={this.state.requestCategory._id}
                  >
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
                  <Form.Control
                    as="select"
                    onChange={this.onServiceCategoryChange.bind(this)}
                    value={this.state.serviceCategory == null ? '' : this.state.serviceCategory._id}
                  >
                    {this.state.serviceCategories.map((ser) => (
                      <option key={ser._id} value={ser._id}>
                        {ser.name}
                      </option>
                    ))}
                    <option value="">--Choose--</option>
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
                    value={this.state.request.contents}
                    onChange={this.onContentChange.bind(this)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Attach File:
                </Form.Label>
                <Form.File type="file" onChange={this.onFormSubmit.bind(this)} aria-describedby="fileSuccessBlock"/>
                <Button variant="outline-secondary" id="fileSuccessBlock" onClick={this.fileUpload.bind(this)}>
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
                    <Button type="submit" variant="outline-info">
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

EditRequest.propTypes = {
  id: PropTypes.string.isRequired,
};
export default EditRequest;
