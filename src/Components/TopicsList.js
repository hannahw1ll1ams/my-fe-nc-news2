import React, { Component } from 'react';
import * as api from '../api'
import '../App.css';
import { Link } from '@reach/router'

class TopicsList extends Component {
  state = {
    topics: [],
    isLoading: true
  }

  componentDidMount() {
    this.fetchTopics()
  }

  fetchTopics = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false })
    })
  }
  render() {
    const { topics, isLoading } = this.state;
    const { updateTopicDescription } = this.props;
    if (isLoading) return <p>Loading...</p>
    return (
      <nav>
        <ul className='topicsList'>
          <li>
            <Link to='/articles'>All</Link>
          </li>{topics.map(topic => {
            return <li className='topic' key={topic.slug} onClick={() => updateTopicDescription(topic.description)}><Link to={`/topics/${topic.slug}`}>{topic.slug}</Link></li>
          })}
        </ul>
      </nav>
    );
  }
}

export default TopicsList;