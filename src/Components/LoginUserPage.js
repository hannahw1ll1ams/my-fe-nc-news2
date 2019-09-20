import React from 'react';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';


const LoginUserPage = ({ users, updateLoggedInUser, isLoadingUsers, usersError }) => {
  return (
    <div>
      {isLoadingUsers ? <p>Loading Users...</p> : usersError ? <ErrorPage error={usersError} /> :
        <ul>
          {users.map(user => {
            return <li key={user.name}>
              <p>{user.username}</p>
              <Link to='/articles'>
                <img src={user.avatar_url} alt={user.name} onClick={() => updateLoggedInUser(user.username)} />
              </Link>
            </li>
          })}
        </ul>}
    </div>
  );
};

export default LoginUserPage;
