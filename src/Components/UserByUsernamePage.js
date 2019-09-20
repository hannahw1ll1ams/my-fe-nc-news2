import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'

class UserByUsernamePage extends Component {
  state = {
    user: null,
    isLoading: true,
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
      this.setState({ user, isLoading: false }, () => {
      })
    })
  }

  render() {
    const { loggedInUser, users } = this.props;
    const { user, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>

    const { username, avatar_url, name } = user;

    return (
      <div>
        {this.props.username === loggedInUser && <p>This is you!</p>}
        <p>INTRODUCING {name}</p>
        <img src={avatar_url} alt={name} />
        <p>Username: {username}</p>
        <Link to={`/articles/user/${username}`}><p>For more articles by {name}</p></Link>
        <h1>OTHER USERS:</h1>
        {users.map(user => {
          return <li key={user.name}>
            <Link to={`/users/${user.username}`}>
              <img src={user.avatar_url} alt={user.name} />
              <p>{user.username}</p>
            </Link>
          </li>
        })}
      </div>
    );
  }
}

export default UserByUsernamePage;