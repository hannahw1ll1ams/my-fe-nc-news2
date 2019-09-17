import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';
import TopArticlesList from './TopArticlesList'

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

  fetchArticles = () => {
    const { topic, author } = this.props;
    api.getArticles(topic, author).then((articles) => {
      this.setState({ articles, isLoading: false }
      )
    })
  }

  getTopFiveArticles = () => {
    // sort articles into order by votes descending and just pass through top 5 to TopArticlesList Component
  }

  render() {
    const { articles, isLoading, topFive } = this.state;
    const { topic } = this.props
    if (isLoading) return <p>Loading...</p>
    return (
      <div className='main'>
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