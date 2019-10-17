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
              return <li className='user' key={user.name}>
                <Link className='link' to='/articles'>
                  <img className='userImg' src={user.avatar_url} alt={user.name} onClick={() => updateLoggedInUser(user.username)} />
                  <div className='names'>
                    <h1 className='userName' onClick={() => updateLoggedInUser(user.username)} >{user.username}</h1>
                    <br />
                    <h1 className='name' onClick={() => updateLoggedInUser(user.name)} >{user.name}</h1>
                  </div>
                </Link>
              </li>
            })}
          </ul>
        </>}
    </>
  );
};

export default LoginUserPage;
