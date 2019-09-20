import React from 'react';
import UserByUsernamePage from '../Components/UserByUsernamePage';

const UserByUsername = ({ username, loggedInUser, users, usersError, isLoadingUsers }) => {
  return (
    <UserByUsernamePage username={username} loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
  );
};

export default UserByUsername;