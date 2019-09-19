import React from 'react';
import ArticleList from '../Components/ArticleList';

const AllArticles = ({ loggedInUser, updateTopics, slugs }) => {
  return (
    <ArticleList loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} />
  );
};

export default AllArticles;