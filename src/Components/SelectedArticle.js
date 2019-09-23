import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'
import VoteUpdater from './VoteUpdater';
import CommentsByArticleList from './CommentsByArticleList';
import DeleteButton from './DeleteButton';
import ErrorPage from './ErrorPage';
import '../css/router.css'

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
    newCommentCount: null
  }

  componentDidMount() {
    this.fetchSelectedArticleById()
    this.fetchCommentsByArticleId()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchSelectedArticleById()
      this.fetchCommentsByArticleId()
    }
  }

  fetchSelectedArticleById = () => {
    const { article_id } = this.props;
    api.getSelectedArticle(article_id).then((article) => {
      this.setState({ article, isLoading: false })
    })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          articleError: {
            msg: data.msg,
            status: status
          }, isLoading: false
        })
      })
  }

  fetchCommentsByArticleId = () => {
    const { article_id } = this.props;
    api.getCommentsByArticleId(article_id).then((comments) => {
      this.setState({ comments })
    })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          commentsError: {
            msg: data.msg,
            status: status
          }, isLoading: false
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
          }, isLoading: false
        })
      })
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

  updateCommentCount = (commentNum, votesDifference) => {
    console.log(typeof commentNum, typeof votesDifference)
    console.log(commentNum, votesDifference)
    console.log(Number(commentNum), (votesDifference))
    console.log(Number(commentNum) + Number(votesDifference))


    this.setState({ newCommentCount: Number(commentNum) + Number(votesDifference) }
    )
  }

  render() {
    const { article, isLoading, isShowingComments, comments, messageToggle, articleError, commentsError, addAndDeleteError, newCommentCount } = this.state;
    const { loggedInUser, deleteElementByClick } = this.props;
    if (isLoading) return <p>Loading...</p>
    if (articleError) return <ErrorPage error={articleError} />
    const { title, author, topic, body, comment_count, votes, article_id } = article
    return (
      <div className={`selectedArticle-${topic}`}>
        <div className={`articleBody-${topic}`}>
          <p>{topic}: {title}</p>
          <p>Written by <Link to={`/users/${author}`}>{author}</Link></p>
          <p>{body}</p>
          {author === loggedInUser && <DeleteButton id={article_id} deleteElementByClick={deleteElementByClick} />}
          {author === loggedInUser ? <p>Votes : {votes}</p> : <VoteUpdater votes={votes} id={article_id} item="articles" />}
          <br />

          {/* {comment_count === 0 &&
            <CommentsByArticleList postNewComment={this.postNewComment} comments={comments} loggedInUser={loggedInUser} article_id={article_id} deleteElementByClick={this.deleteElementByClick} commentsError={commentsError} addAndDeleteError={addAndDeleteError} />} */}

          <button onClick={this.handleClick}>{messageToggle === true ? <p>Show Comments</p> : <p>Hide Comments</p>} {newCommentCount ? newCommentCount : comment_count}</button>
        </div>
        {isShowingComments === true && <CommentsByArticleList updateCommentCount={this.updateCommentCount} postNewComment={this.postNewComment} comments={comments} loggedInUser={loggedInUser} article_id={article_id} deleteElementByClick={this.deleteElementByClick} commentsError={commentsError} addAndDeleteError={addAndDeleteError} comment_count={comment_count} />}
        {/* <button onClick={this.handleNextClick}>PREV</button>
        <button onClick={this.handleNextClick}>NEXT</button> */}
      </div>
    );
  }
}

export default SelectedArticle;