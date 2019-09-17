import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';
import TopArticlesList from './TopArticlesList'

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

  fetchArticles = () => {
    const { topic } = this.props;
    api.getArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false })
    })
  }

  getTopFiveArticles = () => {
    // sort articles into order by votes descending and just pass through top 5 to TopArticlesList Component
  }

  render() {
    const { articles, isLoading } = this.state;
    const { topic } = this.props
    if (isLoading) return <p>Loading...</p>
    return (
      <React.Fragment>
        <ul className='articleList'>
          {articles.map(article => {
            return <ArticleCard key={article.article_id} {...article} />
          })}
        </ul>
        <TopArticlesList topic={topic} />
      </React.Fragment>
    );
  }
}

export default ArticleList;