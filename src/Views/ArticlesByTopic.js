import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, topicDescription }) => {
  return (
    <ArticleList topic={topic} topicDescription={topicDescription} />
  );
};

export default ArticlesByTopic;