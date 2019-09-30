import React from 'react';

const DeleteButton = ({ id, deleteElementByClick, updateCommentCount, item }) => {
  return (
    <>
      {item === "comment" ? <button onClick={() => { deleteElementByClick(id); updateCommentCount(-1) }
      }> DELETE</button> :
        <button onClick={() => { deleteElementByClick(id) }
        }> DELETE</button>
      }
    </>
  );
};

export default DeleteButton;