import React, { Component } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap';

class Forgot_Id_Pw extends Component {
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
            input["email"] = "";
    
            this.setState({input:input});
    
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
    
          if (!input["email"]) {
                isValid = false;
                errors["email"] = "Please enter your email address.";
              }
            }

    reset() {
        alert('Password is sent to your email');
    }

    render() {
        return (
        <div className="row">
            <div class="col-md-8" style={{'margin-left':'470px'}}>
                <div class="card" style={{'width': '37rem'}} >
                    <div class="card-header" >  
                <h4 className="PageTitle" style={{'margin-left': '10px'}}>Forgot User Id? </h4>
                </div>
                <div class="card-body">
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Email: </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="email"></Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                    <div class="col-md-4" style={{'marginLeft' : '420px'}}>
                                <button class="col-md-4" type="submit" className="btn btn-outline-info">Find</button>
                                <br></br>  
                                </div>
                </div>  
                </div>              
               
                <div class="card" style={{'width': '37rem'}}>
                    <div class="card-header">
                        <h4 className="PageTitle" style={{'margin-left': '10px'}}>Forgot Password?</h4>
                        </div>
                        <div class="card-body">
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>Email: </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="email"></Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>ID:</Form.Label>
                                    <Col sm={8}>
                                    <Form.Control type="text"></Form.Control>
                                    </Col>
                                </Form.Group>
                            </Form>
                    <div class="col-md-4" style={{'marginLeft' : '420px'}}>
                                <button class="col-md-4" type="submit" className="btn btn-outline-info">Find</button>
                                </div>
                                
                                </div>
                </div><br/><br/><br/>
            </div>
        </div>


        )
    }
}


export default Forgot_Id_Pw;