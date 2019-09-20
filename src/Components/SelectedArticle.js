import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'
import VoteUpdater from './VoteUpdater';
import CommentsByArticleList from './CommentsByArticleList';
import DeleteButton from './DeleteButton';

class SelectedArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    comments: [],
    isShowingComments: false,
    messageToggle: true
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
  }

  fetchCommentsByArticleId = () => {
    const { article_id } = this.props;
    api.getCommentsByArticleId(article_id).then((comments) => {
      this.setState({ comments })
    })
  }

  postNewComment = (newComment) => {
    const { loggedInUser, article_id } = this.props;
    api.sendNewComment(article_id, loggedInUser, newComment).then((newComment) => {
      const allComments = [newComment, ...this.state.comments];
      this.setState({ comments: allComments })
    })
  }

  deleteElementByClick = (id) => {
    this.setState((currentState) => {
      return { comments: currentState.comments.filter(comment => comment.comment_id !== id) }
    })
    api.deleteItem(id, 'comments')
  }

  handleClick = () => {
    const { isShowingComments, messageToggle } = this.state
    this.setState({ isShowingComments: !isShowingComments, messageToggle: !messageToggle })
  }

  render() {
    const { article, isLoading, isShowingComments, comments, messageToggle } = this.state;
    const { loggedInUser, deleteElementByClick } = this.props;
    if (isLoading) return <p>Loading...</p>
    const { title, author, topic, body, comment_count, votes, article_id } = article
    return (
      <div>
        <p>This is your selected article!</p>
        <p>{title}</p>
        <p>Written by <Link to={`/users/${author}`}>{author}</Link></p>
        <p>{topic}</p>
        <p>{body}</p>
        {author === loggedInUser && <DeleteButton id={article_id} deleteElementByClick={deleteElementByClick} />}
        {author === loggedInUser ? <p>Votes : {votes}</p> : <VoteUpdater votes={votes} id={article_id} item="articles" />}
        <button onClick={this.handleClick}>{messageToggle === true ? <p>Show Comments</p> : <p>Hide Comments</p>} {comment_count}</button>
        {isShowingComments === true && <CommentsByArticleList postNewComment={this.postNewComment} comments={comments} loggedInUser={loggedInUser} article_id={article_id} deleteElementByClick={this.deleteElementByClick} />}
        {/* <button onClick={this.handleNextClick}>PREV</button>
        <button onClick={this.handleNextClick}>NEXT</button> */}
      </div>
    );
  }
}

export default SelectedArticle;