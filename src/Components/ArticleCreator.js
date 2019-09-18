import React from 'react';

const ArticleCreator = () => {
  return (
    <form>
      <label>
        <input placeholder='title' />
        <input placeholder='topic' />
        <input placeholder='body' />
      </label>
    </form>
  );
};

export default ArticleCreator;