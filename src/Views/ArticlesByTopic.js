import React from 'react';
import ArticleList from '../Components/ArticleList'

const ArticlesByTopic = ({ topic, loggedInUser, topics, updateTopics, isLoadingTopics, topicsError }) => {
  let chosenTopic = topics.find(topicObj => topicObj.slug === topic);
  let slugs = topics.map(topic => topic.slug);
  return (
    <>
      {
        !loggedInUser ? <p>----You need to Log in</p> : isLoadingTopics ? <p>Loading...</p> : <ArticleList topic={topic} chosenTopic={chosenTopic} loggedInUser={loggedInUser} updateTopics={updateTopics} slugs={slugs} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
      }
    </>
  );
};

export default ArticlesByTopic;