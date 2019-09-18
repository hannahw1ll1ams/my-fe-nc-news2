import React from 'react';
import ArticleList from '../Components/ArticleList';

const AllArticles = ({ loggedInUser }) => {
  return (
    <ArticleList loggedInUser={loggedInUser} />
  );
};

export default AllArticles;