import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';
import CommentCreator from './CommentCreator'
import UserCreator from './UserCreator';
import '../css/homepage.css'
import '../css/router.css'
import { IoMdRemoveCircleOutline, IoIosAddCircle } from "react-icons/io";



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
    this.setState({ isShowingForm: boolean, messageToggle: !boolean })
  }

  render() {
    const { isShowingForm, messageToggle } = this.state;
    const { item, postNewArticle, postNewComment, updateTopics, slugs, topic, postNewUser, isLoadingTopics, topicsError, updateCommentCount, updateIsLoadingNewComment } = this.props;
    return (
      <>
        <div onClick={this.handleClick} className='userButton'>
          {messageToggle === true ?
            <IoIosAddCircle size={32} />
            :
            <IoMdRemoveCircleOutline size={32} />}
        </div>
        {(isShowingForm) && (item === 'ARTICLE') && <><div class="break"></div>
          <ArticleCreator postNewArticle={postNewArticle} updateTopics={updateTopics} slugs={slugs} selectedTopic={topic} isLoadingTopics={isLoadingTopics} topicsError={topicsError} updateIsShowing={this.updateIsShowing} /></>}
        {(isShowingForm) && (item === 'comment') && <CommentCreator updateCommentCount={updateCommentCount} postNewComment={postNewComment} updateIsLoadingNewComment={updateIsLoadingNewComment} />}
        {(isShowingForm) && (item === 'user') && <UserCreator postNewUser={postNewUser} />}
      </>
    );
  }
}

export default ViewToggler;




