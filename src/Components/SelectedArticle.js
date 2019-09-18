import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router'
import VoteUpdater from './VoteUpdater';
import CommentsByArticleList from './CommentsByArticleList';

class SelectedArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    comments: [],
    isShowing: false,
    i: true
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
      this.setState({ comments, isShowing: true, i: false })
    })
  }

  handleClick = () => {
    const { isShowing, i } = this.state
    this.setState({ isShowing: !isShowing, i: !i }, () => {
      console.log(this.state.isShowing)
    })
  }

  render() {
    const { article, isLoading, isShowing, comments, i } = this.state;
    const { loggedInUser } = this.props;
    if (isLoading) return <p>Loading...</p>
    const { title, author, topic, body, comment_count, votes, article_id } = article
    return (
      <div>
        <p>This is your selected article!</p>
        <p>{title}</p>
        <p>Written by <Link to={`/users/${author}`}>{author}</Link></p>
        <p>{topic}</p>
        <p>{body}</p>
        {author === loggedInUser ? <p>Votes : {votes}</p> : <VoteUpdater votes={votes} id={article_id} item="articles" />}
        <button onClick={this.handleClick}>{i === true ? <p>Show Comments</p> : <p>Hide Comments</p>} {comment_count}</button>
        {isShowing === true && <CommentsByArticleList comments={comments} loggedInUser={loggedInUser} />}
      </div>
    );
  }
}

export default SelectedArticle;