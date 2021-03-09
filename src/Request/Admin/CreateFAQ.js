/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CreateFAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/FAQ/Admin', title: 'FAQ' },
      ],
      // create faq data
      faq: {
        faqCategory: String,
        title: String,
        contents: String,
      },
      faqCategories:[],
      completed: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/create-faq`,{
      method: "POST",
      body: JSON.stringify(this.state.faq),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onFAQCategoryChange(event) {
    this.setState(() => ({
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
    this.setState(() => ({
      faq:{
        ...this.state.faq,  
        contents: event.target.value,
      }
    }));
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
    this.getFAQCategories().then((data) => {
      this.setState({
        faqCategories: data,
      });
    });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: '/Request/FAQ/Admin'
      }}/>
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Create New FAQ</h2>
          <br />
          <Container>
            <Form onSubmit={this.handleSubmit.bind(this)} method="POST">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Category:
                </Form.Label>
                 <Col sm={6}>
                  <Form.Control as="select" onChange={this.onFAQCategoryChange.bind(this)}>    
                    <option value="">--Choose--</option>
                    {this.state.faqCategories.map((faqCategory) => (
                      <option key={faqCategory._id} value={faqCategory._id}>
                        {faqCategory.name}
                      </option>
                    ))}
                  </Form.Control>
                  
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Title:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="FAQ Title" onChange={this.onTitleChange.bind(this)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Contents:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control as="textarea" rows={3} onChange={this.onContentsChange.bind(this)}/>
                </Col>
              </Form.Group>
              
              <br />
              <br />
              <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/Request/FAQ/Admin/">
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

export default CreateFAQ;
