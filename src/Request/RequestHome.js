import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class RequestHome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App-basic">
                <h1>This is Request Home page </h1>
                
                <hr /><hr />
                <h2>Hello, user.fullName</h2>
            </div>
        );
    }
}

export default RequestHome;