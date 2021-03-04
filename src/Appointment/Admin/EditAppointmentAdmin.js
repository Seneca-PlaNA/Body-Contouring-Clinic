import React from 'react';
import '../../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import SideBar from '../../SideBar/SideBar';
// import SavedPopUp from '../../SavedPopUp';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class EditAppointmentAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Admin', title: 'View All Appointments' },
        { url: '/Appointment/Admin/Create', title: 'Create Appointment' },
      ],
      saveModal: false,
      savedBackLink: '/Appointment/Admin',
      button: 'Back To Appointment',
      title: 'Appointment Saved!',
      serviceToggle: false,
      appointment: [],
      customer: [],
      schedule: [],
      times: [],
      date: [],
      service: [],
      staff: [],
      completed: false,
      allServices: [],
      allTechnicians: [],
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  multipleService = () => {
    this.setState({ serviceToggle: !this.state.serviceToggle });
  };

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
  };

  handlSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`,{
      method: "PUT",
      body: JSON.stringify(this.state.appointment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onServiceChange(event) {
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        service: event.target.value,
      }
    }));
  }

  onAddServiceChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        service: event.target.value,
      }
    }));
  }

  onStaffChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        schedule: {
          staff: event.target.value,
        }
      }
    }));
  }
  
  componentDidMount() {
    document.title = 'Edit New Appointment | Body Contouring Clinic';
    fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        appointment: data,
        customer: data.customer.account,
        schedule: data.schedule,
        times: data.schedule.times[0],
        date: data.schedule.date,
        staff: data.schedule.staff.account,
        service: data.service
      });

      fetch(`${process.env.REACT_APP_API_URL}/services`)
      .then(response => response.json())  
      .then((data)=>{
        this.setState({
          allServices: data
        })
      });

      fetch(`${process.env.REACT_APP_API_URL}/staffs`)
      .then(response => response.json())  
      .then((data)=>{
        this.setState({
          allTechnicians: data
        })
      });
  });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: '/Appointment/Admin'
      }}/>
    }
    return (
      <>
        <br />
        <br />
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Edit Appointment</h2>
            <Container>
              <Row>
                <Col>
                  <Form onSubmit={this.handlSubmit.bind(this)}>
                    <Form.Group as={Row} inline>
                      <Form.Label column sm="4">
                        Service(s):
                      </Form.Label>
                      <Col sm="8" style={{ marginLeft: '0px' }} className="row">
                        <Form.Control inline controlId="service" as="select" className="col-md-7" onClick={this.onServiceChange.bind(this)}>
                          {this.state.allServices.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.name}</option>
                          ))}
                        </Form.Control>
                        <Button onClick={this.multipleService} style={{ marginLeft: '35px' }}>
                          Add Services
                        </Button>
                      </Col>
                    </Form.Group>
                    {this.state.serviceToggle && (
                      <Form.Group as={Row}>
                        <Form.Label column sm="4"></Form.Label>
                        <Col sm="8" style={{ marginLeft: '0px' }} className="row">
                          <Form.Control inline as="select" className="col-md-7">
                          {this.state.allServices.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.name}</option>
                          ))}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    )}
                    <Form.Group as={Row} controlId="staff">
                      <Form.Label column sm="4">
                        Technician:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="select" onChange={this.onStaffChange.bind(this)}>
                          {this.state.allTechnicians.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.account.firstName} {result.account.lastName}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Date
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control type="date" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Time
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control type="time" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Contact Number:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control placeholder="647-596-9521" value={this.state.appointment.contactNumber}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                      <Form.Label column sm="4">
                        Special Request:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="textarea" rows={3} placeholder="Vanilla essential oil" value={this.state.appointment.specialRequest}/>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col md="auto">
                  <Button variant="outline-secondary" href="/Appointment/Admin">
                    Cancel
                  </Button>
                </Col>
                <Button action onClick={this.showSave} variant="outline-info">
                  Save
                </Button>
                {/* <SavedPopUp
                  show={this.state.saveModal}
                  handelClose={this.hideSave}
                  text={this.state.title}
                  href={this.state.savedBackLink}
                  button={this.state.button}
                /> */}
              </Row>
            </Container>
            <Container style={{ 'margin-top': '50px', cursor: 'pointer' }}></Container>
          </div>
        </div>
      </>
    );
  }
}

EditAppointmentAdmin.propTypes = {
  id : PropTypes.string.isRequired
}

export default EditAppointmentAdmin;
