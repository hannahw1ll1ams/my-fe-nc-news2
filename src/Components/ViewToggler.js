import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';
import CommentCreator from './CommentCreator'

class ViewToggler extends Component {
  state = {
    isShowing: false,
    i: true

  }
  handleClick = () => {
    const { isShowing, i } = this.state;
    this.setState({ isShowing: !isShowing, i: !i });
  };
  render() {
    const { isShowing, i } = this.state;
    const { item, postNewArticle, postNewComment, updateTopics, slugs } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>{i === true ? <p>+Add {item}</p> : <p>Hide Form</p>}
        </button>
        {(isShowing) && (item === 'article') && <ArticleCreator postNewArticle={postNewArticle} updateTopics={updateTopics} slugs={slugs} />}
        {(isShowing) && (item === 'comment') && <CommentCreator postNewComment={postNewComment} />}
      </div>
    );
  }
}

export default ViewToggler;