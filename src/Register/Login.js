import React, { Component } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Container } from 'react-bootstrap';

class Login extends Component {
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

        this.setState({input:input});

        alert('You are logged in!');

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

      if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }
        }

    render() {
        return (
            <div className="row">
                <div class="col-md-8" style={{'margin-left':'350px'}}>
                <h2 className="PageTitle" style={{'margin-left': '380px'}}>Log In</h2><br/>
                <Container style={{'margin-left': '90px'}}>
                    <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>ID:</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="text" placeholder="Enter ID"></Form.Control>
                        </Col>
                    </Form.Group>   
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password:</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="password" placeholder="Enter Password"></Form.Control>
                        </Col>
                    </Form.Group>  
                         
                    </Form>
                    </Container>

                <div class style={{marginRight:"40px"}}>
                    <div class ="custom-control custom-checkbox" style={{'marginRight' : '110px'}}>
                            <input type="checkbox" className="custom-control-input" id="check1" />
                            <label className="custom-control-label" for="check1">Remember me</label>
                            <span style={{'marginLeft': '45px'}}> No account?<a href="./TermsAndConditions"> Sign up </a></span>
                        </div>
                 </div>
                    
                        <div class="col-md-4" style={{'marginLeft' : '260px'}}><br/>
                    <button class="col-md-4" type="submit" className="btn btn-outline-info btn-block">Sign in</button>
                    <p className="Forgot_idpw">
                        Forgot your <a href="./Forgot_Id_Pw">user id</a>
                         / <a href="./Forgot_Id_Pw">password</a>?
                         </p>
                </div>
                <br/><br/> <br/><br/>
                    </div>
                    <br/><br/>
        </div>
        );
    }
}
export default Login;