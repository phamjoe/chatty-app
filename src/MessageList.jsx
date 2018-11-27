import React , {Component} from 'react';

export default class MessageList extends Component{
  render(){
    const messageItems = this.props.messages.map (msg => (
      <div className="message" key={msg.id}>
        <span className="message-username">{msg.username}</span>
        <span className="message-content">{msg.content}</span>
      </div>

    ));
    return(
      <main className="messages">
          {messageItems}
      </main>
    );
  }
}
