import React from 'react';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router'
import '../css/allUsers.css'

const UsersPage = ({ username, loggedInUser, users, isLoadingUsers, usersError }) => {
  let chosenUser = users.find(users => users.username === username)
  return (
    <>
      {isLoadingUsers ? <p>LOADING USERS...</p> : usersError ? <ErrorPage error={usersError} /> :
        <>
          {username === loggedInUser ? <p>YOU ARE {chosenUser.username}</p> : <p>INTRODUCING {chosenUser.name}</p>}
          <div className='loggedInUser'>
            <img className='usersImg' src={chosenUser.avatar_url} alt={chosenUser.name} />
            <p className='userName'>Username: {chosenUser.username}</p>
          </div>
          <Link to={`/articles/user/${chosenUser.username}`}>
            <p>For more articles by {chosenUser.name}</p></Link>

          <h1>OTHER USERS:</h1>
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
          </ul></>
      }
    </>
  );
};

export default UsersPage;