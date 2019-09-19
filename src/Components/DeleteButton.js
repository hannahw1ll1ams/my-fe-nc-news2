import React from 'react';

const DeleteButton = ({ id, deleteElementByClick }) => {
  return (
    <button onClick={() => deleteElementByClick(id)}>DELETE</button>
  );
};

export default DeleteButton;