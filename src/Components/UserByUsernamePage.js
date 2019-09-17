import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'

class UserByUsernamePage extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.fetchUser()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.fetchUser()
    }
  }

  fetchUser = () => {
    const { username } = this.props
    api.getUserByUsername(username).then((user) => {
      this.setState({ user })
    })
  }

  render() {
    const { user } = this.state;
    const { username, avatar_url, name } = user;

    return (
      <div>
        <p>INTRODUCING {name}</p>
        <img src={avatar_url} alt={name} />
        <p>Username: {username}</p>
        <Link to={`/articles/user/${username}`}><p>For all articles by {name}</p></Link>
      </div>
    );
  }
}

export default UserByUsernamePage;