import React from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import SideBar from '../SideBar/SideBar';
import styles from '../app.module.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class EditAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Appointments', title: 'View All Appointments' },
        { url: '/Appointment/Create', title: 'Create Appointment' },
      ],
      saveModal: false,
      title: 'Appointment saved!',
      savedBackLink: '/Appointment/Appointment',
      button: 'Back To Appointment',
      appointment: [],
      customer: [],
      schedule: [],
      time: [],
      date: [],
      service: [],
      staff: [],
      completed: false,
      allServices: [],
      allTechnicians: [],
      filterData: [],
      technician:[],
      printDate: String,
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

  onContactNumChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        contactNumber: event.target.value,
      }
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

  onServiceChange(event) {
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        service: event.target.value,
      }
    }));
  }

  onDateChange(event){
    this.setState({
      printDate: event.target.value,
    });

    var pureDate = (event.target.value).split("-");
    var searchDate = pureDate[1] + "/" + pureDate[2] +"/" + pureDate[0];
    console.log(searchDate);
    fetch(`${process.env.REACT_APP_API_URL}/workSchedule?date=${searchDate}`)
    .then(response => response.json())  
    .then((data)=>{
      console.log(data);
      this.setState({
        filterData: data,
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
  }); 
  }

  onScheduleChange(event){
    console.log("id: "+event.target.value);
    this.setState({
      appointment:{
        ...this.state.appointment,
        schedule: event.target.value,
      }
    });
  }

  componentDidMount() {
    document.title = 'Edit Appointment | Body Contouring Clinic';
    fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`)
    .then(response => response.json())
    .then((data) => {
      var pDate = (data.schedule.date.date).split("/");
      var result = pDate[2] + "-" + pDate[0] + "-" + pDate[1];
      
      this.setState({
        appointment: data,
        customer: data.customer.account,
        schedule: data.schedule,
        time: data.schedule.time,
        date: data.schedule.date,
        staff: data.schedule.staff,
        service: data.service,
        printDate: result,
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
        pathname: `/Appointment/Appointment/${this.props.id}`
      }}/>
    }
    return (
      <>
        <br />
        <br />
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-6">
            <h2 className={styles.appointmentTitle}>Edit Appointment</h2>
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
                        <Form.Control inline as="select" value={this.state.service._id} onChange={this.onServiceChange.bind(this)}>
                        {this.state.allServices.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option key={result._id} value={result._id}>{result.name}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Date
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control type="date" value={this.state.printDate} onChange={this.onDateChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Time
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control inline as="select" onChange={this.onTimeChange.bind(this)}>
                          <option value="">-- select time --</option>
                          {this.state.filterData.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result.time._id}>{result.time.time}</option>
                          ))}
                          </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Technician:
                      </Form.Label>
                      <Col sm="8">
                      <Form.Control as="select" onChange={this.onScheduleChange.bind(this)}>
                          <option value="">-- select technician --</option>
                          {this.state.technician.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.staff.account.firstName} {result.staff.account.lastName}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Contact Number:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control placeholder="647-596-9521" value={this.state.appointment.contactNumber} onChange={this.onContactNumChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
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
                        <Button variant="outline-secondary" href="/Appointment/Appointments">
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
          </div>
        </div>
      </>
    );
  }
}

EditAppointment.propTypes = {
  id : PropTypes.string.isRequired
}

export default EditAppointment;
