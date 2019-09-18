import React from 'react';
import TopicsList from './TopicsList'

const SideBar = ({ updateTopicDescription }) => {
  return (
    <div className='sideBar'>
      <h1 className='title'>NC</h1>
      <TopicsList updateTopicDescription={updateTopicDescription} />
    </div>
  );
};

export default SideBar;