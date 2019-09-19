import React from 'react';
import UserByUsernamePage from '../Components/UserByUsernamePage';

const UserByUsername = ({ username, loggedInUser, users }) => {
  return (
    <UserByUsernamePage username={username} loggedInUser={loggedInUser} users={users} />
  );
};

export default UserByUsername;