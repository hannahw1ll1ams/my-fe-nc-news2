import React from 'react';
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';

const ArticleCard = ({ title, topic, author, created_at, article_id, votes, comment_count, loggedInUser, deleteElementByClick, commentCountChange, selectedArticleID }) => {
  return (
    <li className={`singleArticle-${topic}`}>
      <Link to={`${article_id}`}><p>{title}</p></Link>
      <p>{topic}</p>
      <p>Created at: {created_at} </p>
      {loggedInUser === author && <DeleteButton item="article" id={article_id} deleteElementByClick={deleteElementByClick} />}
      <p>Votes: {votes}</p>
      {selectedArticleID === article_id ? <p>Comments: {commentCountChange ? Number(comment_count) + Number(commentCountChange) : comment_count}</p> : <p> Comments: {comment_count}</p>}

      <p>Read <Link to={`/articles/user/${author}`}>more articles</Link> by <Link to={`/users/${author}`}>{author}</Link></p>
    </li>
  );
};

export default ArticleCard;
