import React from 'react';
import VoteUpdater from './VoteUpdater';

const CommentCard = ({ author, body, created_at, votes, comment_id, loggedInUser }) => {
  return (
    <li>
      <p>Created at {created_at} by {author}</p>
      <p>{body}</p>
      {author === loggedInUser ? <p>Votes : {votes}</p> : <VoteUpdater votes={votes} item="comments" id={comment_id} />}
    </li>
  );
};

export default CommentCard;