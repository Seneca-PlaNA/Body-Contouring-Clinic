/* eslint-disable react/jsx-key */
import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import PopUp from '../../PopUp';
import { Tabs, Tab, Card, Accordion, Container, Button, ButtonToolbar, Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ViewAllFAQbyAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/FAQ/Admin', title: 'FAQ' },
      ],
      children: 'FAQ',
      faqs: [],
      faqCategory: [
        {name: 'After Care'},
        {name: 'Appointment'},
        {name: 'Register'},
        {name: 'Others'},
      ],
      selectedFAQ: {},
      completed: false,
    };
     this.showFAQ = this.showFAQ.bind(this); 
     this.hideFAQ = this.hideFAQ.bind(this); 
     this.handleDelete = this.handleDelete.bind(this);
  }



  showFAQ = () => {
    this.setState({ show: true });
  };

  hideFAQ = () => {
    this.setState({ show: false });
  };

  handleDelete = () => {
    this.deleteFAQ()
    .then(() => {
      this.getFAQs()
      .then((data) => {
        this.setState({
          faq: data,
        });
      });     
    })
    .then(() => {
      this.refreshPage();
    });

    this.setState({ 
      show: false,
      selectedFAQ: null,
      completed: true,
     })
  };

  refreshPage = () => {
    window.location.reload();
  }


  getFAQs() {
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/faqs`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }


  deleteFAQ(){
    return new Promise((resolve) => {
      fetch(`${process.env.REACT_APP_API_URL}/faq/` + this.state.selectedFAQ._id, {method: 'DELETE'})
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
  }

  componentDidMount() {
    this.getFAQs()
      .then((data) => {
        this.setState({
          faqs: data,
          faqCategory: data.faqCategory,
        });
    });
  }

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          push
          to={{
            pathname: '/Request/FAQ/Admin/',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">FAQ</h2>
          <br />
          <Container>
              <Tabs id={this.state.faqs._id} activeKey={this.state.key} onSelect={(key) => this.setState({ key })}>   
              
              { this.state.faqs.map( (result) => (
                <Tab eventKey={result.faqCategory._id} title={result.faqCategory.name} style={{ color: '#393F44', 'margin-top': '10px' }}>
                  <Accordion>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        {result.title}
                      </Accordion.Toggle> 
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          {result.contents}
                            <ButtonToolbar>
                              <Link to={`/Request/FAQ/Admin/Edit/${result._id}`}>
                                <Button variant="outline-secondary" style={{ marginLeft: '780px' }}>Edit</Button>
                              </Link>
                              <Button variant="outline-danger" style={{ marginLeft: '15px' }} onClick={()=> {
                                  this.setState({
                                  show: true,
                                  selectedFAQ: result, })}}>
                                  Delete
                              </Button>
                            </ButtonToolbar>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>

                  </Tab>
                              ))}
              </Tabs>  


          </Container>

          <Container>
            <Row>
              <Col xs={8}></Col>
              <Col xs={7}>
                <Button variant="outline-info" style={{ marginRight: '480px' }} href="/Request/FAQ/Admin/Create">
                  Create
                </Button>
              </Col>
              <br/><br/><br/><br/><br/><br/>
              <PopUp
                show={this.state.show}
                handleClose={this.hideFAQ}
                handleDelete={this.handleDelete}
                text={this.state.children}
                btn1="Cancel"
                btn2="Delete"
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

ViewAllFAQbyAdmin.propTypes = {
  id : PropTypes.string.isRequired
}

export default ViewAllFAQbyAdmin;
