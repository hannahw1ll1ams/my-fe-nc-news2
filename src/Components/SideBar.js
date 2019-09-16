import React from 'react';
import TopicsList from './TopicsList'

const SideBar = () => {
  return (
    <div className='sideBar'>
      <h1 className='title'>NC</h1>
      <TopicsList />
    </div>
  );
};

export default SideBar;