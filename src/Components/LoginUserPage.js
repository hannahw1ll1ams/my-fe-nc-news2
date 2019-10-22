import React from 'react';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';
import '../css/homepage.css'
import LoadingPage from './LoadingPage'

const LoginUserPage = ({ users, updateLoggedInUser, isLoadingUsers, usersError, loggedInUser }) => {
  return (
    <>
      {isLoadingUsers ? <LoadingPage /> : usersError ? <ErrorPage error={usersError} /> :
        <>
          <ul className='userList'>
            {users.map(user => {
              return <Link key={user.name} onClick={() => updateLoggedInUser(user.username)} className='link' to='/articles'><li className='user' key={user.name}>
                <img className='singleUserImg' src={user.avatar_url} alt={user.name} />
                <div className='names'>
                  <h3 className='userName'>{user.username}</h3>
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
