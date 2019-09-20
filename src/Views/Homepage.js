import React from 'react';
import LoginUserPage from '../Components/LoginUserPage';
import ViewToggler from '../Components/ViewToggler';

const Homepage = ({ updateLoggedInUser, users, postNewUser }) => {
  return (
    <div>
      <LoginUserPage updateLoggedInUser={updateLoggedInUser} users={users} />
      <ViewToggler item='user' postNewUser={postNewUser} />
    </div>
  );
};

export default Homepage;