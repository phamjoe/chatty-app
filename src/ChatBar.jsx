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
    if(evt.keyCode === 13){
      this.props.messages(this.state.inputField);
      this.setState({
        inputField: ''
      });
    }
  };

   nameSubmitHandler = (evt) => {
    evt.preventDefault();
    if(evt.keyCode === 13){
      this.props.user(this.state.nameField);
      this.setState({
        nameField: this.state.nameField
      });
    }
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
            <input className="chatbar-username" placeholder="Your Name (Optional)" 
                  value={this.state.nameField}
                  onChange={this.handleNameChange} 
                  onKeyUp={this.nameSubmitHandler}
                  />

            <input className="chatbar-message" placeholder="Type a message and hit ENTER"                
                  value={this.state.inputField}
                  onChange={this.handleContentChange} 
                  onKeyUp={this.submitHandler}
                  />
      </footer>

    );
  }
}
