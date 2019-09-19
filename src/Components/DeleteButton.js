import React from 'react';

const DeleteButton = ({ article_id, deleteArticleByClick }) => {
  return (
    <button onClick={() => deleteArticleByClick(article_id)}>DELETE</button>
  );
};

export default DeleteButton;