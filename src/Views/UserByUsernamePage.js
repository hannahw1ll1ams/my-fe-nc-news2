import React from 'react';
import AllUsersPage from '../Components/AllUsersPage';
import '../css/allUsers.css'

const UserByUsernamePage = ({ username, loggedInUser, users, usersError, isLoadingUsers }) => {
  return (
    <>
      {loggedInUser ?
        <AllUsersPage username={username} loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
        : <p> ----You need to LOG IN</p>
      }
    </>
  );
};

export default UserByUsernamePage;