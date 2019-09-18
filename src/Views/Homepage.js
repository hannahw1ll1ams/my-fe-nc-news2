import React from 'react';
import AllUsersPage from '../Components/AllUsersPage';

const Homepage = ({ updateLoggedInUser }) => {
  return (
    <AllUsersPage updateLoggedInUser={updateLoggedInUser} />
  );
};

export default Homepage;