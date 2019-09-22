import React from 'react';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';
import '../css/homepage.css'

const LoginUserPage = ({ users, updateLoggedInUser, isLoadingUsers, usersError }) => {
  return (
    <>
      {isLoadingUsers ? <p>Loading Users...</p> : usersError ? <ErrorPage error={usersError} /> :
        <ul className='userList'>
          {users.map(user => {
            return <li className='user' key={user.name}>
              <Link className='link' to='/articles'>
                <img className='userImg' src={user.avatar_url} alt={user.name} onClick={() => updateLoggedInUser(user.username)} />
                <p className='userName'>{user.username}</p>
              </Link>
            </li>
          })}
        </ul>}
    </>
  );
};

export default LoginUserPage;
