import React from 'react';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';
import '../css/homepage.css'

const LoginUserPage = ({ users, updateLoggedInUser, isLoadingUsers, usersError, loggedInUser }) => {
  return (
    <>
      {isLoadingUsers ? <p>Loading Users...</p> : usersError ? <ErrorPage error={usersError} /> :
        <>
          <ul className='userList'>
            {users.map(user => {
              return <Link onClick={() => updateLoggedInUser(user.username)} className='link' to='/articles'>
                <li className='user' key={user.name}>
                  <img className='singleUserImg' src={user.avatar_url} alt={user.name} />
                  <div className='names'>
                    <h3 className='userName' >{user.username}</h3>
                  </div>
                </li>
              </Link>
            })}
          </ul>
        </>}
    </>
  );
};

export default LoginUserPage;
