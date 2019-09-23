import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import { Router } from '@reach/router'
import Homepage from './Views/Homepage';
import ArticlesByTopic from './Views/ArticlesByTopic'
import ArticlesByUserPage from './Views/ArticlesByUserPage'
import UserByUsernamePage from './Views/UserByUsernamePage'
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
          <UserByUsernamePage path='/users/:username' loggedInUser={loggedInUser} users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />
          <ErrorPage default error={{ status: 404, msg: 'Page Not Found' }} />
        </Router>
      </div>
    );
  }

  updateLoggedInUser = (loggedInUser) => {
    if (loggedInUser === null) {
      this.setState({ loggedInUser })
    }
    else {
      localStorage.setItem('loggedInUser', loggedInUser)
      this.setState({ 'loggedInUser': localStorage.loggedInUser })
    }
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
      .catch(error => {
        this.setState({
          topicsError: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoadingTopics: false
        })
      })
  }

  fetchAllUsers = () => {
    api.getAllUsers().then((users) => {
      this.setState({ users, isLoadingUsers: false })
    })
      .catch(error => {
        this.setState({
          usersError: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoadingUsers: false
        })
      })
  }

  postNewUser = (username, avatar_url, name) => {
    api.sendNewUser(username, avatar_url, name).then((newUser) => {
      console.log(newUser)
      const allUsers = [newUser, ...this.state.users];
      this.setState({ users: allUsers })
    })
      .catch(error => {
        this.setState({
          usersError: {
            msg: error.response.data.msg,
            status: error.response.status
          }, isLoadingUsers: false
        })
      })
  }
}

export default App;