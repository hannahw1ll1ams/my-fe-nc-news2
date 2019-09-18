import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'

class AllUsersPage extends Component {
  state = {
    users: []
  }
  fetchAllUsers = () => {
    api.getAllUsers().then((users) => {
      this.setState({ users })
    })
  }
  componentDidMount() {
    this.fetchAllUsers()
  }
  componentDidUpdate() {
    this.fetchAllUsers()
  }
  render() {
    const { users } = this.state;
    const { updateLoggedInUser } = this.props;

    return (
      <div>
        <ul>
          {users.map(user => {
            return <li key={user.name}>
              <p>{user.username}</p>
              <Link to='/articles'>
                <img src={user.avatar_url} alt={user.name} onClick={() => updateLoggedInUser(user.username)} />
              </Link>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default AllUsersPage;