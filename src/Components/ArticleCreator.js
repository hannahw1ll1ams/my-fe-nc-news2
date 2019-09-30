import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import '../css/router.css'

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: "",
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
    const { title, articleBody, newTopic, newTopicDescription, isShowingAddTopic, topic } = this.state;
    if (isShowingAddTopic) {
      console.log('isShowingAddTopic=true', selectedTopic)
      console.log(title, newTopic, articleBody)

      updateTopics(newTopic, newTopicDescription)
      postNewArticle(title, newTopic, articleBody)
      updateIsShowing(false)
    }
    else if (selectedTopic) {
      console.log('else if', selectedTopic)

      postNewArticle(title, selectedTopic, articleBody)
      updateIsShowing(false)
    }
    else {
      console.log('else', selectedTopic)

      postNewArticle(title, topic, articleBody)
      updateIsShowing(false)
    }

    this.setState({
      title: '',
      topic: '',
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
    }
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

              Topic:
              {
                selectedTopic ? <p>{selectedTopic}</p> :
                  isShowingAddTopic ?
                    <>
                      <div>
                        <input name='newTopic' placeholder='New Topic' onChange={this.handleChange} required value={newTopic} />
                        <input name='newTopicDescription' placeholder='Description of Topic' onChange={this.handleChange} required value={newTopicDescription} />
                      </div>
                      <button onClick={this.handleClick}>{i === true ? <p>Add to a new topic?</p> : <p>Hide Form</p>}</button>
                    </>
                    :
                    <>
                      {<select name="topic" required onChange={this.handleChange}>
                        <option value="" >Please Select</option>
                        {slugs.map(slug => {
                          return <option value={slug} key={slug}>{slug}</option>
                        })}
                      </select>}
                      <button onClick={this.handleClick}>{i === true ? <p>Add to a new topic?</p> : <p>Hide Form</p>}</button>
                    </>
              }


              Body: <input name='articleBody' placeholder='body' onChange={this.handleChange} required value={articleBody} />
              <button>Add</button>
            </label>
          </form>}
      </div>
    );
  }
}

export default ArticleCreator;

