import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, Form, FormControl, Grid, Row, Col, Button } from 'react-bootstrap'
import { Link, Switch, Redirect, Route, BrowserRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'  // temporary, we can create our css later
import AppointmentHome from './Appointment/AppointmentHome'
import ServiceHome from './Service/ServiceHome'
import RequestHome from './Request/RequestHome'
import CreateRequest from './Request/CreateRequest';
import CustomerHome from './Customer/CustomerHome'
import CustomerProfile from './Customer/CustomerProfile'
import CustomerEdit from './Customer/CustomerProfileEdit'
import ViewRequest from './Request/ViewRequest';
import AnswerRequest from './Request/Admin/AnswerRequest';
import EditRequest from './Request/EditRequest';
import Login from './Register/login';
import SignUp from './Register/signUp';
import CreateAppointment from './Appointment/CreateAppointment';
import Appointments from './Appointment/Appointments';
import Appointment from './Appointment/Appointment';


class RouterConfig extends React.Component {


    render() {
        return (
            <BrowserRouter>
            <Switch>
              <Route exact path='/' render={() =>
                  <header className="App-basic">
                      <p>
                        Body Contouring Clinic <br/>
                        React : true <br/>
                      </p>
                </header>} />
              {/* Appointment URL */}
              <Route exact path='/Appointment' render={() => <AppointmentHome />} />
              <Route exact path='/Appointment/Appointments' render={() => <Appointments />} />
              <Route exact path='/Appointment/Create' render={() => <CreateAppointment />} />
              <Route exact path='/Appointment/Appointment' render={() => <Appointment />} />

              <Route exact path='/Service' render={() => <ServiceHome />} />
              {/* Request URL */}
              <Route exact path='/Request' render={() => <RequestHome />} />
              <Route exact path='/Request/Create' render={() => <CreateRequest />} />
              <Route exact path='/Request/Detail' render={() => <ViewRequest />} />
              <Route exact path='/Request/Answer' render={() => <AnswerRequest />} />
              <Route exact path='/Request/Edit' render={() => <EditRequest />} />

              {/* Customer URL */}
              <Route exact path='/Customer' render={() => <CustomerHome />} />
              <Route exact path='/Customer/Profile' render={() => <CustomerProfile />} />
              <Route exact path='/Customer/Edit' render={() => <CustomerEdit />} />
              
              
              {/* Register URL */}
              <Route exact path='/Register/Login' render={() => <Login />} />
              <Route exact path='/Register/SignUp' render={() => <SignUp />} />

            </Switch>
          </BrowserRouter>
        );
    }
}

export default RouterConfig;