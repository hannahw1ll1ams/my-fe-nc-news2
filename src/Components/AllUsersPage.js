import React from 'react';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router'
import '../css/allUsers.css'
import LoadingPage from './LoadingPage';


const AllUsersPage = ({ username, loggedInUser, users, isLoadingUsers, usersError }) => {

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  }

  const filtered = users.filter(user => user.username !== username)
  const singleChosenUser = users.filter(user => user.username === username)

  if (singleChosenUser.length === 0) return <ErrorPage error={{ status: 404, msg: 'User Not Found' }} />

  if (isLoadingUsers) return <LoadingPage />
  if (usersError) return <ErrorPage error={usersError} />

  return (
    <div className='allUsersPage'>
      <div className='loggedInUser'>
        {username === loggedInUser ? <h2 className='introText'>YOU ARE</h2> : <h2 className='introText'>INTRODUCING</h2>}
        <div className='selectedUserCard'>
          <div>
            <h1> {singleChosenUser[0].name}</h1>
            <h2 className='userName'> {singleChosenUser[0].username}</h2>
          </div>
          <img className='userImg' src={singleChosenUser[0].avatar_url} alt={singleChosenUser[0].name} />
          <Link className='allLinks' to={`/articles/user/${singleChosenUser[0].username}`}>
            <h3>For articles by {singleChosenUser[0].name}</h3></Link>
        </div>
      </div>
      <div className='otherUsers'>
        <h2 className='allUsersTitle'>OTHER USERS</h2>
        <ul className='otherUsersList'>
          {filtered.map(user => {
            return <Link key={user.name} className='links' to={`/users/${user.username}`} onClick={handleClick}>
              <li className='singleUser'>
                <img className='usersImg' src={user.avatar_url} alt={user.name} />
                <h2>{user.username}</h2>
              </li>
            </Link>

          })
          }
        </ul>
      </div>
    </div>
  );
};

export default AllUsersPage;