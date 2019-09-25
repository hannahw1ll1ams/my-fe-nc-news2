import React from 'react';
import LoginUserPage from '../Components/LoginUserPage';
import ViewToggler from '../Components/ViewToggler';
import '../css/homepage.css'

const Homepage = ({ updateLoggedInUser, users, postNewUser, usersError, isLoadingUsers, loggedInUser }) => {
  return (
    <div className='homepage'>
      <ViewToggler item='user' postNewUser={postNewUser} />
      <LoginUserPage updateLoggedInUser={updateLoggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} loggedInUser={loggedInUser} />
    </div>
  );
};

export default Homepage;