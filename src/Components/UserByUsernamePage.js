import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';

class UserByUsernamePage extends Component {
  state = {
    user: null,
    isLoading: true,
    error: null
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
      .catch(error => {
        this.setState({
          error: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoading: false
        })
      })
  }

  render() {
    const { loggedInUser, users, usersError, isLoadingUsers } = this.props;
    const { user, isLoading, error } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorPage error={error} />
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