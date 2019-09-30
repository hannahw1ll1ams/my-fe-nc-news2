import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, isLoadingTopics, topicsError }) => {
  return (
    <>
      {
        !loggedInUser ? <p>----You need to Log in</p> : isLoadingTopics ? <p>Loading...</p> : <ArticleList topic={topic} chosenTopic={topics.find(topicObj => topicObj.slug === topic)} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={topics.map(topic => topic.slug)} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
      }
    </>
  );
};

export default ArticlesByTopic;