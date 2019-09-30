import React from 'react';
import ArticleList from '../Components/ArticleList';

const AllArticles = ({ loggedInUser, updateTopics, slugs, isLoadingTopics, topicsError }) => {
  return (
    <>
      {loggedInUser ?
        <ArticleList loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} /> : <p> ----You need to LOG IN</p>
      }
    </>
  );
};

export default AllArticles;