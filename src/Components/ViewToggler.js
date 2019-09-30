import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';
import CommentCreator from './CommentCreator'
import UserCreator from './UserCreator';
import '../css/homepage.css'
import '../css/router.css'


class ViewToggler extends Component {
  state = {
    isShowingForm: false,
    messageToggle: true
  }
  handleClick = () => {
    const { isShowingForm, messageToggle } = this.state;
    this.setState({ isShowingForm: !isShowingForm, messageToggle: !messageToggle });
  };

  updateIsShowing = (boolean) => {
    console.log('updating', boolean)
    this.setState({ isShowingForm: boolean, messageToggle: !boolean })
  }

  render() {
    const { isShowingForm, messageToggle } = this.state;
    const { item, postNewArticle, postNewComment, updateTopics, slugs, topic, postNewUser, isLoadingTopics, topicsError, updateCommentCount, comment_count } = this.props;
    console.log(isShowingForm, messageToggle, 'current state')
    return (
      <>
        <button className={`add${item}`} onClick={this.handleClick}>{messageToggle === true ? <p>+Add {item}</p> : <p>Hide Form</p>}
        </button>
        {(isShowingForm) && (item === 'article') && <ArticleCreator postNewArticle={postNewArticle} updateTopics={updateTopics} slugs={slugs} selectedTopic={topic} isLoadingTopics={isLoadingTopics} topicsError={topicsError} updateIsShowing={this.updateIsShowing} />}
        {(isShowingForm) && (item === 'comment') && <CommentCreator comment_count={comment_count} updateCommentCount={updateCommentCount} postNewComment={postNewComment} />}
        {(isShowingForm) && (item === 'user') && <UserCreator postNewUser={postNewUser} />}
      </>
    );
  }
}

export default ViewToggler;




