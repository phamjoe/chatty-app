import React, {Component} from 'react';


export default class ChatBar extends Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      inputField: ''
    };
  }
   submitHandler(evt){
    evt.preventDefault();

    this.props.messages(this.state.inputField);
    this.setState({
      inputField: ''
    });
  }

   handleChange (event){
    this.setState({
      inputField: event.target.value
    });
  };
  render(){
    return(
      <footer className="chatbar">
              <form onSubmit={this.submitHandler}>

          <input className="chatbar-username" placeholder="Your Name (Optional)" 
                 defaultValue={this.props.user}
                />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"                
                value={this.state.inputField}
                onChange={this.handleChange} />
          <input type="submit" />
                        </form>

      </footer>
    );
  }
}
