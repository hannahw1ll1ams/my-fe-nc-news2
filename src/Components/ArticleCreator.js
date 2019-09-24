import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import '../css/router.css'

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: `${this.props.selectedTopic}`,
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
    else if ((isShowingAddTopic === false) && (!topic)) {
      console.log('isShowingAddTopic=false & !topic')
      postNewArticle(title, 'coding', articleBody)
      updateIsShowing(false)
    }
    else {
      console.log('else')
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
    const { isShowingAddTopic, i } = this.state
    this.setState({ isShowingAddTopic: !isShowingAddTopic, i: !i }
    )
  }

  render() {
    const { title, articleBody, isShowingAddTopic, i, newTopic, newTopicDescription } = this.state;
    const { slugs, selectedTopic, isLoadingTopics, topicsError } = this.props;
    return (
      <div>
        {isLoadingTopics ? <p>Loading Topics...</p> : topicsError ? <ErrorPage error={topicsError} /> :
          <form onSubmit={this.handleSubmit}>
            <label> Write your article here: <br />
              Title: <input name='title' placeholder='title...' onChange={this.handleChange} required value={title} />
              <br />
              Topic: {isShowingAddTopic === false && <select name="topic" onChange={this.handleChange}>
                <option value={selectedTopic} key={selectedTopic}>{selectedTopic}</option>
                {slugs.map(slug => {
                  return <option value={slug} key={slug}>{slug}</option>
                })}
              </select>}
              <button onClick={this.handleClick}>{i === true ? <p>Show new topic form</p> : <p>Hide Form</p>}</button>
              <br />
              {isShowingAddTopic &&
                <div>
                  <input name='newTopic' placeholder='New Topic' onChange={this.handleChange} required value={newTopic} />
                  <input name='newTopicDescription' placeholder='Description of Topic' onChange={this.handleChange} required value={newTopicDescription} />
                </div>}
              Body: <input name='articleBody' placeholder='body' onChange={this.handleChange} required value={articleBody} />
              {/* {newTopic ? <Link to={`/topics/${newTopic}`}*/}
              <button>Add</button>
            </label>
          </form>}
      </div>
    );
  }
}

export default ArticleCreator;

