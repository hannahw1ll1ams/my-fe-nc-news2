import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';
import CommentCreator from './CommentCreator'

class ViewToggler extends Component {
  state = {
    isShowingForm: false,
    messageToggle: true

  }
  handleClick = () => {
    const { isShowingForm, messageToggle } = this.state;
    this.setState({ isShowingForm: !isShowingForm, messageToggle: !messageToggle });
  };
  render() {
    const { isShowingForm, messageToggle } = this.state;
    const { item, postNewArticle, postNewComment, updateTopics, slugs, topic } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>{messageToggle === true ? <p>+Add {item}</p> : <p>Hide Form</p>}
        </button>
        {(isShowingForm) && (item === 'article') && <ArticleCreator postNewArticle={postNewArticle} updateTopics={updateTopics} slugs={slugs} selectedTopic={topic} />}
        {(isShowingForm) && (item === 'comment') && <CommentCreator postNewComment={postNewComment} />}
      </div>
    );
  }
}

export default ViewToggler;