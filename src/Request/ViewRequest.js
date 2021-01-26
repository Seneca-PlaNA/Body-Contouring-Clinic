import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar/SideBar';
import Button from 'react-bootstrap/Button';
import PopUp from '../PopUp';

class ViewRequest extends React.Component {

    constructor() {
        super();
        this.state = {
          show: false,
          items : [
                {url:'/Request/', title: 'View All Request'},
                {url:'/Request/Create', title: 'Create Request'},
                {url:'/Request/', title: 'FAQ'},
            ],
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteReq = this.deleteReq.bind(this);
      }

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
      };
    
    deleteReq = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <div class="row">
                <SideBar items={this.state.items}/>
                <div class="col-md-7">
                    <h1 className="PageTitle">Request Detail</h1>
                    <div className="contents">
                        <p>
                            <label>Q: How can I join VIP member ship program?   2021/01/11</label><br/>
                            <div>
                                Hello!<br/>
                                How .... <br/>
                            </div>
                        </p>
                        <br/>
                        <p>
                            <label>A: RE: How can I join VIP member ship program?   2021/01/12</label><br/>
                            <div>
                                Good Morning!<br/>
                                How .... <br/>
                            </div>
                        </p>
                        <Button variant="light" href="/Request/Edit" size="lg">EDIT</Button>
                        <Button variant="light" href="/Request/" size="lg">BACK TO LIST</Button>
                        <Button variant="light" href="/Request/" onClick={this.showModal} size="lg">DELETE</Button>
                        <PopUp show={this.state.show}  handleClose={this.hideModal} handleDelete={this.deleteReq} text={this.state.children} btn1='CANCEL' btn2='DELETE'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewRequest;