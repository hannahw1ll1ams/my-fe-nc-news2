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
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewArticle, updateTopics } = this.props;
    const { title, topic, body, slug, description } = this.state;
    postNewArticle(title, topic, body)
    updateTopics(slug, description)
    this.setState({
      title: '',
      topic: 'coding',
      body: '',
      slug: '',
      description: ''
    })
  }

  createNewTopic = (slug, description) => {
    this.setState({ slug, description })
  }

  handleClick = () => {
    const { isShowing, i } = this.state
    this.setState({ isShowing: !isShowing, i: !i })
  }
  render() {
    const { title, body, isShowing, i, slug, description } = this.state;
    const { slugs } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Write your article here:
          <input name='title' placeholder='title' onChange={this.handleChange} required value={title} />
          <select name="topic" onChange={this.handleChange}>
            {slugs.map(slug => {
              return <option value='slug' key={slug}>{slug}</option>
            })}
          </select>
          <button onClick={this.handleClick}>{i === true ? <p>Add Topic</p> : <p>Hide Form</p>}</button>
          {isShowing &&
            <div>
              <input name='slug' placeholder='Topic' onChange={this.handleChange} required value={slug} />
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

