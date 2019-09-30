import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, isLoadingTopics, topicsError }) => {
  const chosenTopic = topics.find(topicObj => topicObj.slug === topic)
  console.log(topics)
  console.log(topic)

  return (
    <>
      {
        !loggedInUser ? <p>----You need to Log in</p> : isLoadingTopics ? <p>Loading...</p> : <ArticleList topic={topic} description={chosenTopic.description} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={topics.map(topic => topic.slug)} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
      }
    </>
  );
};

export default ArticlesByTopic;