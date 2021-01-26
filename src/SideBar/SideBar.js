import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

class SideBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          items: []
        }
      }

    render() {
        const {items = []} = this.props;
        return (
                <div className="col-md-2">
                    <ListGroup variant="flush">
                        {items.map(item => (
                            <ListGroup.Item variant="dark" href={item.url} action>{item.title}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
        );
    }
}

export default SideBar;