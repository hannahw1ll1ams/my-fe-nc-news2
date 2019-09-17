import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByUserPage = ({ username }) => {
  return (
    <ArticleList author={username} />
  );
};

export default ArticlesByUserPage;