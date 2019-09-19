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
    isLoadingTopics: true,
    isLoadingUsers: true,
    slugs: [],
    users: []
  }

  render() {
    const { isLoadingTopics, isLoadingUsers } = this.state;
    if (isLoadingTopics) return <p>Loading...</p>
    if (isLoadingUsers) return <p>Loading...</p>

    return (
      <div className="App">
        <SideBar slugs={this.state.slugs} loggedInUser={this.state.loggedInUser} updateLoggedInUser={this.updateLoggedInUser} />
        <Router className='router'>
          <Homepage path='/' updateLoggedInUser={this.updateLoggedInUser} users={this.state.users} />
          <AllArticles path='/articles/*' loggedInUser={this.state.loggedInUser} updateTopics={this.updateTopics} slugs={this.state.slugs} />
          <ArticlesByTopic path='/topics/:topic/*' topics={this.state.topics} loggedInUser={this.state.loggedInUser} updateTopics={this.updateTopics} slugs={this.state.slugs} />
          <ArticlesByUserPage path='/articles/user/:username/*' loggedInUser={this.state.loggedInUser} updateTopics={this.updateTopics} slugs={this.state.slugs} />
          <UserByUsername path='/users/:username' loggedInUser={this.state.loggedInUser} users={this.state.users} />
        </Router>
      </div>
    );
  }

  updateLoggedInUser = (loggedInUser) => {
    this.setState({ loggedInUser }, () => {
    })
  }

  fetchTopics = () => {
    api.getTopics().then((topics) => {
      let slugs = topics.map(topic => { return topic.slug })
      this.setState({ topics, slugs, isLoadingTopics: false })
    })
  }
  componentDidMount() {
    this.fetchTopics()
    this.fetchAllUsers()
  }

  updateTopics = (slug, description) => {
    api.addNewTopic(slug, description).then((newTopic) => {
      let allSlugs = [newTopic.slug, ...this.state.slugs]
      const allTopics = [newTopic, ...this.state.topics];
      this.setState({ topics: allTopics, slugs: allSlugs })
    })
  }

  fetchAllUsers = () => {
    api.getAllUsers().then((users) => {
      this.setState({ users, isLoadingUsers: false })
    })
  }
}

export default App;