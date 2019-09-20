import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, slugs, isLoadingTopics, topicsError }) => {
  const chosenTopic = topics.filter(topicObj => { return topicObj.slug === topic })
  return (
    <ArticleList topic={topic} description={chosenTopic[0].description} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
  );
};

export default ArticlesByTopic;