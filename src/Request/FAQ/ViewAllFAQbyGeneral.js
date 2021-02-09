import React from 'react';
import '../../App.css';
import SideBar from '../../SideBar/SideBar';
import ViewAllFAQ from './ViewAllFAQ';

class ViewAllFAQbyGeneral extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      items: [
        { url: '/Request/', title: 'View All Request' },
        { url: '/Request/Create', title: 'Create Request' },
        { url: '/Request/FAQ', title: 'FAQ' },
      ],
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <SideBar items={this.state.items} />
        <div className="col-md-8" style={{ 'margin-left': '80px' }}>
          <h2 className="PageTitle">FAQ</h2>
          <br />
          <ViewAllFAQ />
        </div>
      </div>
    );
  }
}

export default ViewAllFAQbyGeneral;
