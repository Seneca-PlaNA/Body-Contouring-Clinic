import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import ListAllOffer from '../ListAllOffer';

class VIPHomebyAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/VIP/Admin', title: 'Special Offer' },
        { url: '/VIP/Admin/Manage', title: 'Offer Manage' },
        { url: '/VIP/Admin/Manage/Create', title: 'Create Offer' },
      ],
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">Monthly Special Offers</h2>
          <br />
          <div className="contents">
            <br />
            <ListAllOffer />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default VIPHomebyAdmin;
