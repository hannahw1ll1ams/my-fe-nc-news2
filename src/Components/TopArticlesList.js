import React, { Component } from 'react';
import * as api from '../api'
import ErrorPage from './ErrorPage';

class TopArticlesList extends Component {
  state = {
    topFive: [],
    sort_by: 'votes',
    isLoading: true,
    error: null
  }

  getTopArticles = () => {
    const { topic } = this.props;
    const { sort_by } = this.state;
    api.getTopFive(topic, sort_by).then((articles) => {
      let topFive = articles.slice(0, 5);
      this.setState({ topFive, isLoading: false })
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

  componentDidMount() {
    this.getTopArticles()
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.sort_by !== this.state.sort_by) || prevProps.topic !== this.props.topic) {
      this.getTopArticles()
    }
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({ sort_by: value })
  }

  render() {
    const { topic } = this.props;
    const { topFive, sort_by, isLoading, error } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorPage error={error} />
    return (
      <div className='rightSide'>
        <div className='topArticles'>
          <h3>TOP {topic} ARTICLES</h3>
          <form onChange={this.handleChange}>
            <select>
              <option value='votes'>By Votes</option>
              <option value='comment_count'>By Comment Count</option>
            </select>
          </form>
          <ol>
            {topFive.map(item => {
              return <li key={item.article_id}>
                <p>{item.title}</p>
                {sort_by === 'votes' && <p>Votes: {item.votes}</p>}
                {sort_by === 'comment_count' && <p>Comments: {item.comment_count}</p>}
              </li>
            })}
          </ol>
        </div>
        {/* <h3 className='activeUsers'>MOST ACTIVE USERS</h3> */}
      </div>
    );
  }
}

export default TopArticlesList;