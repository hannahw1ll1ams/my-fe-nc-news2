import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByUserPage = ({ username, loggedInUser, updateTopics, slugs }) => {
  return (
    <ArticleList author={username} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} />
  );
};

export default ArticlesByUserPage;