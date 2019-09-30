import React from 'react';
import VoteUpdater from './VoteUpdater';
import DeleteButton from './DeleteButton';

const CommentCard = ({ author, body, created_at, votes, comment_id, loggedInUser, deleteElementByClick, updateCommentCount }) => {
  return (
    <li>
      <p>Created at {created_at} by {author}</p>
      <p>{body}</p>
      {author === loggedInUser && <DeleteButton item="comment" deleteElementByClick={deleteElementByClick} id={comment_id} updateCommentCount={updateCommentCount} />}
      {author === loggedInUser ? <p>Votes : {votes}</p> : <VoteUpdater votes={votes} item="comments" id={comment_id} />}
    </li>
  );
};

export default CommentCard;