import React from 'react';
import TopicsList from './TopicsList';
import { Link } from '@reach/router';

const SideBar = ({ updateTopicDescription, loggedInUser }) => {
  return (
    <div className='sideBar'>
      {!loggedInUser ? <p>Who are you?</p> : <p>Logged in as {loggedInUser}</p>}
      <Link to='/'><p>Change User</p></Link>
      <h1 className='title'>NC</h1>
      <TopicsList updateTopicDescription={updateTopicDescription} />
    </div>
  );
};

export default SideBar;