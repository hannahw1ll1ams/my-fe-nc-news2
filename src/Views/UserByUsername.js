import React from 'react';
// import UserByUsernamePage from '../Components/UserByUsernamePage';
import PractiseUserPage from '../Components/PractiseUserPage';


const UserByUsername = ({ username, loggedInUser, users, usersError, isLoadingUsers }) => {
  return (
    <PractiseUserPage username={username} loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
  );
};

export default UserByUsername;