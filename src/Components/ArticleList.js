import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';
import TopArticlesList from './TopArticlesList'
import Sorter from './Sorter';
// import ViewToggler from './ViewToggler';
import { Router, Link } from '@reach/router'
import SelectedArticle from './SelectedArticle'
import ErrorPage from './ErrorPage';
import '../css/router.css'
import LoadingPage from './LoadingPage'


class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
    commentCountChange: null,
    selectedArticleIdComments: null,
    votesCountChange: null,
    selectedArticleIdVotes: null,

  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles()
    }
    if (prevProps.slug !== this.props.slug) {
      this.fetchArticles()
    }
  }

  componentDidMount() {
    this.fetchArticles()
  }

  fetchArticles = (sort_by, order) => {
    const { topic, author } = this.props;
    api.getArticles(topic, author, sort_by, order).then((articles) => {
      this.setState({ articles, isLoading: false }
      )
    })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          error: {
            msg: data.msg,
            status: status
          }, isLoading: false
        })
      })
  }

  updateCommentCountInArticleList = (numDifference, selectedArticleIdComments) => {
    this.setState(currentState => {
      return { commentCountChange: Number(currentState.commentCountChange) + numDifference, selectedArticleIdComments }
    })
  }

  updateVotesCountInArticleList = (numDifference, selectedArticleIdVotes) => {
    this.setState(currentState => {
      return { votesCountChange: Number(currentState.votesCountChange) + numDifference, selectedArticleIdVotes }
    })
  }

  postNewArticle = (title, newArticleTopic, body) => {
    const { loggedInUser } = this.props;
    api.sendNewArticle(title, newArticleTopic, body, loggedInUser)
      .then(newArticle => {
        this.setState(currentState => {
          return { articles: [newArticle, ...currentState.articles] }
        })
      })
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          error: {
            msg: data.msg,
            status: status
          }, isLoading: false
        })
      })
  }

  //need to account for if api request fails, how to put comment or article back in state.
  deleteElementByClick = (id) => {
    this.setState((currentState) => {
      return { articles: currentState.articles.filter(article => article.article_id !== id) }
    })
    api.deleteItem(id, 'articles')
      .catch(error => {
        const { data, status } = error.response
        this.setState({
          error: {
            msg: data.msg,
            status: status
          }, isLoading: false,
        })
      })
  }

  render() {

    const { articles, isLoading, error, commentCountChange, selectedArticleIdComments, votesCountChange, selectedArticleIdVotes } = this.state;
    const { topic, author, loggedInUser, chosenTopic } = this.props
    // const { topic, author, loggedInUser, chosenTopic, updateTopics, slugs, isLoadingTopics, topicsError } = this.props
    if (isLoading) return <LoadingPage />
    if (error) return <ErrorPage error={error} />
    return (
      <div className='mainBody'>
        <div className='leftArticles'>
          <div className='topOfPage'>
            {topic && <h2 className='topicDescription'>{chosenTopic.description}</h2>}
            {author && <h2>Articles by {author}</h2>}
            <div className='topBar'>
              {articles.length > 0 && <Sorter className='sorter' fetchArticles={this.fetchArticles} />}
              {/* {loggedInUser && <ViewToggler item='ARTICLE' postNewArticle={this.postNewArticle} updateTopics={updateTopics} slugs={slugs} topic={topic} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />} */}
            </div>
          </div>
          <div className='main'>
            <ul className='articleList'>
              {articles.map(article => {
                return <Link className='allLinks' key={article.article_id} to={`${article.article_id}`}><ArticleCard key={article.article_id} {...article} loggedInUser={loggedInUser} deleteElementByClick={this.deleteElementByClick} commentCountChange={commentCountChange} selectedArticleIdComments={selectedArticleIdComments} selectedArticleIdVotes={selectedArticleIdVotes} votesCountChange={votesCountChange} /></Link>
              })}
            </ul>
            <Router className='selectedArticle'>
              <SelectedArticle path=":article_id" loggedInUser={loggedInUser} deleteElementByClick={this.deleteElementByClick} updateCommentCountInArticleList={this.updateCommentCountInArticleList} updateVotesCountInArticleList={this.updateVotesCountInArticleList} />
            </Router>
          </div>
        </div>
        <TopArticlesList topic={topic} />
      </div>
    );
  }
}

export default ArticleList;