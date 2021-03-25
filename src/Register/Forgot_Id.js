import React, { Component } from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';

class Forgot_Id extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        email: String,
      },
      isFind: false,
    };
  }
  onEmailCheck(event) {
    this.setState(() => ({
      account: {
        ...this.state.account,
        email: event.target.value,
      },
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/forgot`, this.state.account)
      .then((res) => {
        console.log(res.data._id);
        localStorage.setItem('_id', res.data._id); //temporary login method
        if (res.data.loginSuccess) {
          this.setState({ isFind: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.isFind) {
      return (
        <Redirect
          push
          to={{
            pathname: '/Register/FindID',
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-md-8" style={{ 'margin-left': '350px' }}>
          <h2 className="PageTitle" style={{ 'margin-left': '380px' }}>
            Forgot ID
          </h2>
          <br />
          <Container style={{ 'margin-left': '90px' }}>
            <Form onSubmit={this.handleSubmit.bind(this)} method="POST">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Email:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    onChange={this.onEmailCheck.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group style={{ marginLeft: '350px' }} as={Row}>
                <Row>
                  <Col>
                    <Button variant="outline-secondary" href="./login">
                      Cancel
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Button variant="outline-info" type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Container>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

// import React, { Component } from 'react';
// import '../App.css';
// import { Form, Row, Col } from 'react-bootstrap';

// class Forgot_Id_Pw extends Component {
//   componentDidMount() {
//     console.log(this.props);
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       input: {},
//       errors: {},
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     let input = this.state.input;
//     input[event.target.name] = event.target.value;

//     this.setState({
//       input,
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     if (this.validate()) {
//       console.log(this.state);

//       let input = {};
//       input['id'] = '';
//       input['email'] = '';

//       this.setState({ input: input });
//     }
//   }

//   validate() {
//     let input = this.state.input;
//     let errors = {};
//     //let isValid = true;

//     if (!input['id']) {
//       //isValid = false;
//       errors['id'] = 'Please enter your user id.';
//     }

//     if (!input['email']) {
//       //isValid = false;
//       errors['email'] = 'Please enter your email address.';
//     }
//   }

//   reset() {
//     alert('Password is sent to your email');
//   }

//   render() {
//     return (
//       <div className="row">
//         <div className="col-md-8" style={{ 'margin-left': '470px' }}>
//           <div className="card" style={{ width: '37rem' }}>
//             <div className="card-header">
//               <h4 className="PageTitle" style={{ 'margin-left': '10px' }}>
//                 Forgot User Id?{' '}
//               </h4>
//             </div>
//             <div className="card-body">
//               <Form>
//                 <Form.Group as={Row}>
//                   <Form.Label column sm={2}>
//                     Email:{' '}
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Control type="email"></Form.Control>
//                   </Col>
//                 </Form.Group>
//               </Form>
//               <div className="col-md-4" style={{ marginLeft: '420px' }}>
//                 <button className="col-md-4 btn btn-outline-info" type="submit">
//                   Find
//                 </button>
//                 <br></br>
//               </div>
//             </div>
//           </div>

//           <div className="card" style={{ width: '37rem' }}>
//             <div className="card-header">
//               <h4 className="PageTitle" style={{ 'margin-left': '10px' }}>
//                 Forgot Password?
//               </h4>
//             </div>
//             <div className="card-body">
//               <Form>
//                 <Form.Group as={Row}>
//                   <Form.Label column sm={2}>
//                     Email:{' '}
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Control type="email"></Form.Control>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group as={Row}>
//                   <Form.Label column sm={2}>
//                     ID:
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Control type="text"></Form.Control>
//                   </Col>
//                 </Form.Group>
//               </Form>
//               <div className="col-md-4" style={{ marginLeft: '420px' }}>
//                 <button className="col-md-4 btn btn-outline-info" type="submit">
//                   Find
//                 </button>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />
//         </div>
//       </div>
//     );
//   }
// }

export default Forgot_Id;
