import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ title, topic, author, created_at, article_id }) => {
  return (
    <li className={`singleArticle-${topic}`}>
      <Link to={`${article_id}`}><p>{title}</p></Link>
      <p>Created at: {created_at} </p>
      <p>{topic}</p>
      <p>Read <Link to={`/articles/user/${author}`}>more articles</Link> by <Link to={`/users/${author}`}>{author}</Link></p>
    </li>
  );
};

export default ArticleCard;