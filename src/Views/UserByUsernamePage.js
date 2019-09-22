import React from 'react';
import AllUsersPage from '../Components/AllUsersPage';

const UserByUsernamePage = ({ username, loggedInUser, users, usersError, isLoadingUsers }) => {
  return (
    <>
      {loggedInUser &&
        <AllUsersPage username={username} loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
      }
    </>
  );
};

export default UserByUsernamePage;