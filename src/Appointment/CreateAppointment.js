import React from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CreateAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveModal: false,
      savedBackLink: '/Appointment/Appointment',
      button: 'Back To Appointment',
      title: 'Appointment Saved!',

      completed: false,
      _id: localStorage.getItem('_id'),
      appointment: {
        customer: String,
        contactNumber: '',
        specialRequest: String,
        service: '',
        schedule: '',
        confirmation: 'false',
      },
      services: [],
      customer: {},
      filterData: [],
      technician:[],
      tempTime: '',
      serviceNull: false,
      timeNull: false,
      dateNull: false,
      technicianNull: false,
      contactNumNull: false,
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
  };

  handlSubmit(event) {
    event.preventDefault();

    this.state.appointment.service == ''? this.setState({serviceNull: true}):this.setState({serviceNull: false}); 
    this.state.appointment.schedule == ''? this.setState({technicianNull: true}):this.setState({technicianNull: false}); 
    this.state.filterData == ''? this.setState({dateNull: true}):this.setState({dateNull: false}); 
    this.state.tempTime == '' ? this.setState({timeNull: true}):this.setState({timeNull: false}); 
    this.state.appointment.contactNumber == ''? this.setState({contactNumNull: true}):this.setState({contactNumNull: false});

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

  onServiceChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        customer: this.state.customer._id,
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

  getService(){
    fetch(`${process.env.REACT_APP_API_URL}/services`)
    .then(response => response.json())  
    .then((data)=>{
      this.setState({
        services: data
      })
    });
  }
  componentDidMount() {
    document.title = 'Create New Appointment | Body Contouring Clinic';

    fetch(`${process.env.REACT_APP_API_URL}/customer?account=${this.state._id}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        customer: data,
      });
      this.getService();
    });

  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: `/Appointment/Appointments`
      }}/>
    }
    return (
            <Container>
              <Row>
                <Col></Col>
                <Col xs={8}>
                  <Form onSubmit={this.handlSubmit.bind(this)}>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Service(s):
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control inline as="select" onChange={this.onServiceChange.bind(this)} isInvalid={this.state.serviceNull}>
                        <option>-- select service --</option>
                        {this.state.services.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option key={result._id} value={result._id}>{result.name}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Service is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Date
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control type="date" onChange={this.onDateChange.bind(this)} isInvalid={this.state.dateNull}/>
                        <Form.Control.Feedback type="invalid">Date is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Time
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
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Technician:
                      </Form.Label>
                      <Col sm="8">
                      <Form.Control as="select" onChange={this.onScheduleChange.bind(this)} isInvalid={this.state.technicianNull}>
                          <option value="">-- select technician --</option>
                          {this.state.technician.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
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
                        <Form.Control placeholder="647-596-9521" value={this.state.appointment.contactNumber} onChange={this.onContactNumChange.bind(this)} isInvalid={this.state.contactNumNull}/>
                        <Form.Control.Feedback type="invalid">Contact Number is required</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Special Request:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="textarea" rows={3} placeholder="Vanilla essential oil" value={this.state.appointment.specialRequest} onChange={this.onSpecialRequestChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <Row>
                      <Col></Col>
                      <Col md="auto">
                        <Button variant="outline-secondary" href="/Appointment/">
                          Cancel
                        </Button>
                      </Col>
                      <Button action type="submit" variant="outline-info">
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

export default CreateAppointment;
