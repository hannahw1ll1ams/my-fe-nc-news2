import React from 'react';
import CommentCard from './CommentCard';
import ViewToggler from './ViewToggler';
import ErrorPage from './ErrorPage';
import '../css/router.css'

const CommentsByArticleList = ({ comments, loggedInUser, postNewComment, deleteElementByClick, commentsError, addAndDeleteError, updateCommentCount, isLoadingNewComment, updateIsLoadingNewComment }) => {
  console.log(isLoadingNewComment)
  return (
    <div>
      {commentsError && <ErrorPage error={commentsError} />}
      <ViewToggler updateCommentCount={updateCommentCount} item='comment' postNewComment={postNewComment} updateIsLoadingNewComment={updateIsLoadingNewComment} />
      {addAndDeleteError && <ErrorPage error={addAndDeleteError} />}
      <ul className='commentList'>
        {/* {isLoadingNewComment && <li><p>Loading...</p></li>} */}
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} loggedInUser={loggedInUser} deleteElementByClick={deleteElementByClick} updateCommentCount={updateCommentCount} />
        })}
      </ul>
    </div>
  );
};



export default CommentsByArticleList;