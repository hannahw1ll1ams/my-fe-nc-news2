import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, topicDescription, loggedInUser }) => {
  return (
    <ArticleList topic={topic} topicDescription={topicDescription} loggedInUser={loggedInUser} />
  );
};

export default ArticlesByTopic;