import React, { Component } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

 class SignUp extends Component {
    componentDidMount(){
        console.log(this.props);
      }

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {}
          };
           
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

      handleChange(event)  {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
      }
         
      handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            console.log(this.state);
      
            let input = {};
            input["id"] = "";
            input["password"] = "";
            input["confirmPassword"] = "";
            input["firstName"] = "";
            input["lastName"] = "";
            input["email"] = "";
            input["contactNumber"] = "";
            this.setState({input:input});

            alert('Sign-up Form is submited');

        }
      }
      
      validate(){
          let input = this.state.input;
          let errors = {};
          let isValid = true;
      
 
          if (!input["id"]) {
            isValid = false;
            errors["id"] = "Please enter your user id.";
          }

          if (typeof input["id"] !== "undefined") {
            var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/)
            if (!pattern.test(input["id"])) {
                isValid = false;
                errors["id"] = "Please enter valid user ID. User Id need at least one letter, one number with minimum 8 characters.";
              }
            } 
 
          if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }

          if (typeof input["password"] !== "undefined") {
            var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/)
            if (!pattern.test(input["id"])) {
                isValid = false;
                errors["password"] = "Please enter valid user ID. User Id need at least one letter, one number with minimum 12 characters.";
              }
            } 
      
          if (!input["confirmPassword"]) {
            isValid = false;
            errors["confirmPassword"] = "Please enter your confirm password.";
          }
      
          if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
              
            if (input["password"] != input["confirm_password"]) {
              isValid = false;
              errors["password"] = "Passwords don't match.";
            }
          } 

          if (!input["firstName"]) {
            isValid = false;
            errors["firstName"] = "Please enter your first name.";
          }
          if (typeof input["firstName"] !== "undefined") {
            var pattern = new RegExp(/[a-zA-Z]/)
            if (!pattern.test(input["firstName"])) {
                isValid = false;
                errors["firstName"] = "Please enter valid email address.";
              }
            }          

          if (!input["lastName"]) {
            isValid = false;
            errors["lastName"] = "Please enter your last name.";
          }
          if (typeof input["lastName"] !== "undefined") {
            var pattern = new RegExp(/[a-zA-Z]/)
            if (!pattern.test(input["lastName"])) {
                isValid = false;
                errors["lastName"] = "Please enter valid last name.";
              }
            } 
      
          if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
          }
      
          if (typeof input["email"] !== "undefined") {
              
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
              isValid = false;
              errors["email"] = "Please enter valid email address.";
            }
          }

          if (!input["contactNumber"]) {
            isValid = false;
            errors["contactNumber"] = "Please enter your contact number.";
          }
      
          if (typeof input["contactNumber"] !== "undefined") {
              
            var pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            if (!pattern.test(input["contactNumber"])) {
                isValid = false;
                errors["contactNumber"] = "Please enter valid contact number.";
              }
            }

          this.setState({
            errors: errors
          });
      
          return isValid;
      }



    render() {
        return (
        <div className="row">
          <div class="col-md-8" style={{'margin-left':'290px'}}>
          <h2 className="PageTitle" style={{'margin-left': '390px'}}>Sign-up Form</h2><br/>
          <Container style={{'margin-left': '190px'}}>
            <Form>
            <Form.Group as={Row}>
                        <Form.Label column sm={2}>User ID:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="text" 
                            name="id"
                            minLength='2'
                            maxLength='25'
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter user ID"
                            id="id" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.id}</div>
                    </Form.Group>            
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="password" 
                            name="password"
                            minLength='8'
                            maxLength='45'
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter Password"
                            id="password" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.password}</div>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="password" 
                            name="confirmPassword"
                            minLength='8'
                            maxLength='45'
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Re-enter the Password"
                            id="confirmPassword" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.confimrPassword}</div>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>First Name:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="text" 
                            name="firstName"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter First name"
                            id="firstName" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.firstName}</div>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Last Name:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="text" 
                            name="lastName"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter Last name"
                            id="lastName" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.lastName}</div>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email address:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="email" 
                            name="email"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter E-mail address"
                            id="email" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.email}</div>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Contact Number:</Form.Label>
                        <Col sm={4}>
                            <Form.Control                             
                            type="tel" 
                            name="contactNumber"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter Contact number"
                            id="contactNumber" 
                            required></Form.Control>
                        </Col>
                        <div className="text-danger">{this.state.errors.contactNumber}</div>
                    </Form.Group>
              </Form>
              </Container>

              <span style={{'marginLeft': '180px'}}>Already registered?  
                <a href="./Login">  sign in</a> 
                </span>
                <br></br><br></br>
                 <div style={{marginLeft:"10px"}}>
                  <div class="pagination" style={{'marginright': '130px'}}>
                    <a class="page-link btn btn-outline-info" href="./TermsAndConditions">❮ Previous</a>
                    <a style={{marginLeft:"720px"}}></a>
                    <a class="page-link btn btn-outline-info" color="btn-outline-info" href="./CheckConfirmEmail">Next ❯</a>
                  </div>
                </div>

    
                
                <br/><br/>
                <br/><br/>
                <br/>
                </div>
                </div>
        )
       
}
}

export default SignUp;