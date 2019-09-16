import React from 'react';
import UserByUsernamePage from '../Components/UserByUsernamePage';

const UserByUsername = ({ username }) => {
  return (
    <div>
      <UserByUsernamePage username={username} />
    </div>
  );
};

export default UserByUsername;