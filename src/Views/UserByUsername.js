import React from 'react';
import UsersPage from '../Components/UsersPage';

const UserByUsername = ({ username, loggedInUser, users, usersError, isLoadingUsers }) => {
  return (
    <UsersPage username={username} loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
  );
};

export default UserByUsername;