import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';
import TopArticlesList from './TopArticlesList'
import Sorter from './Sorter';
import ViewToggler from './ViewToggler';
import { Router } from '@reach/router'
import SelectedArticle from './SelectedArticle'
import ErrorPage from './ErrorPage';
import '../css/router.css'

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null
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
        this.setState({
          error: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoading: false
        })
      })
  }

  postNewArticle = (title, newArticleTopic, body) => {
    const { loggedInUser, topic } = this.props;
    console.log(loggedInUser, '<---in article list')

    console.log(title, newArticleTopic, body, topic)
    api.sendNewArticle(title, newArticleTopic, body, loggedInUser).then((newArticle) => {
      const allArticles = [newArticle, ...this.state.articles];
      this.setState({ articles: allArticles })
      // if (newArticleTopic === topic || !topic) {
      //   const allArticles = [newArticle, ...this.state.articles];
      //   this.setState({ articles: allArticles })
      // }
      // else {
      //   this.setState({ articles: newArticle })
      // }
    })
      .catch(error => {
        this.setState({
          error: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoading: false
        })
      })
  }

  deleteElementByClick = (id) => {
    this.setState((currentState) => {
      return { articles: currentState.articles.filter(article => article.article_id !== id) }
    })
    api.deleteItem(id, 'articles')
      .catch(error => {
        this.setState({
          error: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoading: false
        })
      })
  }

  render() {

    const { articles, isLoading, error } = this.state;
    const { topic, author, loggedInUser, description, updateTopics, slugs, isLoadingTopics, topicsError } = this.props
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorPage error={error} />
    return (
      <div className='main'>
        <div className='mainBody'>
          <div className='leftArticles'>
            {topic && <h2>Articles on {topic}</h2>}
            {topic && <h3>{description}</h3>}
            {author && <h2>Articles by {author}</h2>}
            <p className='numOfArticles'>{articles.length} Articles Found</p>
            <div className='topBar'>
              {articles.length > 0 && <Sorter fetchArticles={this.fetchArticles} />}
              {loggedInUser && <ViewToggler item='article' postNewArticle={this.postNewArticle} updateTopics={updateTopics} slugs={slugs} topic={topic} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />}
            </div>
            <ul className='articleList'>
              {articles.map(article => {
                return <ArticleCard key={article.article_id} {...article} loggedInUser={loggedInUser} deleteElementByClick={this.deleteElementByClick} />
              })}
            </ul>
          </div>
          <Router>
            <SelectedArticle path=":article_id" loggedInUser={loggedInUser} deleteElementByClick={this.deleteElementByClick} />
          </Router>
        </div>
        <TopArticlesList topic={topic} />
      </div>
    );
  }
}

export default ArticleList;