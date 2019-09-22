import React from 'react';
import AllUsersPage from '../Components/AllUsersPage';
import '../css/allUsers.css'

const UserByUsernamePage = ({ username, loggedInUser, users, usersError, isLoadingUsers }) => {
  return (
    <div className='allUsersPage'>
      {loggedInUser &&
        <AllUsersPage username={username} loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
      }
    </div>
  );
};

export default UserByUsernamePage;