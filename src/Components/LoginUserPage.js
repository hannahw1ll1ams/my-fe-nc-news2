import React from 'react';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';
import '../css/homepage.css'

const LoginUserPage = ({ users, updateLoggedInUser, isLoadingUsers, usersError, loggedInUser }) => {
  return (
    <>
      {isLoadingUsers ? <p>Loading Users...</p> : usersError ? <ErrorPage error={usersError} /> :
        <>
          {/* {loggedInUser ? <h2>Choose a different user</h2> : <h2>Who are you?</h2>} */}
          <ul className='userList'>
            {users.map(user => {
              return <li className='user' key={user.name}>
                <Link className='link' to='/articles'>
                  <img className='userImg' src={user.avatar_url} alt={user.name} onClick={() => updateLoggedInUser(user.username)} />
                  <p className='userName' onClick={() => updateLoggedInUser(user.username)} >{user.username}</p>
                </Link>
              </li>
            })}
          </ul>
        </>}
    </>
  );
};

export default LoginUserPage;
