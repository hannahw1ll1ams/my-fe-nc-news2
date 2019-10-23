import React from 'react';
import TopicsList from './TopicsList';
import { Link } from '@reach/router';
import '../css/sideBar.css'

const SideBar = ({ loggedInUser, updateLoggedInUser, slugs, isLoadingTopics, topicsError, loggedInUserImage }) => {
  return (
    <div className="sideBar">
      <div className='logIn'>
        {!loggedInUser ? <p><Link to='/'>Choose User</Link></p> : <p className="loggedInAs" >Logged in as <br /> <Link className="logged" to={`/users/${loggedInUser}`}>{loggedInUser}
          {/* <img src={loggedInUserImage} alt={loggedInUser} /> */}
        </Link></p>}
        {loggedInUser && <Link to='/' className='allLinks'><p className='change' onClick={() => updateLoggedInUser(null)}>Log Out</p></Link>}
      </div>

      <h1 className='titleNC'>NC</h1>
      <div className='bottomList'>

        {loggedInUser && <h2 className='Users'><Link className='allLinks' to={`/users/${loggedInUser}`}>USERS</Link></h2>}
        {loggedInUser && <h2 className='titleNEWS'><Link className='allLinks' to='/articles'>NEWS</Link></h2>}
        {loggedInUser && <TopicsList slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />}
      </div>

    </div>
  );
};

export default SideBar;