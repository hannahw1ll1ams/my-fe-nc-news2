import React from 'react';
import { Link } from '@reach/router'


const LoginUserPage = ({ users, updateLoggedInUser }) => {
  return (
    <ul>
      {users.map(user => {
        return <li key={user.name}>
          <p>{user.username}</p>
          <Link to='/articles'>
            <img src={user.avatar_url} alt={user.name} onClick={() => updateLoggedInUser(user.username)} />
          </Link>
        </li>
      })}
    </ul>
  );
};

export default LoginUserPage;
