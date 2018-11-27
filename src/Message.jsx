import React, {Component} from 'react';

export default class Message extends Component{
  render(){
    const notification = this.props.notification;
    return(  
      <div className="message system">
        {notification}
      </div>
    )
  }
}

