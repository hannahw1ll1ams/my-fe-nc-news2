import React from 'react';
import TopicsList from './TopicsList';
import { Link } from '@reach/router';

const SideBar = ({ loggedInUser, updateLoggedInUser, slugs, isLoadingTopics, topicsError }) => {
  return (
    <div className='sideBar'>
      {!loggedInUser ? <p>Who are you? <br /><Link to='/'>Choose User</Link></p> : <p>Logged in as <Link to={`/users/${loggedInUser}`}>{loggedInUser}</Link></p>}
      {loggedInUser && <Link to='/'><p onClick={() => updateLoggedInUser(null)}>Change User</p></Link>}
      <h1 className='title'>NC</h1>
      {loggedInUser && <TopicsList slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />}
      {loggedInUser && <p><Link to={`/users/${loggedInUser}`}>Users</Link></p>}
    </div>
  );
};

export default SideBar;