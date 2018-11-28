import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(){
    super();
    this.socket = new WebSocket("ws://"+window.location.hostname+":3001");

    this.state= {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      notification: '',
      usersOnline: 0,
    };
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.addEventListener('open', function (event) {
      console.log("Connected to Server"); 
    });

    this.socket.onmessage = (event) => {
      let eventParse = JSON.parse(event.data) 

      switch(eventParse.type) {
        case "incomingMessage":
          // handle incoming message
          console.log("eventParse: " + eventParse.colours)
          const newMsg = {
                id: eventParse.id,
                username: eventParse.username,
                content: eventParse.content,
                colours: eventParse.colours
              }    
              let oldMessage = this.state.messages;
              let newMessages = [...oldMessage, newMsg];
              this.setState({
                messages : newMessages, 
              });             
          break;

        case "incomingNotification":
          // handle incoming notification  
          this.setState({
            notification : eventParse.content
          })
          break;

        case "incomingUsers":
          this.setState({
            usersOnline : eventParse.numberOfUsers,
            //colours : eventParse.colours
          });    
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  addMessage = (msg) => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: msg,
    }
    //Send message to server
    this.socket.send(JSON.stringify(newMessage));

  };

  changeUsername = (usr) => {
    if(this.state.currentUser.name !== usr){
      const newUsername = {
        type: "postNotification",
        content: `${this.state.currentUser.name} has changed their name to ${usr}`,
        username: usr,
      }
      this.setState({
        currentUser:{
          name:usr,
      }});
      this.socket.send(JSON.stringify(newUsername));
    }
  }

  render() {
    return (
       <div>   
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
           <span className="users">{this.state.usersOnline} Users Online</span>
           </nav>
          <MessageList messages={this.state.messages} notification={this.state.notification}/>
          <ChatBar user={this.changeUsername} messages={this.addMessage}/>
          {/* <Message notification={this.state.notification}/> */}
       </div>
    );
  }
}
export default App;
