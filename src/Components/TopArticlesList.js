import React from 'react';

const TopArticlesList = ({ topic, topFive }) => {
  return (
    <div className='topArticles'>
      <h3>TOP FIVE {topic} ARTICLES</h3>
      <ol>
        {topFive.map(item => {
          return <li key={item} className='topArticleItem'>{item}</li>
        })}
      </ol>

    </div>
  );
};

export default TopArticlesList;