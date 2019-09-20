import React, { Component } from 'react';

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
      <form onSubmit={this.handleSubmit}>
        <label>
          <input name='username' placeholder='username' onChange={this.handleChange} required value={username} />
          <input name='avatar_url' placeholder='avatar_url' onChange={this.handleChange} required value={avatar_url} />
          <input name='name' placeholder='name' onChange={this.handleChange} required value={name} />
        </label>
        <button>ADD!</button>
      </form>
    );
  }
}

export default UserCreator;