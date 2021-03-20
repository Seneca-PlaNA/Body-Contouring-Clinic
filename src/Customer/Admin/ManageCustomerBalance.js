import React from 'react';
import SideBar from '../../SideBar/SideBar';
import '../../App.css';
import searchIcon from '../../resources/searchIcon.png';
import { Form, Row, Col, Container, Table, Button } from 'react-bootstrap';

class ManageCustomerBalance extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            items: [{ url: `/Customer/Admin/${this.props.id}`, title: 'Home' }],
            children: 'Customer',
            auth: 'Admin',
            balances: [],
            balanceHistory: [],
            balance: [],
            profile:{},
            services: [],
        };
        
    }
    getCustomerProfile(id) {
        return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}/account/${id}`)
            .then((response) => response.json())
            .then((data) => {
            resolve(data);
            });
        
        });
    }


    getBalance(id){
        return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}/balance-history/${id}`)
            .then((response) => response.json())
            .then((data) => {
            resolve(data);
        });

    });
    }


    componentDidMount() {
        this.getCustomerProfile(this.state._id).then((data) => {
        this.setState({
            profile: data,
        });
        console.log(this.state.profile.balanceHistory);
        this.getBalance(this.state.profile.balanceHistory._id).then((data) =>{
            this.setState({
            balance: data.balances,
            services: data.balances.services,
            });
        });

    });

    }
    
    render() {
        const pagination = {
        color: '#B58970',
        textAlign: 'center',
        marginLeft: '50px',
        };
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <SideBar items={this.state.items} />
                <div className="col-md-6" style={{ 'margin-left': '80px' }}>
                <h2 className="PageTitle">Hi, {this.state.profile.firstName + ' ' + this.state.profile.lastName}</h2>
                <hr />
                <br />
                <h4>Balance Information</h4>
                <Container class="col-md-6">
                    <Form style={{ fontSize: '20px', marginLeft: '80px', textAlign: 'left' }}>
                    <Form.Group as={Row}>
                        <Form.Label column md={3}>
                        Current Balance:
                        </Form.Label>
                        <Col sm={2}>
                        {this.state.balance.map((result) => (
                        <Form.Label column md={0} key={result._id}>
                            ${result.balanceAccount}
                        </Form.Label>
                        ))}
                        </Col>

                    </Form.Group>
                    </Form>
                </Container>
                <br />
                <h4>Balance History</h4>
                <Container class="col-md-6">
                <Form inline>
                    <Form.Control as="select">
                        <option value="30">Last 30 Days</option>
                        <option value="60">Last 60 Days</option>
                        <option value="90">Last 90 Days</option>
                        <option value="120">Last 120 Days</option>
                    </Form.Control>
                    <Form.Control type="date" style={{ 'margin-left': '30px' }} />
                    <Form.Control type="text" placeholder="Search.." style={{ 'margin-left': '30px' }} />
                    <Button type="submit" variant="outline-*" style={{ background: 'none', 'margin-left': '5px' }} >
                        <img src={searchIcon} alt="Search" />
                    </Button>
                    </Form>
                    <Table>
                    <Row>
                        <Col md={12}>      
                        <table>
                            <tr>
                            <th>Date</th>
                            <th>Therapy Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            </tr>
                            {this.state.balance.map((result) => (
                            <tr key={result._id}>
                            <td>{result.date}</td>
                            <td>{result.services[0].serviceCategory.name}</td>
                            <td>{result.services[0].name}</td>
                            <td>${result.services[0].price}</td>
                            <td>
                                <a href={`/Customer/BalanceDetail/${result._id}`}>details</a>
                            </td>
                            </tr>
                        ))}
                        </table>
                        <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}></Col>
                        <Col>
                        <Button variant="outline-info" href="/Customer/Admin/Profile">
                            Back
                        </Button>
                        &nbsp;
                        <Button variant="outline-info" href="/Customer/Admin/Account/Edit">
                            Create/Edit Account
                        </Button>
                        </Col>
                    </Row>
                    <span style={pagination}>
                        <a href="#"> &laquo; </a>
                        <a href="#"> 1 </a>
                        <a className="active" href="#">
                        {' '}
                        2{' '}
                        </a>
                        <a href="#"> 3 </a>
                        <a href="#"> 4 </a>
                        <a href="#"> 5 </a>
                        <a href="#"> 6 </a>
                        <a href="#"> &raquo; </a>
                    </span>
                    </Table>
                </Container>
                <br />
                <br />
                </div>
            </div>
        );
    }
}

export default ManageCustomerBalance;
