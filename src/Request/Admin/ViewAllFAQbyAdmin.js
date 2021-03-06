/* eslint-disable react/jsx-key */
import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import PopUp from '../../PopUp';
import { Tabs, Tab, Card, Accordion, Container, Button, ButtonToolbar, Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';

class ViewAllFAQbyAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/Request/Admin', title: 'View All Request' },
        { url: '/Request/FAQ/Admin', title: 'FAQ' },
      ],
      children: 'FAQ',
      faqs: [],
      faqCategory: [],
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

  editFAQ = () => {
    this.setState({ show:false })
  }

  handleDelete = () => {
    this.deleteFAQ()
    .then(() => {
      this.getFAQs()
      .then((data) => {
        this.setState({
          faq: data,
            });
        });
    });

    this.setState({ 
      show: false,
      selectedFAQ: null,
      completed: true,
     })
  };

  getFAQs() {
    return new Promise((resolve) => {
      fetch('http://localhost:3001/faqs')
        .then((response) => response.json())
        .then((results) => {
          resolve(results);
        });
    });
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
  deleteFAQ(){
    return new Promise((resolve) => {
      fetch('http://localhost:3001/faq/' + this.state.selectedFAQ._id, {method: 'DELETE'})
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
            { this.state.faqs.map( (result) => (

            <Tabs
             id={result._id}
            activeKey={this.state.key}
            onSelect={(key) => this.setState({ key })} 
          >
            <Tab
              eventKey={result.faqCategory._id}
              title={result.faqCategory.name}
              style={{ color: '#393F44', 'margin-top': '10px' }}
            >
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                      {result.title}
                     </Accordion.Toggle>
                     <Accordion.Collapse eventKey="0">
                       <Card.Body>{result.contents}
                       <ButtonToolbar>
                         <Button variant="outline-secondary" style={{ marginLeft: '780px' }} href="/Request/FAQ/Admin/Edit">Edit</Button>
                         <Button variant="outline-danger" style={{ marginLeft: '15px' }} onClick={()=> {
                          this.setState({
                            show: true,
                            selectedFAQ: result,
                          })
                         }}>Delete</Button>
                        </ButtonToolbar>
                       </Card.Body>
                     </Accordion.Collapse>
                </Card>
              </Accordion>
              </Tab>
              </Tabs>
              ))}
              </Container>
              <br/>

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

export default ViewAllFAQbyAdmin;
