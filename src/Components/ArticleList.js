import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';
import TopArticlesList from './TopArticlesList'
import Sorter from './Sorter';
import ViewToggler from './ViewToggler';
import { Router } from '@reach/router'
import SelectedArticle from './SelectedArticle'

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
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
  }

  postNewArticle = (title, topic, body) => {
    console.log(title, topic, body)
    const { loggedInUser } = this.props;
    api.sendNewArticle(title, topic, body, loggedInUser).then((newArticle) => {
      const allArticles = [newArticle, ...this.state.articles];
      this.setState({ articles: allArticles })
    })
  }

  deleteElementByClick = (id) => {
    this.setState((currentState) => {
      return { articles: currentState.articles.filter(article => article.article_id !== id) }
    })
    api.deleteItem(id, 'articles')
  }

  render() {

    const { articles, isLoading } = this.state;
    const { topic, author, loggedInUser, description, updateTopics, slugs } = this.props
    if (isLoading) return <p>Loading...</p>
    // const chosenTopic = topics.filter(topicObj => { return topicObj.slug === topic })
    return (
      <div className='main'>
        <p>{articles.length} Articles Found</p>
        {topic && <h1>Articles on {topic}</h1>}
        {topic && <h2>{description}</h2>}
        {author && <h1>Articles by {author}</h1>}
        <div className='topBar'>
          <Sorter fetchArticles={this.fetchArticles} />
        </div>
        {loggedInUser && <ViewToggler item='article' postNewArticle={this.postNewArticle} updateTopics={updateTopics} slugs={slugs} topic={topic} />}
        <ul className='articleList'>
          {articles.map(article => {
            return <ArticleCard key={article.article_id} {...article} loggedInUser={loggedInUser} deleteElementByClick={this.deleteElementByClick} />
          })}
        </ul>
        <Router>
          <SelectedArticle path=":article_id" loggedInUser={loggedInUser} deleteElementByClick={this.deleteElementByClick} />
        </Router>
        <TopArticlesList topic={topic} />
      </div>
    );
  }
}

export default ArticleList;