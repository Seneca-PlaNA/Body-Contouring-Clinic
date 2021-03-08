import React from 'react';
import SideBar from '../../SideBar/SideBar';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import moment from 'moment'

class ViewRequestAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/FAQ/Admin', title: 'FAQ' },
      ],
      request: [],
      requestId: '',
      customer: [],
      serviceCategory: [],
      requestCategory: [],
      request_answer: '',
      completed: false,
    };
  }

  getRequest(id) {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/request/${id}`)
        .then(response => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }
  componentDidMount() {
    this.getRequest(this.props.id).then((data) => {
      this.setState({
        request: data,
        requestId: data._id,
        customer: data.customer.account,
        requestCategory: data.requestCategory,
        serviceCategory: data.serviceCategory,
      });
    });
  }

  render() {

    if (this.state.completed) {
      return <Redirect push to={{
        pathname: '/Request/Admin'
      }} />
    }
    const reqTitle = {
      'font-size': 'large',
      'font-weight': 'bold',
      color: 'black',
    };
    return (
      <div className="row">
        {console.log(this.state.customer)}
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Request Detail for {'"'}{this.state.request.title}{'"'}</h2>
          <br />
          <div className="contents" style={{ 'text-align': 'left', 'margin-right': '250px' }}>
            <Container >
              <Form style={{'padding-bottom': '50px'}}>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Request Contents
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={this.state.request.contents} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Request Category
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={this.state.requestCategory == null ? '[No Request Category Applied]' : this.state.requestCategory.name} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Involved Service Category
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={this.state.serviceCategory == null ? '[No Service Category Applied]' : this.state.serviceCategory.name} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Customer Information
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={'Name: ' + this.state.customer.firstName + ' ' + this.state.customer.lastName} />
                  <Form.Control type="text" plaintext readOnly value={'UserID: ' + this.state.customer.userID} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Request Created Time
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={moment(this.state.request.date).format('ll')} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Last Updated Time
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={moment(this.state.request.lastRequestTime).format('ll')} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Status
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={this.state.request.status} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Attached File {this.state.serviceCategory.name}
                  </Form.Label>
                  <Form.Control type="text" plaintext readOnly value={this.state.request.attachedFile} />
                </Form.Group>
                <Form.Group style={{ 'background-color': '#F5F9F9' }}>
                  <Form.Label style={reqTitle}>
                    Answer
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} value={this.state.request.answer == '' ? '[No answer]' : this.state.request.answer} plaintext readOnly />
                </Form.Group>
                <Container>
                  <Row>
                    <Col xs={11}></Col>
                    <Col xs={1}>
                      <Button type="submit" variant="outline-info" href={`/Request/Admin/Answer/${this.state.requestId}`}>
                        Answer
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

ViewRequestAdmin.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewRequestAdmin;
