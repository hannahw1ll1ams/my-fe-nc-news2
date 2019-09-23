import React from 'react';

const DeleteButton = ({ id, deleteElementByClick, updateCommentCount, comment_count }) => {
  return (
    <button onClick={() => { deleteElementByClick(id); updateCommentCount(comment_count, -1) }
    }> DELETE</button>
  );
};

export default DeleteButton;