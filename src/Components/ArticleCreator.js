import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import '../css/router.css'

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: 'coding',
    articleBody: '',
    newTopic: '',
    newTopicDescription: '',
    // newColour: '',
    isShowing: false,
    i: true
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewArticle, updateTopics, selectedTopic } = this.props;
    const { title, topic, articleBody, newTopic, newTopicDescription, isShowing } = this.state;
    updateTopics(newTopic, newTopicDescription)
    if (isShowing === false) {
      postNewArticle(title, topic, articleBody)
    }
    if (isShowing === true) {
      postNewArticle(title, newTopic, articleBody)
    }
    this.setState({
      title: '',
      topic: selectedTopic,
      articleBody: '',
      newTopic: '',
      newTopicDescription: '',
      isShowing: false
    })
  }

  handleClick = () => {
    const { isShowing, i } = this.state
    this.setState({ isShowing: !isShowing, i: !i }
    )
  }

  render() {
    const { title, articleBody, isShowing, i, newTopic, newTopicDescription } = this.state;
    const { slugs, selectedTopic, isLoadingTopics, topicsError } = this.props;
    console.log(selectedTopic)
    return (
      <div>
        {isLoadingTopics ? <p>Loading Topics...</p> : topicsError ? <ErrorPage error={topicsError} /> :
          <form onSubmit={this.handleSubmit}>
            <label> Write your article here: <br />
              Title: <input name='title' placeholder='title...' onChange={this.handleChange} required value={title} />
              <br />
              Topic: {isShowing === false && <select name="topic" onChange={this.handleChange}>
                Topic: <option value={selectedTopic} key={selectedTopic}>{selectedTopic}</option>
                {slugs.map(slug => {
                  return <option value={slug} key={slug}>{slug}</option>
                })}
              </select>}
              <button onClick={this.handleClick}>{i === true ? <p>Add Topic</p> : <p>Hide Form</p>}</button>
              <br />
              {isShowing &&
                <div>
                  <input name='newTopic' placeholder='New Topic' onChange={this.handleChange} required value={newTopic} />
                  <input name='newTopicDescription' placeholder='Description of Topic' onChange={this.handleChange} required value={newTopicDescription} />
                </div>}
              Body: <input name='articleBody' placeholder='body' onChange={this.handleChange} required value={articleBody} />
              <button>Add</button>
            </label>
          </form>}
      </div>
    );
  }
}

export default ArticleCreator;

