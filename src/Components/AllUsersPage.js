import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router'
import '../css/allUsers.css'
import * as api from '../api'


class AllUsersPage extends Component {
  state = {
    chosenUser: null,
    isLoadingChosenUser: true,
    error: null
  }

  componentDidMount() {
    this.fetchUserByUsername()
  }

  componentDidUpdate(prevProps) {
    const { username } = this.props;
    if (prevProps.username !== username) {
      this.fetchUserByUsername()
    }
  }

  fetchUserByUsername = () => {
    const { username } = this.props;
    api.getUserByUsername(username).then((chosenUser) => {
      this.setState({ chosenUser, isLoadingChosenUser: false })
    })
      .catch(error => {
        const { data, status } = error.response;
        this.setState({
          error: {
            msg: data.msg,
            status: status
          }, isLoadingChosenUser: false
        })
      })
  }

  render() {
    const { chosenUser, isLoadingChosenUser, error } = this.state;
    const { username, loggedInUser, users, isLoadingUsers, usersError } = this.props;
    if (isLoadingChosenUser) return <p>Loading...</p>
    if (error) return <ErrorPage error={error} />
    if (isLoadingUsers) return <p>Loading...</p>
    if (usersError) return <ErrorPage error={usersError} />
    return (
      <div className='allUsersPage'>
        <div className='loggedInUser'>

          {username === loggedInUser ? <h1>YOU ARE {chosenUser.name}</h1> : <h1>INTRODUCING {chosenUser.name}</h1>}
          <img className='usersImg' src={chosenUser.avatar_url} alt={chosenUser.name} />
          <p className='userName'>Username: {chosenUser.username}</p>
          <Link to={`/articles/user/${chosenUser.username}`}>
            <p>For more articles by {chosenUser.name}</p></Link>
        </div>

        <h1>All USERS:</h1>
        <ul className='otherUsersList'>
          {users.map(user => {
            return <li key={user.name} className='singleUser'>
              <Link className='links' to={`/users/${user.username}`}>
                <img className='usersImg' src={user.avatar_url} alt={user.name} />
                <p>{user.username}</p>
              </Link>
            </li>
          })
          }
        </ul>
      </div>
    );
  }
}

export default AllUsersPage;