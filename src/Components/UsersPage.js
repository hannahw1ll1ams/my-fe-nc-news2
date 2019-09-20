import React from 'react';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router'

const UsersPage = ({ username, loggedInUser, users, isLoadingUsers, usersError }) => {
  let chosenUser = users.filter(users => users.username === username)
  return (
    <div>
      {username === loggedInUser ? <p>YOU ARE {chosenUser[0].username}</p> : <p>INTRODUCING {chosenUser[0].name}</p>}
      <img src={chosenUser[0].avatar_url} alt={chosenUser[0].name} />
      <p>Username: {chosenUser[0].username}</p>
      <Link to={`/articles/user/${chosenUser[0].username}`}><p>For more articles by {chosenUser[0].name}</p></Link>
      <h1>OTHER USERS:</h1>
      {isLoadingUsers ? <p>Loading USERS...</p> : usersError ? <ErrorPage error={usersError} /> :
        users.map(user => {
          return <li key={user.name}>
            <Link to={`/users/${user.username}`}>
              <img src={user.avatar_url} alt={user.name} />
              <p>{user.username}</p>
            </Link>
          </li>
        })
      }
    </div>
  );
};

export default UsersPage;