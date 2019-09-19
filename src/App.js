import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import { Router } from '@reach/router'
import Homepage from './Views/Homepage';
import ArticlesByTopic from './Views/ArticlesByTopic'
import ArticlesByUserPage from './Views/ArticlesByUserPage'
import UserByUsername from './Views/UserByUsername'
import AllArticles from './Views/AllArticles'
import * as api from './api'

class App extends Component {
  state = {
    loggedInUser: null,
    topics: [],
    isLoading: true,
    slugs: []
  }

  updateLoggedInUser = (loggedInUser) => {
    this.setState({ loggedInUser }, () => {
    })
  }

  fetchTopics = () => {
    api.getTopics().then((topics) => {
      let slugs = topics.map(topic => { return topic.slug })
      // let descriptions = topics.map(topic => { return topic.description })
      this.setState({ topics, slugs, isLoading: false })
    })
  }

  componentDidMount() {
    this.fetchTopics()
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <div className="App">
        <SideBar slugs={this.state.slugs} loggedInUser={this.state.loggedInUser} updateLoggedInUser={this.updateLoggedInUser} />
        <Router className='router'>
          <Homepage path='/' updateLoggedInUser={this.updateLoggedInUser} />
          <AllArticles path='/articles/*' loggedInUser={this.state.loggedInUser} />
          <ArticlesByTopic path='/topics/:topic/*' topics={this.state.topics} loggedInUser={this.state.loggedInUser} />
          <ArticlesByUserPage path='/articles/user/:username/*' loggedInUser={this.state.loggedInUser} />
          <UserByUsername path='/users/:username' loggedInUser={this.state.loggedInUser} />
        </Router>
      </div>
    );
  }
}

export default App;