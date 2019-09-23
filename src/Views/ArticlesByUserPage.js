import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByUserPage = ({ username, loggedInUser, updateTopics, slugs }) => {
  return (
    <>
      {loggedInUser ?
        <ArticleList author={username} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} /> : <p> ----You need to LOG IN</p>
      }
      /</>
  );
};

export default ArticlesByUserPage;