import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'
import VoteUpdater from './VoteUpdater';
import CommentsByArticleList from './CommentsByArticleList';
import DeleteButton from './DeleteButton';
import ErrorPage from './ErrorPage';
import '../css/router.css'
import moment from 'moment'
import LoadingPage from './LoadingPage';


class SelectedArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    comments: [],
    isShowingComments: false,
    messageToggle: true,
    articleError: null,
    commentsError: null,
    addAndDeleteError: null,
    commentCountChange: null,
    isLoadingNewComment: false
  }

  componentDidMount() {
    this.fetchSelectedArticleById()
    this.fetchCommentsByArticleId()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchSelectedArticleById()
      this.fetchCommentsByArticleId()
      this.updateIsShowingComments()
    }
  }

  updateIsShowingComments = () => {
    this.setState({ isShowingComments: false, messageToggle: true }
    )
  }

  fetchSelectedArticleById = () => {
    const { article_id } = this.props;
    api.getSelectedArticle(article_id).then((article) => {
      this.setState({ article, isLoading: false, isLoadingNewComment: false, articleError: null, commentsError: null })
    })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          articleError: {
            msg: data.msg,
            status: status
          }, isLoading: false, isLoadingNewComment: false
        })
      })
  }

  fetchCommentsByArticleId = () => {
    const { article_id } = this.props;
    api.getCommentsByArticleId(article_id).then((comments) => {
      this.setState({ comments, isLoadingNewComment: false })
    })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          commentsError: {
            msg: data.msg,
            status: status
          }, isLoading: false, isLoadingNewComment: false
        })
      })
  }

  postNewComment = (newComment) => {
    const { loggedInUser, article_id } = this.props;
    api.sendNewComment(article_id, loggedInUser, newComment).then((newComment) => {
      const allComments = [newComment, ...this.state.comments];
      this.setState({ comments: allComments })
    })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          addAndDeleteError: {
            msg: data.msg,
            status: status
          }, isLoading: false, isLoadingNewComment: false
        })
      })
  }


  updateIsLoadingNewComment = (boolean) => {
    this.setState({ isLoadingNewComment: boolean })
  }

  deleteElementByClick = (id) => {
    this.setState((currentState) => {
      return { comments: currentState.comments.filter(comment => comment.comment_id !== id) }
    })
    api.deleteItem(id, 'comments').catch(error => {
      const { data, status } = error.response
      this.setState({
        addAndDeleteError: {
          msg: data.msg,
          status: status
        }, isLoading: false
      })
    })
  }

  handleClick = () => {
    this.setState(currentState => {
      return { isShowingComments: !currentState.isShowingComments, messageToggle: !currentState.messageToggle }
    })
  }

  updateCommentCount = (numDifferece) => {
    const { updateCommentCountInArticleList } = this.props;
    this.setState(currentState => {
      return { commentCountChange: Number(currentState.commentCountChange) + numDifferece }
    })
    const { article } = this.state;
    updateCommentCountInArticleList(numDifferece, article.article_id)
  }

  render() {
    const { article, isLoading, isShowingComments, comments, messageToggle, articleError, commentsError, addAndDeleteError, commentCountChange, isLoadingNewComment } = this.state;
    const { loggedInUser, deleteElementByClick, updateVotesCountInArticleList } = this.props;
    if (isLoading) return <LoadingPage />
    if (articleError) return <ErrorPage error={articleError} />
    const { title, author, topic, body, votes, article_id, comment_count, created_at } = article
    return (
      <>
        <div className={`articleBody-${topic}`}>
          {loggedInUser === author ? <p className='postedBy'>Posted by <Link to={`/users/${author}`}>you</Link> {moment(created_at).fromNow()}</p> :
            <p className='postedBy'>Posted by <Link to={`/users/${author}`} className='allLinks'>{author}</Link> {moment(created_at).fromNow()}</p>}
          <h2 className='topicAndTitle'>{topic} / {title}</h2>

          <p>{body}</p>
          {author === loggedInUser && <DeleteButton item="article" id={article_id} deleteElementByClick={deleteElementByClick} />}
          <div className='votesAndCommentsButtons'>
            {author === loggedInUser ? <p>Votes : {votes}</p> : <VoteUpdater votes={votes} id={article_id} item="articles" updateVotesCountInArticleList={updateVotesCountInArticleList} />}
            {/* <br /> */}
            <button onClick={this.handleClick}>{messageToggle === true ? <p>Show Comments</p> : <p>Hide Comments</p>} {commentCountChange ? Number(comment_count) + Number(commentCountChange) : comment_count}</button>
          </div>
          {isShowingComments === true && <CommentsByArticleList updateCommentCount={this.updateCommentCount} postNewComment={this.postNewComment} comments={comments} loggedInUser={loggedInUser} article_id={article_id} deleteElementByClick={this.deleteElementByClick} commentsError={commentsError} addAndDeleteError={addAndDeleteError} isLoadingNewComment={isLoadingNewComment} updateIsLoadingNewComment={this.updateIsLoadingNewComment} />}
          {/* <button onClick={this.handleNextClick}>PREV</button>
        <button onClick={this.handleNextClick}>NEXT</button> */}
        </div>

      </>
    );
  }
}

export default SelectedArticle;