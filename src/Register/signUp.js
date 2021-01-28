import React, { Component } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
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
            <fieldset > 
                
  <legend >Radios</legend>
            <h3>Sign-up Form</h3>
          
            <form onSubmit={this.handleSubmit}>
            
            <div class="columcol-sm-2 col-form-label"visible="true">
           
           
        

                <div class="form-group row">
                    <label for="id" class="col-sm-2 col-form-label">User ID:</label>
                    <div class="col-sm-10">
                        <input 
                            type="text" 
                            name="id"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Enter user ID"
                            id="id" />
                            <div className="text-danger">{this.state.errors.id}</div>
                    </div>
                </div>
       

            <div class="form-group row">
                        <label for="password" class="col-sm-2 col-form-label">Password:</label>
                        <div class="col-sm-10">
                            <input 
                            type="password" 
                            name="password"
                            class="form-control" 
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter password"
                            id="password" />
                                <div className="text-danger">{this.state.errors.password}</div>
                        </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-sm-2 col-form-label">Confirm Password:</label>
                <div class="col-sm-10">
                    <input
                    type="password" 
                    name="confirmPassword"
                    class="form-control" 
                    value={this.state.input.name}
                    onChange={this.handleChange}
                    placeholder="Re-enter the password"
                    id="confirmPassword" />
                      <div className="text-danger">{this.state.errors.confirmPassword}</div>
                </div>
            </div>

            <div class="form-group row">
                <label for="firstName" class="col-sm-2 col-form-label">First name:</label>
                 <div class="col-sm-10">
                    <input
                    type="text"
                    name="firstName" 
                    value={this.state.input.name}
                    onChange={this.handleChange}              
                    class="form-control mb-2 mr-sm-2" 
                    placeholder="Enter first name"
                    id="firstName" />
                         <div className="text-danger">{this.state.errors.firstName}</div>
                </div>
            </div>

            <div class="form-group row">
                <label for="lastName" class="col-sm-2 col-form-label"> Last name:</label>
                 <div class="col-sm-10">
                    <input 
                    type="text"
                    name="lastName" 
                    value={this.state.input.name}
                    onChange={this.handleChange}              
                    class="form-control mb-2 mr-sm-2" 
                    placeholder="Enter last name"
                    id="lastName" />
                         <div className="text-danger">{this.state.errors.lastName}</div>
                 </div>
            </div>

            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email address:</label>
                 <div class="col-sm-10">
                    <input 
                    type="email"
                    name="email" 
                    value={this.state.input.name}
                    onChange={this.handleChange}    
                    class="form-control mb-2 mr-sm-2"
                    placeholder="Enter email address"
                    id="email" />
                        <div className="text-danger">{this.state.errors.email}</div>
                 </div>
            </div>


            <div class="form-group row">
                <label for = "contactNumber" class="col-sm-2 col-form-label">Contact Number:</label>
                 <div class="col-sm-10">
                    <input 
                    type="tel" 
                    name="contactNumber"
                    value={this.state.input.name}
                    onChange={this.handleChange}  
                    class="form-control mb-2 mr-sm-2" 
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="Enter contact number (ex. 123-456-7890)"
                    id="contactNumber" />
                      <div className="text-danger">{this.state.errors.contactNumber}</div>
                 </div>
             </div>
             </div>
   

      {/*}      <div>
                <button onClick={this.goBack} class="btn btn-primary">Previous</button>   
                
                <button onClick={this.go} input type ="submit" class="btn btn-primary" >Next</button>
            </div>   
             */} 
<ul class="pagination">
  <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  <li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>

            <p className="forgot-password text-right">
                Already registered? <a href="#">sign in</a>
            </p>
       

        
        </form>
      
        
        </fieldset>
      
    );

    
}
}

export default SignUp;