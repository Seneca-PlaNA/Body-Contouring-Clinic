import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class EditBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            items: [{ url: `/Customer/Admin/${this.props.id}`, title: 'Home' }],
            _id: localStorage.getItem('_id'),
            profile: [],
            balanceHistory: {},
             balance: {
                balanceAccount: Number,
                date: Date,
            },
            completed: false,
                
            };
            this.handleSubmit = this.handleSubmit.bind(this);
    }

}
export default EditBalance;