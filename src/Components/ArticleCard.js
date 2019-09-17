import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ title, topic, author, created_at }) => {
  return (
    <li className={`singleArticle-${topic}`}>
      <p>{title}</p>
      <p>Created at: {created_at} </p>
      <p>{topic}</p>
      <p>Read more articles by <Link to={`/users/${author}`}>{author}</Link></p>
    </li>
  );
};

export default ArticleCard;