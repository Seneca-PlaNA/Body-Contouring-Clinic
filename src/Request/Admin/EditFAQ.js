/* eslint-disable react/prop-types */
import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { moment } from 'moment';


class EditFAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/Admin/FAQ', title: 'FAQ' },
      ],
      faq:[],
      faqCategory:[],
      completed: false,
      faqCategories: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/faq/${this.props.id}`,{
      method: "PUT",
      body: JSON.stringify(this.state.faq),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onFAQCategoryChange(event) {
    this.setState(() => ({
      faqCategory: {
        ...this.state.faqCategory,
        _id: event.target.value,
      },
      faq:{
        ...this.state.faq,
        faqCategory: event.target.value,
      },
    }));
  }

  onTitleChange(event) {
    this.setState(() => ({
      faq:{
        ...this.state.faq,
        title: event.target.value
      }
    }));
  }

  onContentsChange(event) {
    console.log(event.target.value);
    this.setState(() => ({
      faq:{
        ...this.state.faq,  
        contents: event.target.value,
      }
    }));
  }

  getFAQ(id) {
    moment();
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/faq/${id}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  getFAQCategories() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/faq-categories`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }



  componentDidMount() {
    this.getFAQ(this.props.id).then((data) => {
      this.setState({
        faq: data,
        faqID: data._id,
        faqCategory: data.faqCategory,
      })
    });
    this.getFAQCategories().then((data) => {
      this.setState({
        faqCategories: data,
      });
    });
  }

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: '/Request/Admin/FAQ',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Edit FAQ for title</h2>
          <br />
          <Container>
            <Form onSubmit={this.handleSubmit.bind(this)} method="PUT">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Category:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="select"
                  onChange={this.onFAQCategoryChange.bind(this)}
                    value={this.state.faqCategory == null ? '' : this.state.faqCategory._id}
                  >
                    {this.state.faqCategories.map((faqCategory) => (
                      <option key={faqCategory._id} value={faqCategory._id}>
                        {faqCategory.name}
                      </option>
                    ))}
                    <option value="">--Choose--</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                <Form.Control type="text" placeholder="FAQ Title" value={this.state.faq.title} onChange={this.onTitleChange.bind(this)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                <Form.Control as="textarea" rows={3}value={this.state.faq.contents} onChange={this.onContentsChange.bind(this)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Attach File:
                </Form.Label>
                <Form.File />
              </Form.Group>
              <br />
              <br />
              <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/Request/Admin/FAQ/">
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
        </div>
      </div>
    );
  }
}

export default EditFAQ;
