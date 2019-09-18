import React from 'react';
import CommentCard from './CommentCard';

const CommentsByArticleList = ({ comments, loggedInUser }) => {
  return (
    <ul>
      {comments.map(comment => {
        console.log(comment)
        return <CommentCard key={comment.comment_id} {...comment} loggedInUser={loggedInUser} />
      })}
    </ul>
  );
};

export default CommentsByArticleList;