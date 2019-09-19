import React from 'react';
import CommentCard from './CommentCard';
import ViewToggler from './ViewToggler';

const CommentsByArticleList = ({ comments, loggedInUser, postNewComment }) => {
  return (
    <div>
      <ViewToggler item='comment' postNewComment={postNewComment} />
      <ul>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} loggedInUser={loggedInUser} />
        })}
      </ul>
    </div>
  );
};



export default CommentsByArticleList;