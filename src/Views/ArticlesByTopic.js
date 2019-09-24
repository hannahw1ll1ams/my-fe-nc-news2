import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, isLoadingTopics, topicsError }) => {
  const chosenTopic = topics.find(topicObj => topicObj.slug === topic)
  return (
    <>
      {loggedInUser ?
        <ArticleList topic={topic} description={chosenTopic.description} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={topics.map(topic => topic.slug)} isLoadingTopics={isLoadingTopics} topicsError={topicsError} /> : <p> ----You need to LOG IN</p>
      }</>
  );
};

export default ArticlesByTopic;