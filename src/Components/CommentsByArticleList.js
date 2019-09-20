import React from 'react';
import CommentCard from './CommentCard';
import ViewToggler from './ViewToggler';
import ErrorPage from './ErrorPage';

const CommentsByArticleList = ({ comments, loggedInUser, postNewComment, deleteElementByClick, commentsError, addAndDeleteError }) => {
  return (
    <div>
      {commentsError && <ErrorPage error={commentsError} />}
      <ViewToggler item='comment' postNewComment={postNewComment} />
      {addAndDeleteError && <ErrorPage error={addAndDeleteError} />}
      <ul>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} loggedInUser={loggedInUser} deleteElementByClick={deleteElementByClick} />
        })}
      </ul>
    </div>
  );
};



export default CommentsByArticleList;