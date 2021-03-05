import React from 'react';
import SideBar from '../../SideBar/SideBar';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import moment from 'moment';

class AnswerRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/Admin/FAQ', title: 'FAQ' },
      ],
      request: {},
      request_answer: '',
      completed: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.request);
    fetch(`http://localhost:3001/request/${this.props.id}`, {
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

  onAnswerChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        answer: e.target.value,
      },
    }));
  }

  onStatusChange(e) {
    this.setState(() => ({
      request: {
        ...this.state.request,
        status: e.target.value,
      },
    }));
  }

  componentDidMount() {
    fetch(`http://localhost:3001/request/${this.props.id}`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          request: result,
        });
      });
  }

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: `/Request/Admin/${this.state.request._id}`,
          }}
        />
      );
    }
    const reqTitle = {
      'font-size': 'large',
      'font-weight': 'bold',
      color: 'black',
    };

    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Answer Request</h2>
          <br />
          <div className="contents" style={{ 'text-align': 'left', 'margin-right': '250px' }}>
            <Container>
              <Form onSubmit={this.handleSubmit.bind(this)} method="PUT">
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Q: {this.state.request.title}{' '}
                    {' (' + moment(this.state.request.date).format('ll') + ')'}
                  </Form.Label>
                  <Form.Control type="text" readOnly value={this.state.request.contents} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    A: RE: {this.state.request.title}{' '}
                    {' (' + moment(this.state.request.date).format('ll') + ')'}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={this.state.request.answer}
                    onChange={this.onAnswerChange.bind(this)}
                  />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>Request Status</Form.Label>
                  <Form.Control as="select" onChange={this.onStatusChange.bind(this)}>
                    <option default>
                      ----Choose----
                    </option>
                    <option value="unsolved">Unsolved</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="solved">Solved</option>
                  </Form.Control>
                </Form.Group>
                <Container>
                  <Row>
                    <Col xs={10}></Col>
                    <Col xs={1}>
                      <Button variant="outline-secondary" href="/Request/Admin/">
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
            </Container>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

AnswerRequest.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AnswerRequest;
