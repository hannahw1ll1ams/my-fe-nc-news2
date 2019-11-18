import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import '../css/router.css'
import LoadingPage from './LoadingPage';

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: '',
    articleBody: '',
    newTopic: '',
    newTopicDescription: '',
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
      updateTopics(newTopic, newTopicDescription)
      postNewArticle(title, newTopic, articleBody)
      updateIsShowing(false)
    }
    else if (selectedTopic) {
      postNewArticle(title, selectedTopic, articleBody)
      updateIsShowing(false)
    }
    else {
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
      <div className='addingArticleForm'>
        {isLoadingTopics ? <LoadingPage /> : topicsError ? <ErrorPage error={topicsError} /> :
          <form onSubmit={this.handleSubmit} className='addingArticleInputs'>
            <div className='topicChoice'>
              {
                selectedTopic ? <p>{selectedTopic}</p> :
                  isShowingAddTopic ?
                    <>
                      <div>
                        <input name='newTopic' placeholder='New Topic' onChange={this.handleChange} required value={newTopic} />
                        <input name='newTopicDescription' placeholder='Description of Topic' onChange={this.handleChange} required value={newTopicDescription} />
                        <button onClick={this.handleClick}>{i === true ? <p>Add to a new topic?</p> : <p>Hide Form</p>}</button>
                      </div>

                    </>
                    :
                    <>
                      {<select name="topic" required onChange={this.handleChange}>
                        <option value="" >Please Select</option>
                        {slugs.map(slug => {
                          return <option value={slug} key={slug}>{slug}</option>
                        })}
                      </select>}
                      <button className='addTopic' onClick={this.handleClick}>{i === true ? <p>Add to a new topic?</p> : <p>Hide Form</p>}</button>
                    </>
              }
            </div>

            <br />
            <input className='titletext' name='title' placeholder='Title...' onChange={this.handleChange} required value={title} />
            <br />

            <textarea className='bodytext' name='articleBody' placeholder='Body...' onChange={this.handleChange} required value={articleBody} />
            <button className='postingArticleButton'>POST ARTICLE</button>
          </form>}
      </div>
    );
  }
}

export default ArticleCreator;

