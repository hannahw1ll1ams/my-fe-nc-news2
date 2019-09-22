import React from 'react';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router'
import '../css/allUsers.css'

const UsersPage = ({ username, loggedInUser, users, isLoadingUsers, usersError }) => {
  let chosenUser = users.filter(users => users.username === username)
  return (
    <>
      {isLoadingUsers ? <p>LOADING USERS...</p> : usersError ? <ErrorPage error={usersError} /> :
        <>
          <div className='loggedInUser'>{username === loggedInUser ? <p>YOU ARE {chosenUser[0].username}</p> : <p>INTRODUCING {chosenUser[0].name}</p>}
            <img className='usersImg' src={chosenUser[0].avatar_url} alt={chosenUser[0].name} />
            <p className='userName'>Username: {chosenUser[0].username}</p>
            <Link to={`/articles/user/${chosenUser[0].username}`}><p>For more articles by {chosenUser[0].name}</p></Link>
            <h1>OTHER USERS:</h1>
          </div>
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