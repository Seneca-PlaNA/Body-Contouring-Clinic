import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CreateNewBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            items: [{ url: `/Customer/Admin/${this.props.id}`, title: 'Home' }],
           // _id: localStorage.getItem('_id'),
            profile: [],
            balanceHistory: {},

                balances: {
                balanceAccount: Number,
                date: Date,
            }, 
            completed: false,
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/create-balance`, {
            method: 'POST',
            body: JSON.stringify(this.state.profile),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then(() => this.setState({ completed: true }))
        .catch((err) => console.log(err));
    }

    onBalanceAccountChange(event){
        this.setState(() => ({
            balances: {
                ...this.state./* balanceHistory. */balances,
                balanceAccount: event.target.value,
            }
        }))
        console.log(this.state.profile.balanceHistory)
    }

    onDateChange(event) {
        this.setState(() => ({
            balances: {
            ...this.state./* balanceHistory. */balances,
            date: event.target.value,
          },
        }));
        console.log(this.state.profile.balanceHistory)
      }

/*     componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/balance-history/${this.props.id}`)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              profile: data,
              date: data.balance.date,
            })
        });
    } */

    render() {
        if (this.state.completed) {
            return (
            <Redirect
                push
                to={{
                pathname: `/Customer/Admin/profile/${this.props.id}`,
                }}
            />
            );
        }
        return(
            <div className="row">
            <div className="col-md-1"></div>
            <SideBar items={this.state.items} />
            <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Create Balance </h2>
            <br />
            <Container>
                <Form onSubmit={this.handleSubmit.bind(this)} method="POST">
                <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Amount:
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    placeholder="+/- 00.00"
                    onChange={this.onBalanceAccountChange.bind(this)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} inline>
                <Form.Label column sm={2}>
                  Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    controlId="date"
                    type="date"
                    placeholder="Balance created Date"
                    onChange={this.onDateChange.bind(this)}
                  />
                </Col>
                </Form.Group>
                </Form>
            </Container>
            <Container>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={1}>
                    <Button variant="outline-secondary" href="/Customer/Admin/CustomerProfileAdmin">
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={1}>
                    <Button type="submit" variant="outline-info">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Container>
            <br />
            </div>
        </div>
        )
        
  }
}
export default CreateNewBalance;