import React from 'react';
import TopicsList from './TopicsList';
import { Link } from '@reach/router';
import '../css/sideBar.css'

const SideBar = ({ loggedInUser, updateLoggedInUser, slugs, isLoadingTopics, topicsError, loggedInUserImage }) => {
  return (
    <div className="sideBar">
      <div className='logIn'>
        {!loggedInUser ? <Link className='allLinks' to='/'><p className='change'>Choose User</p></Link> : <p className="loggedInAs" > <Link className="logged" to={`/users/${loggedInUser}`}>{loggedInUser}
          {/* <img src={loggedInUserImage} alt={loggedInUser} /> */}
        </Link></p>}
        {loggedInUser && <Link to='/' className='allLinks'><p className='change' onClick={() => updateLoggedInUser(null)}>Log Out</p></Link>}
      </div>
      <div className='titles'>
        <h1 className='titleNC'>NC</h1>

        <div className='usersAndNewsList'>
          {loggedInUser && <Link className='allLinks' to={`/users/${loggedInUser}`}><h2 className='Users'>USERS</h2></Link>}
          {loggedInUser && <Link className='allLinks' to='/articles'><h2 className='titleNEWS'>NEWS</h2></Link>}
        </div>
      </div>
      <div className='articleTopicsList'>
        {loggedInUser && <TopicsList slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />}
      </div>

    </div>
  );
};

export default SideBar;