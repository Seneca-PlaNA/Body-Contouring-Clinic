/* eslint-disable react/jsx-key */
import React from 'react';
import '../../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CreateAppointmentAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveModal: false,
      savedBackLink: '/Appointment/Admin',
      button: 'Back To Appointment',
      title: 'Appointment Saved!',
      completed: false,
      appointment: {
        customer: '',
        contactNumber: '',
        specialRequest: String,
        service: '',
        schedule: '',
        confirmation: 'false',
      },
      services: [],
      customers: [],
      filterData: [],
      technician:[],
      tempTime: '',
      serviceNull: false,
      timeNull: false,
      dateNull: false,
      technicianNull: false,
      contactNumNull: false,
      customerNull: false,
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  handlSubmit(event) {
    console.log(this.state.appointment);
    this.state.appointment.customer == ''? this.setState({customerNull: true}):this.setState({customerNull: false}); 
    this.state.appointment.service == ''? this.setState({serviceNull: true}):this.setState({serviceNull: false}); 
    this.state.appointment.schedule == ''? this.setState({technicianNull: true}):this.setState({technicianNull: false}); 
    this.state.filterData == ''? this.setState({dateNull: true}):this.setState({dateNull: false}); 
    this.state.tempTime == '' ? this.setState({timeNull: true}):this.setState({timeNull: false}); 
    this.state.appointment.contactNumber == ''? this.setState({contactNumNull: true}):this.setState({contactNumNull: false});

    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/create-appointment`,{
      method: "POST",
      body: JSON.stringify(this.state.appointment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onCustomerChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        customer: event.target.value,
      },
      customerNull: false,
    }));
  }

  onServiceChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        service: event.target.value,
      },
      serviceNull: false,
    }));
  }

  onContactNumChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        contactNumber: event.target.value,
      },
      contactNumNull: false
    }));
  }

  onSpecialRequestChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        specialRequest: event.target.value,
      }
    }));
  }

  onDateChange(event){
    var pureDate = (event.target.value).split("-");
    var searchDate = pureDate[1] + "/" + pureDate[2] +"/" + pureDate[0];
    console.log(searchDate);
    fetch(`${process.env.REACT_APP_API_URL}/workSchedule?date=${searchDate}`)
    .then(response => response.json())  
    .then((data)=>{
      console.log(data);
      this.setState({
        filterData: data,
        dateNull: false,
        timeNull: true,
      })
    });
  }

  onTimeChange(event){
    var technicianData = [];
    this.state.filterData.forEach(function(data){
          if(data.time._id == event.target.value)
          {
            technicianData = technicianData.concat(data);
          }
    })
    this.setState({
      technician: technicianData,
      timeNull: false,
      tempTime: event.target.value,
  }); 
  }

  onScheduleChange(event){
    console.log("id: "+event.target.value);
    this.setState({
      appointment:{
        ...this.state.appointment,
        schedule: event.target.value,
      },
      technicianNull: false,
    });
  }

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
  };

  componentDidMount() {
    document.title = 'Create New Appointment | Body Contouring Clinic';

    fetch(`${process.env.REACT_APP_API_URL}/services`)
    .then(response => response.json())  
    .then((data)=>{
      this.setState({
        services: data
      })
    });

    fetch(`${process.env.REACT_APP_API_URL}/customers`)
    .then(response => response.json())  
    .then((data)=>{
      this.setState({
        customers: data,
      })
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
            <Container>
              <Row>
                <Col></Col>
                <Col xs={8}>
                  <Form onSubmit={this.handlSubmit.bind(this)} method="POST">
                    <Form.Group as={Row} controlId="customer">
                      <Form.Label column sm="4">
                        Customer Name:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control inline as="select" onChange={this.onCustomerChange.bind(this)} isInvalid={this.state.customerNull}>
                          <option value="">-- select customer --</option>
                          {this.state.customers.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.account == null ? "" : result.account.firstName} {result.account == null ? "" : result.account.lastName}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Customer is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="service">
                      <Form.Label column sm="4">
                        Services:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control inline as="select" onChange={this.onServiceChange.bind(this)} isInvalid={this.state.serviceNull}>
                          <option value="">-- select service --</option>
                          {this.state.services.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.name}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Service is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Date:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control type="date" onChange={this.onDateChange.bind(this)} isInvalid={this.state.dateNull}/>
                        <Form.Control.Feedback type="invalid">Date is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Time:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control inline as="select" onChange={this.onTimeChange.bind(this)} isInvalid={this.state.timeNull}>
                          <option value="">-- select time --</option>
                          {this.state.filterData.map((result)=>(
                              // eslint-disable-next-line react/jsx-key
                              <option value={result.time._id}>{result.time.time}</option>
                          ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">Time is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="schedule">
                      <Form.Label column sm="4">
                        Technician:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="select" onChange={this.onScheduleChange.bind(this)} isInvalid={this.state.technicianNull}>
                          <option value="">-- select technician --</option>
                          {this.state.technician.map((result)=>(
                            <option value={result._id}>{result.staff.account.firstName} {result.staff.account.lastName}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Technician is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Contact Number:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control placeholder="647-596-9521" onChange={this.onContactNumChange.bind(this)} isInvalid={this.state.contactNumNull}/>
                        <Form.Control.Feedback type="invalid">Contact Number is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Special Request:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="textarea" rows={3} onChange={this.onSpecialRequestChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <br/>
                    <Row>
                      <Col></Col>
                      <Col md="auto">
                        <Button variant="outline-secondary" href="/Appointment/Admin">
                          Cancel
                        </Button>
                      </Col>
                      <Button variant="outline-info" type="submit">
                        Save
                      </Button>
                    </Row>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
            </Container>
    );
  }
}

export default CreateAppointmentAdmin;
