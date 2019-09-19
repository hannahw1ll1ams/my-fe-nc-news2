import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, slugs }) => {
  const chosenTopic = topics.filter(topicObj => { return topicObj.slug === topic })
  return (
    <ArticleList topic={topic} description={chosenTopic[0].description} topics={topics} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} />
  );
};

export default ArticlesByTopic;