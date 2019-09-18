import React, { Component } from 'react';
import * as api from '../api'

// const TopArticlesList = ({ topic, topFive }) => {
//   return (
//     <div className='topArticles'>
//       <h3>TOP FIVE {topic} ARTICLES</h3>
//       <ol>
//         {topFive.map(item => {
//           return <li key={item} className='topArticleItem'>{item}</li>
//         })}
//       </ol>

//     </div>
//   );
// };


class TopArticlesList extends Component {
  state = {
    topFive: [],
    sort_by: 'votes'
  }

  getTopArticles = () => {
    const { topic } = this.props;
    const { sort_by } = this.state;
    console.log(topic)
    api.getTopFive(topic, sort_by).then((articles) => {
      let topFive = articles.slice(0, 5);
      this.setState({ topFive })
      console.log(sort_by, topic, topFive)
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
    const { topFive, sort_by } = this.state;
    return (
      <div className='topArticles'>
        <h3>TOP FIVE {topic} ARTICLES</h3>
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
    );
  }
}

export default TopArticlesList;