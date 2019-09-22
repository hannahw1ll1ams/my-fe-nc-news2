import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';
import CommentCreator from './CommentCreator'
import UserCreator from './UserCreator';

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
    const { item, postNewArticle, postNewComment, updateTopics, slugs, topic, postNewUser, isLoadingTopics, topicsError } = this.props;
    return (
      <>
        <button className={`add${item}`} onClick={this.handleClick}>{messageToggle === true ? <p>+Add {item}</p> : <p>Hide Form</p>}
        </button>
        {(isShowingForm) && (item === 'article') && <ArticleCreator postNewArticle={postNewArticle} updateTopics={updateTopics} slugs={slugs} selectedTopic={topic} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />}
        {(isShowingForm) && (item === 'comment') && <CommentCreator postNewComment={postNewComment} />}
        {(isShowingForm) && (item === 'user') && <UserCreator postNewUser={postNewUser} />}
      </>
    );
  }
}

export default ViewToggler;