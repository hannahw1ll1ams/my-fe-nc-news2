import React from 'react';
import VoteUpdater from './VoteUpdater';
import DeleteButton from './DeleteButton';
import '../css/comments.css'
import moment from 'moment'


const CommentCard = ({ author, body, created_at, votes, comment_id, loggedInUser, deleteElementByClick, updateCommentCount }) => {
  return (
    <li className='commentCard'>
      <h2>{author}</h2>
      <p>{moment(created_at).fromNow()}</p>
      <p>{body}</p>
      {author === loggedInUser ? <p className='currentVotes'>{votes}</p> : <VoteUpdater votes={votes} item="comments" id={comment_id} />}
      {author === loggedInUser && <DeleteButton item="comment" deleteElementByClick={deleteElementByClick} id={comment_id} updateCommentCount={updateCommentCount} />}

    </li>
  );
};

export default CommentCard;