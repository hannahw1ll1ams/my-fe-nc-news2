import React from 'react';

const DeleteButton = ({ id, deleteElementByClick, updateCommentCount, item }) => {
  console.log(item, id)
  return (
    <div className='deleteButtonBox'>
      {item === "comment" ? <p className='deleteText' onClick={() => { deleteElementByClick(id); updateCommentCount(-1) }
      }> DELETE COMMENT</p> :
        <p className='deleteText' onClick={() => { deleteElementByClick(id) }
        }> DELETE ARTICLE</p>
      }
    </div>
  );
};

export default DeleteButton;