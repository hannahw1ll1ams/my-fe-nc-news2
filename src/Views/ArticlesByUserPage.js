import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByUserPage = ({ username, loggedInUser }) => {
  return (
    <ArticleList author={username} loggedInUser={loggedInUser} />
  );
};

export default ArticlesByUserPage;