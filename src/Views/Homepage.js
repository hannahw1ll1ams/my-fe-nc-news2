import React from 'react';
import LoginUserPage from '../Components/LoginUserPage';
import ViewToggler from '../Components/ViewToggler';

const Homepage = ({ updateLoggedInUser, users, postNewUser, usersError, isLoadingUsers }) => {
  return (
    <div>
      <LoginUserPage updateLoggedInUser={updateLoggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
      <ViewToggler item='user' postNewUser={postNewUser} />
    </div>
  );
};

export default Homepage;