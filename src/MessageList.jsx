import React , {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component{
  render(){
    const taskItems = this.props.messages.map (msg => (
      <div className="message" key={msg.id}>
        <span className="message-username">{msg.username}</span>
        <span className="message-content">{msg.content}</span>
      </div>

    ));
    return(
      <main className="messages">
          {taskItems}
        <Message/>
      </main>
    );
  }
}
