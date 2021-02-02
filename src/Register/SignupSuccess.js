import React, { Component } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgName from '../resources/verified_user.png';

class SignupSuccess extends Component {
    render() {
        return (
          <div>
          <div class="container">
            <h1>Thanks for Signing Up!</h1>
            <br></br>
            <img src = {imgName}
               width='230'
               height='230' 
               style={{'margin-left':'10px'}}         
             />

            <p> Email verified.
                You can now sign in with your new account.
            </p>
            </div>

            <button type="button" class="btn btn-outline-info" style={{'margin-left':'15px'}}>
              <a class="login" href="./Login">Go to Log In! ❯</a>
              </button>  
              <br/><br/>
              <br/><br/>
              <br/><br/>  
          </div>
        );
    }
} 
export default SignupSuccess;