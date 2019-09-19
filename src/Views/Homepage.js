import React from 'react';
import LoginUserPage from '../Components/LoginUserPage';

const Homepage = ({ updateLoggedInUser, users }) => {
  return (
    <LoginUserPage updateLoggedInUser={updateLoggedInUser} users={users} />
  );
};

export default Homepage;