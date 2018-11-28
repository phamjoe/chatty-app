import React, {Component} from 'react';


export default class ChatBar extends Component{
  constructor() {
    super();
    this.state = {
      nameField: '',
      inputField: ''
    };
  };

   submitHandler = (evt) =>{
    evt.preventDefault();
    this.props.messages(this.state.inputField);
    this.setState({
      inputField: ''
    });
  };

   nameSubmitHandler = (evt) => {
    evt.preventDefault();
    this.props.user(this.state.nameField);
    this.setState({
      nameField: this.state.nameField
    });
  };

   handleContentChange = (event) => {
    this.setState({
      inputField: event.target.value
    });
  };

  handleNameChange = (event) => {
    this.setState({
      nameField: event.target.value
    });
  };

  render(){
    return(

      <footer className="chatbar">
          <form onSubmit={this.nameSubmitHandler}>
            <input className="chatbar-username" placeholder="Your Name (Optional)" 
                  value={this.state.nameField}
                  onChange={this.handleNameChange} 
                  />
            <input hidden type="submit" />

          </form>

          <form onSubmit={this.submitHandler}>
            <input className="chatbar-message" placeholder="Type a message and hit ENTER"                
                  value={this.state.inputField}
                  onChange={this.handleContentChange} /><br/>
            <input hidden type="submit" />
          </form>
      </footer>

    );
  }
}
