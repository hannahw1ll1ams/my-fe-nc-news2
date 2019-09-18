import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';
import TopArticlesList from './TopArticlesList'
import Sorter from './Sorter';
import ViewToggler from './ViewToggler';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    topFive: ["First Article", "Second Article", "Third Article", "Fourth Article", "Fifth Article"]
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

  getTopFiveArticles = () => {
    // sort articles into order by votes descending and just pass through top 5 to TopArticlesList Component
  }

  render() {
    const { articles, isLoading, topFive } = this.state;
    const { topic, author, topicDescription } = this.props
    if (isLoading) return <p>Loading...</p>
    return (
      <div className='main'>
        {topic && <h1>Articles on {topic}</h1>}
        {topicDescription && <h2>{topicDescription}</h2>}
        {author && <h1>Articles by {author}</h1>}
        <div className='topBar'>
          <Sorter fetchArticles={this.fetchArticles} />
        </div>
        <ViewToggler item='article' />
        <ul className='articleList'>
          {articles.map(article => {
            return <ArticleCard key={article.article_id} {...article} />
          })}
        </ul>
        <TopArticlesList topic={topic} topFive={topFive} />
      </div>
    );
  }
}

export default ArticleList;