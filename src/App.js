import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import { Router } from '@reach/router'
import Homepage from './Views/Homepage';
import ArticlesByTopic from './Views/ArticlesByTopic'
import ArticlesByUserPage from './Views/ArticlesByUserPage'
import UserByUsername from './Views/UserByUsername'
import AllArticles from './Views/AllArticles'


class App extends Component {
  state = {
    loggedInUser: null,
    topicDescription: ""
  }
  updateTopicDescription = (topicDescription) => {
    this.setState({ topicDescription })
  }

  updateLoggedInUser = (loggedInUser) => {
    this.setState({ loggedInUser }, () => {
      console.log(this.state.loggedInUser)
    })
  }
  render() {
    return (
      <div className="App">
        <SideBar updateTopicDescription={this.updateTopicDescription} loggedInUser={this.state.loggedInUser} updateLoggedInUser={this.updateLoggedInUser} />
        <Router className='router'>
          <Homepage path='/' updateLoggedInUser={this.updateLoggedInUser} />
          <AllArticles path='/articles' />
          <ArticlesByTopic path='/topics/:topic' topicDescription={this.state.topicDescription} />
          <ArticlesByUserPage path='/articles/user/:username' />
          <UserByUsername path='/users/:username' />
        </Router>
      </div>
    );
  }
}

export default App;