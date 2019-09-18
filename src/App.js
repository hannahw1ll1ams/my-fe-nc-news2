import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import { Router } from '@reach/router'
import Homepage from './Views/Homepage';
import ArticlesByTopic from './Views/ArticlesByTopic'
import ArticlesByUserPage from './Views/ArticlesByUserPage'
import UserByUsername from './Views/UserByUsername'

// function App() {
//   return (
//     <div className="App">
//       <SideBar />
//       <Router className='router'>
//         <Homepage path='/' />
//         <ArticlesByTopic path='/topics/:topic' />
//         <ArticlesByUserPage path='/articles/user/:username' />
//         <UserByUsername path='/users/:username' />
//       </Router>
//     </div>
//   );
// }

// export default App;
class App extends Component {
  state = {
    topicDescription: ""
  }
  updateTopicDescription = (topicDescription) => {
    this.setState({ topicDescription })
  }
  render() {
    return (
      <div className="App">
        <SideBar updateTopicDescription={this.updateTopicDescription} />
        <Router className='router'>
          <Homepage path='/' />
          <ArticlesByTopic path='/topics/:topic' topicDescription={this.state.topicDescription} />
          <ArticlesByUserPage path='/articles/user/:username' />
          <UserByUsername path='/users/:username' />
        </Router>
      </div>
    );
  }
}

export default App;