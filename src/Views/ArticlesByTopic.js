import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic }) => {
  return (
    <div>
      <ArticleList topic={topic} />
    </div>
  );
};

export default ArticlesByTopic;