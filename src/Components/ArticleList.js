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
    const { loggedInUser } = this.props;
    api.sendNewArticle(title, topic, body, loggedInUser).then((newArticle) => {
      const allArticles = [newArticle, ...this.state.articles];
      this.setState({ articles: allArticles })
    })
  }

  render() {
    const { articles, isLoading } = this.state;
    const { topic, author, topicDescription, loggedInUser } = this.props
    if (isLoading) return <p>Loading...</p>
    return (
      <div className='main'>
        {topic && <h1>Articles on {topic}</h1>}
        {topicDescription && <h2>{topicDescription}</h2>}
        {author && <h1>Articles by {author}</h1>}
        <div className='topBar'>
          <Sorter fetchArticles={this.fetchArticles} />
        </div>
        {loggedInUser && <ViewToggler item='article' postNewArticle={this.postNewArticle} />}
        <ul className='articleList'>
          {articles.map(article => {
            return <ArticleCard key={article.article_id} {...article} />
          })}
        </ul>
        <Router>
          <SelectedArticle path=":article_id" loggedInUser={loggedInUser} />
        </Router>
        <TopArticlesList topic={topic} />
      </div>
    );
  }
}

export default ArticleList;