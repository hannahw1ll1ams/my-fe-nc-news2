import React from 'react';
import ArticleList from '../Components/ArticleList';

const AllArticles = ({ loggedInUser, updateTopics, slugs, isLoadingTopics, topicsError }) => {
  console.log(loggedInUser, '<---in all articles')
  return (
    <>
      {loggedInUser &&
        <ArticleList loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
      }
    </>
  );
};

export default AllArticles;