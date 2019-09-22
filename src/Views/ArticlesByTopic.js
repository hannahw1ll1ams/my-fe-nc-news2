import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, isLoadingTopics, topicsError }) => {
  const chosenTopic = topics.filter(topicObj => { return topicObj.slug === topic })
  return (
    <>
      {loggedInUser &&
        <ArticleList topic={topic} description={chosenTopic[0].description} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={topics.map(topic => topic.slug)} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
      }</>
  );
};

export default ArticlesByTopic;