import React, { Component } from 'react';

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: 'coding',
    body: '',
    slug: '',
    description: '',
    isShowing: false,
    i: true
  }

  handleChange = (event) => {
    console.log('hello')
    const { name, value } = event.target;
    this.setState({ [name]: value }
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewArticle, updateTopics, selectedTopic } = this.props;
    const { title, topic, body, slug, description, isShowing } = this.state;
    updateTopics(slug, description)
    if (isShowing === false) {
      postNewArticle(title, topic, body)
    }
    if (isShowing === true) {
      postNewArticle(title, slug, body)
    }
    this.setState({
      title: '',
      topic: selectedTopic,
      body: '',
      slug: '',
      description: '',
      isShowing: false
    })
  }

  handleClick = () => {
    const { isShowing, i } = this.state
    this.setState({ isShowing: !isShowing, i: !i }
    )
  }

  render() {
    const { title, body, isShowing, i, slug, description } = this.state;
    const { slugs, selectedTopic } = this.props;
    console.log(selectedTopic)
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Write your article here:
          <input name='title' placeholder='title' onChange={this.handleChange} required value={title} />
          {isShowing === false && <select name="topic" onChange={this.handleChange}>
            <option value={selectedTopic} key={selectedTopic}>{selectedTopic}</option>
            {slugs.map(slug => {
              return <option value={slug} key={slug}>{slug}</option>
            })}
          </select>}
          <button onClick={this.handleClick}>{i === true ? <p>Add Topic</p> : <p>Hide Form</p>}</button>
          {isShowing &&
            <div>
              <input name='slug' placeholder='New Topic' onChange={this.handleChange} required value={slug} />
              <input name='description' placeholder='Description of Topic' onChange={this.handleChange} required value={description} />
            </div>}
          <input name='body' placeholder='body' onChange={this.handleChange} required value={body} />
          <button>Add</button>
        </label>
      </form>
    );
  }
}

export default ArticleCreator;

