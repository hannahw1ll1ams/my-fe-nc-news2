import React from 'react';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router'

const PractiseUserPage = ({ username, loggedInUser, users, isLoadingUsers, usersError }) => {

  let chosenUser = users.filter(users => users.username === username)
  console.log(chosenUser)
  return (
    <div>
      <p>INTRODUCING {chosenUser.name}</p>
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

export default PractiseUserPage;