import React, { Component } from 'react';
import * as api from '../api'

class SelectedArticle extends Component {
  state = {
    article: {},
    isLoading: true
  }

  componentDidMount() {
    this.fetchSelectedArticleById()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchSelectedArticleById()
    }
  }

  fetchSelectedArticleById = () => {
    const { article_id } = this.props;
    api.getSelectedArticle(article_id).then((article) => {
      console.log(article, '<--article')
    })
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <div>
        <p>This is your selected Article</p>
      </div>
    );
  }
}

export default SelectedArticle;