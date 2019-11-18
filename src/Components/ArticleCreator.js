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
    i: true,
    newTopicError: null
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }
    )
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { postNewArticle, selectedTopic, updateIsShowing } = this.props;
    const { title, articleBody, topic } = this.state;
    // const { postNewArticle, updateTopics, selectedTopic, updateIsShowing } = this.props;
    // const { title, articleBody, newTopic, newTopicDescription, isShowingAddTopic, topic } = this.state;
    // if (isShowingAddTopic) {
    //   try {
    //     const createTopic = await updateTopics(newTopic, newTopicDescription)
    //     return Promise.all([createTopic]).then(() => {
    //       postNewArticle(title, newTopic, articleBody)
    //       console.log('succcess')
    //     }
    //     )
    //   } catch (err) {
    //     console.log(err, "<---- errorrr")
    //   }
    // }
    if (selectedTopic) {
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
    const { title, articleBody } = this.state;
    const { slugs, selectedTopic, isLoadingTopics, topicsError } = this.props;
    return (
      <div className='addingArticleForm'>
        {isLoadingTopics ? <LoadingPage /> : topicsError ? <ErrorPage error={topicsError} /> :
          <form onSubmit={this.handleSubmit} className='addingArticleInputs'>
            <div className='topicChoice'>
              {
                selectedTopic ? <h2>{selectedTopic}</h2> :
                  <>
                    {< select name="topic" required onChange={this.handleChange}>
                      <option value="" >Please Select</option>
                      {slugs.map(slug => {
                        return <option value={slug} key={slug}>{slug}</option>
                      })}
                    </select>}
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

