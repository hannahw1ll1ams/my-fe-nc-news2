import React from 'react';
import LoginUserPage from '../Components/LoginUserPage';
import ViewToggler from '../Components/ViewToggler';
import '../css/homepage.css'

const Homepage = ({ updateLoggedInUser, users, postNewUser, usersError, isLoadingUsers }) => {
  return (
    <div className='homepage'>
      <ViewToggler item='user' postNewUser={postNewUser} />
      <LoginUserPage updateLoggedInUser={updateLoggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
    </div>
  );
};

export default Homepage;