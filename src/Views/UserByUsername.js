import React from 'react';
import UserByUsernamePage from '../Components/UserByUsernamePage';

const UserByUsername = ({ username, loggedInUser }) => {
  return (
    <UserByUsernamePage username={username} loggedInUser={loggedInUser} />
  );
};

export default UserByUsername;