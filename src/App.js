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
import ErrorPage from './Components/ErrorPage';

class App extends Component {
  state = {
    loggedInUser: null,
    topics: [],
    isLoadingTopics: true,
    users: [],
    isLoadingUsers: true,
    topicsError: null,
    usersError: null
  }

  render() {
    const { isLoadingTopics, isLoadingUsers, topicsError, usersError, loggedInUser, users, topics } = this.state;
    return (
      <div className="App">
        <SideBar slugs={topics.map(topic => topic.slug)} loggedInUser={loggedInUser} updateLoggedInUser={this.updateLoggedInUser} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />
        <Router className='router'>

          <Homepage path='/' updateLoggedInUser={this.updateLoggedInUser} users={users} postNewUser={this.postNewUser} isLoadingUsers={isLoadingUsers} usersError={usersError} />

          <AllArticles path='/articles/*' loggedInUser={loggedInUser} updateTopics={this.updateTopics} slugs={topics.map(topic => topic.slug)} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />

          <ArticlesByTopic path='/topics/:topic/*' topics={topics} loggedInUser={loggedInUser} updateTopics={this.updateTopics} isLoadingTopics={isLoadingTopics} topicsError={topicsError} />

          <ArticlesByUserPage path='/articles/user/:username/*' loggedInUser={loggedInUser} updateTopics={this.updateTopics} slugs={topics.map(topic => topic.slug)} />

          <UserByUsername path='/users/:username' loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />

          <ErrorPage default error={{ status: 404, msg: 'Page Not Found' }} />
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
      this.setState({ topics, isLoadingTopics: false })
    })
      .catch(error => {
        this.setState({
          topicsError: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoadingTopics: false
        })
      })
  }
  componentDidMount() {
    this.fetchTopics()
    this.fetchAllUsers()
  }

  updateTopics = (slug, description) => {
    api.addNewTopic(slug, description).then((newTopic) => {
      const allTopics = [newTopic, ...this.state.topics];
      this.setState({ topics: allTopics })
    })
  }

  fetchAllUsers = () => {
    api.getAllUsers().then((users) => {
      console.log('uh oh')
      this.setState({ users, isLoadingUsers: false })
    })
      .catch(error => {
        this.setState({
          usersError: {
            msg: 'CUSTOM ERROR',
            status: 400
          }, isLoadingUsers: false
        })
      })
  }

  postNewUser = (username, avatar_url, name) => {
    api.sendNewUser(username, avatar_url, name).then((newUser) => {
      console.log(newUser)
      const allUsers = [...this.state.users, newUser];
      this.setState({ users: allUsers })
    })
  }
}

export default App;