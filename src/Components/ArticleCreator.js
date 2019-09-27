import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import '../css/router.css'
import { navigate } from '@reach/router'

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: `${this.props.selectedTopic ? this.props.selectedTopic : 'coding'}`,
    articleBody: '',
    newTopic: '',
    newTopicDescription: '',
    // newColour: '',
    isShowingAddTopic: false,
    i: true
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }
    )
  }
  handleTopicChange = (event) => {
    const { name, value } = event.target;
    const { selectedTopic } = this.props
    this.setState({ [name]: value })
    if (selectedTopic) {
      navigate(`/topics/${value}`)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewArticle, updateTopics, selectedTopic, updateIsShowing } = this.props;
    const { title, topic, articleBody, newTopic, newTopicDescription, isShowingAddTopic } = this.state;
    if (isShowingAddTopic) {
      console.log('isShowingAddTopic=true')
      updateTopics(newTopic, newTopicDescription)
      postNewArticle(title, newTopic, articleBody)
      updateIsShowing(false)
    }
    else {
      console.log('else')
      console.log(isShowingAddTopic, '<--isShowingAddTopic')
      console.log(topic, '<--topic')
      postNewArticle(title, topic, articleBody)
      updateIsShowing(false)
    }

    this.setState({
      title: '',
      topic: selectedTopic,
      articleBody: '',
      newTopic: '',
      newTopicDescription: '',
      isShowingAddTopic: false
    })
  }

  handleClick = () => {
    console.log('click')
    const { isShowingAddTopic, i } = this.state
    const { updateIsShowing } = this.props
    this.setState({ isShowingAddTopic: !isShowingAddTopic, i: !i }, () => {
      updateIsShowing(true)
      navigate(`/articles`)
    }
    )
  }

  render() {
    const { title, articleBody, isShowingAddTopic, i, newTopic, newTopicDescription, topic } = this.state;
    const { slugs, selectedTopic, isLoadingTopics, topicsError } = this.props;
    return (
      <div>
        {isLoadingTopics ? <p>Loading Topics...</p> : topicsError ? <ErrorPage error={topicsError} /> :
          <form onSubmit={this.handleSubmit}>
            <label> Write your article here: <br />
              Title: <input name='title' placeholder='title...' onChange={this.handleChange} required value={title} />
              <br />
              Topic: {isShowingAddTopic === false && <select name="topic" onChange={this.handleTopicChange} required>
                <option value="">Please Select</option>
                <option value={topic} key={selectedTopic}>{selectedTopic ? selectedTopic : 'coding'}</option>
                {slugs.map(slug => {
                  return <option required value={slug} key={slug}>{slug}</option>
                })}
              </select>}
              <button onClick={this.handleClick}>{i === true ? <p>Add to a new topic?</p> : <p>Hide Form</p>}</button>
              <br />
              {isShowingAddTopic &&
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

