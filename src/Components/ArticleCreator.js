import React, { Component } from 'react';
import ViewToggler from './ViewToggler';

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: 'coding',
    body: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewArticle } = this.props;
    const { title, topic, body } = this.state;
    postNewArticle(title, topic, body)
    this.setState({
      title: '',
      topic: 'coding',
      body: ''
    })

  }
  render() {
    const { title, body } = this.state;
    const { slugs, updateTopics } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Write your article here:
          <input name='title' placeholder='title' onChange={this.handleChange} required value={title} />
          <select name="topic" onChange={this.handleChange}>
            {slugs.map(slug => {
              return <option value='slug' key={slug}>{slug}</option>
            })}
          </select>
          <ViewToggler item='topic' updateTopics={updateTopics} />
          <input name='body' placeholder='body' onChange={this.handleChange} required value={body} />
          <button>Add</button>
        </label>
      </form>
    );
  }
}

export default ArticleCreator;

