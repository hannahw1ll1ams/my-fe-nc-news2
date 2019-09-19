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

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <div className="App">
        <SideBar slugs={this.state.slugs} loggedInUser={this.state.loggedInUser} updateLoggedInUser={this.updateLoggedInUser} />
        <Router className='router'>
          <Homepage path='/' updateLoggedInUser={this.updateLoggedInUser} />
          <AllArticles path='/articles/*' loggedInUser={this.state.loggedInUser} updateTopics={this.updateTopics} slugs={this.state.slugs} />
          <ArticlesByTopic path='/topics/:topic/*' topics={this.state.topics} loggedInUser={this.state.loggedInUser} updateTopics={this.updateTopics} slugs={this.state.slugs} />
          <ArticlesByUserPage path='/articles/user/:username/*' loggedInUser={this.state.loggedInUser} updateTopics={this.updateTopics} slugs={this.state.slugs} />
          <UserByUsername path='/users/:username' loggedInUser={this.state.loggedInUser} />
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
      this.setState({ topics, slugs, isLoading: false })
    })
  }
  componentDidMount() {
    this.fetchTopics()
  }

  updateTopics = (slug, description) => {
    api.addNewTopic(slug, description).then((newTopic) => {
      this.setState(currentState => {
        console.log(currentState)
        return
        { topics: [...currentState.topics, ...newTopic] }
      })
    })
  }
}

export default App;