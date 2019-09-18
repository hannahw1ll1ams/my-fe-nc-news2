import React from 'react';
import TopicsList from './TopicsList';
import { Link } from '@reach/router';

const SideBar = ({ updateTopicDescription, loggedInUser, updateLoggedInUser }) => {
  return (
    <div className='sideBar'>
      {!loggedInUser ? <p>Who are you? <br /><Link to='/'>Choose User</Link></p> : <p>Logged in as {loggedInUser}</p>}
      {loggedInUser && <Link to='/'><p onClick={() => updateLoggedInUser(null)}>Change User</p></Link>}
      <h1 className='title'>NC</h1>
      <TopicsList updateTopicDescription={updateTopicDescription} />
    </div>
  );
};

export default SideBar;