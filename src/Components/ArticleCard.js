import React from 'react';
// import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';
import moment from 'moment'
// import { navigate } from '@reach/router'


const ArticleCard = ({ title, topic, author, created_at, article_id, votes, comment_count, loggedInUser, deleteElementByClick, commentCountChange, selectedArticleID }) => {


  return (
    <li className={`singleArticle-${topic}`}>
      {/* <p>Posted by <Link to={`/users/${author}`}>{author}</Link> {moment(created_at).fromNow()}</p>
      <Link to={`${article_id}`}><h2>{title}</h2></Link> */}
      <p>Posted by {author} {moment(created_at).fromNow()}</p>
      <h2>{title}</h2>
      {/* <p>{topic}</p> */}
      {loggedInUser === author && <DeleteButton item="article" id={article_id} deleteElementByClick={deleteElementByClick} />}
      <p>{votes} votes</p>
      {selectedArticleID === article_id ? <p>Comments: {commentCountChange ? Number(comment_count) + Number(commentCountChange) : comment_count}</p> : <p> {comment_count} comments {votes} votes</p>}

      {/* <p>Read <Link to={`/articles/user/${author}`}>more articles</Link> by <Link to={`/users/${author}`}>{author}</Link></p> */}
    </li>
  );
};

export default ArticleCard;
