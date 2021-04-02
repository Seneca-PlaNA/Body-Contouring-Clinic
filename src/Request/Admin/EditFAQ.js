import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { PropTypes } from 'prop-types';

class EditFAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/FAQ/Admin', title: 'FAQ' },
      ],
      faq: [],
      faqCategory: [],
      completed: false,
      faqCategories: [],
      _id: localStorage.getItem('_id'),
      authName: {},
      isSave: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isSave) {
      fetch(`${process.env.REACT_APP_API_URL}/faq/${this.props.id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state.faq),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => this.setState({ completed: true }))
        .catch((err) => console.log(err));
    }
  }

  onCategoryChange(event) {
    this.setState(() => ({
      faq: {
        ...this.state.faq,
        faqCategory: event.target.value,
        isSave: true,
      },
    }));
  }

  onFAQCategoryChange(event) {
    this.setState(() => ({
      faqCategory: {
        ...this.state.faqCategory,
        _id: event.target.value,
      },
      faq: {
        ...this.state.faq,
        faqCategory: event.target.value,
      },
    }));
  }

  onTitleChange(event) {
    if (event.target.value == '') {
      this.setState(() => ({
        isSave: false,
        faq: {
          ...this.state.faq,
          title: event.target.value,
        },
      }));
    } else {
      this.setState(() => ({
        isSave: true,
        faq: {
          ...this.state.faq,
          title: event.target.value,
        },
      }));
    }
  }

  onContentsChange(event) {
    if (event.target.value == '') {
      this.setState(() => ({
        isSave: false,
        faq: {
          ...this.state.faq,
          title: event.target.value,
        },
      }));
    } else {
      this.setState(() => ({
        isSave: true,
        faq: {
          ...this.state.faq,
          title: event.target.value,
        },
      }));
    }
  }

  getFAQ(id) {
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

  getCustomerProfile() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/account/${this.state._id}`)
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

    this.getFAQ(this.props.id).then((data) => {
      this.setState({
        faq: data,
        faqId: data._id,
        faqCategory: data.faqCategory,
      });
    });

    this.getFAQCategories().then((data) => {
      this.setState({
        faqCategories: data,
      });
    });
  }

  render() {
    if(this.state.authName == null || this.state.authName._id == '60371ad3fda1af6510e75e3a' || this.state.authName._id == '60371ae9fda1af6510e75e3b')
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
            pathname: '/Request/FAQ/Admin',
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
                  <Form.Control
                    as="select"
                    onChange={this.onFAQCategoryChange.bind(this)}
                    value={this.state.faqCategory._id}
                  >
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
                  <Form.Control
                    type="text"
                    placeholder="FAQ Title"
                    value={this.state.faq.title}
                    onChange={this.onTitleChange.bind(this)}
                  ></Form.Control>
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
                    value={this.state.faq.contents}
                    onChange={this.onContentsChange.bind(this)}
                  />
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
EditFAQ.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditFAQ;
