import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ title, topic, author }) => {
  return (
    <li className={`singleArticle-${topic}`}>
      <p>{title}</p>
      <p>{topic}</p>
      <p><Link to='/users/:username'>{author}</Link></p>
    </li>
  );
};

export default ArticleCard;