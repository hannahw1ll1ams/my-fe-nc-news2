import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ title, topic, author, created_at, article_id, votes, comment_count }) => {
  return (
    <li className={`singleArticle-${topic}`}>
      <Link to={`${article_id}`}><p>{title}</p></Link>
      <p>{topic}</p>
      <p>Created at: {created_at} </p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <p>Read <Link to={`/articles/user/${author}`}>more articles</Link> by <Link to={`/users/${author}`}>{author}</Link></p>
    </li>
  );
};

export default ArticleCard;