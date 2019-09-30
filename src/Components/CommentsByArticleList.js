import React from 'react';
import CommentCard from './CommentCard';
import ViewToggler from './ViewToggler';
import ErrorPage from './ErrorPage';
import '../css/router.css'

const CommentsByArticleList = ({ comments, loggedInUser, postNewComment, deleteElementByClick, commentsError, addAndDeleteError, updateCommentCount }) => {
  return (
    <div>
      {commentsError && <ErrorPage error={commentsError} />}
      <ViewToggler updateCommentCount={updateCommentCount} item='comment' postNewComment={postNewComment} />
      {addAndDeleteError && <ErrorPage error={addAndDeleteError} />}
      <ul className='commentList'>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} loggedInUser={loggedInUser} deleteElementByClick={deleteElementByClick} updateCommentCount={updateCommentCount} />
        })}
      </ul>
    </div>
  );
};



export default CommentsByArticleList;