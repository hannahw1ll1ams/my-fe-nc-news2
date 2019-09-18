import React, { Component } from 'react';

class ArticleCreator extends Component {
  state = {
    title: '',
    topic: '',
    body: ''
  }

  handleChange = () => {

  }

  handleSubmit = (event) => {
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Write your article here:
          <input name='title' placeholder='title' onChange={this.handleChange} required />
          <input name='topic' placeholder='topic' onChange={this.handleChange} required />
          <input name='body' placeholder='body' onChange={this.handleChange} required />
        </label>
      </form>
    );
  }
}

export default ArticleCreator;

