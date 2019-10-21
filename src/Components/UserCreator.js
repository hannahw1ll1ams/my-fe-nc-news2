import React, { Component } from 'react';
import '../css/homepage.css'

class UserCreator extends Component {
  state = {
    username: '',
    avatar_url: '',
    name: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewUser } = this.props
    const { username, avatar_url, name } = this.state;
    postNewUser(username, avatar_url, name)
    this.setState({
      username: '',
      avatar_url: '',
      name: ''
    })
  }

  render() {
    const { username, avatar_url, name } = this.state;
    return (
      <form className='userCreatorForm' onSubmit={this.handleSubmit}>
        <label >
          <input className='username' name='username' placeholder='username' onChange={this.handleChange} required value={username} />
          <br />
          <input className='avatarurl' name='avatar_url' placeholder='avatar_url' onChange={this.handleChange} required value={avatar_url} />
          <br />

          <input className='name' name='name' placeholder='name' onChange={this.handleChange} required value={name} />
        </label>
        <br />

        <button className='submitUserButton'>ADD!</button>
      </form>
    );
  }
}

export default UserCreator;