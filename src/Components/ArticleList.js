import React, { Component } from 'react';
import * as api from '../api'
import ArticleCard from './ArticleCard';

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
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <ul className='articleList'>
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} />
        })}
      </ul>
    );
  }
}

export default ArticleList;