import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic }) => {
  return (
    <ArticleList topic={topic} />
  );
};

export default ArticlesByTopic;