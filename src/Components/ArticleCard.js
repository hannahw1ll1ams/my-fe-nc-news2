import React from 'react';
// import { Link } from '@reach/router';
// import DeleteButton from './DeleteButton';
import moment from 'moment'


const ArticleCard = ({ title, topic, author, created_at, article_id, votes, comment_count, loggedInUser, deleteElementByClick, commentCountChange, selectedArticleIdComments, votesCountChange, selectedArticleIdVotes }) => {


  return (
    <li className={`singleArticle-${topic}`}>
      <p>Posted by {author} {moment(created_at).fromNow()}</p>
      <h2>{title}</h2>
      {/* {loggedInUser === author && <DeleteButton item="article" id={article_id} deleteElementByClick={deleteElementByClick} />} */}
      <div className='votesAndCommentsStats'>
        {selectedArticleIdVotes === article_id ? <p>{votesCountChange ? Number(votes) + Number(votesCountChange) : votes} votes </p> : <p> {votes} votes</p>}
        {selectedArticleIdComments === article_id ? <p>Comments: {commentCountChange ? Number(comment_count) + Number(commentCountChange) : comment_count}</p> : <p> {comment_count} comments</p>}
      </div>
    </li>
  );
};

export default ArticleCard;
