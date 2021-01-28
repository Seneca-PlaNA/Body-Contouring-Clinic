import React, { Component } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <form>
            <h3>Log in</h3>

            <div className="form-group row">
                <label for ="id" class="col-sm-2 col-form-label">ID</label>
                <div class="col-sm-10">
                <input type="text" className="form-control" placeholder="Enter ID" />
                </div>
            </div>

            <div className="form-group row">
                <label for ="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input type="password" className="form-control" placeholder="Enter password" />
                </div>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
            
            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="new-account text-left">
                    No account?<a href="#"> Sign up </a>
                </p>  
                <p className="forgot-id text-right">
                    Forgot <a href="#">user ? </a>
                </p>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password? </a>
                </p>

        </form>
        

        
    );
    
        }
}
 
 export default Login;