import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ title, topic, author }) => {
  return (
    <li className={`singleArticle-${topic}`}>
      <p>{title}</p>
      <p>{topic}</p>
      <p>Read more articles by <Link to={`/users/${author}`}>{author}</Link></p>
    </li>
  );
};

export default ArticleCard;