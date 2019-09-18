import React, { Component } from 'react';

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
    console.log(title, topic, body)
    postNewArticle(title, topic, body)
    this.setState({
      title: '',
      topic: 'coding',
      body: ''
    })

  }
  render() {
    const { title, body } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Write your article here:
          <input name='title' placeholder='title' onChange={this.handleChange} required value={title} />
          <select name="topic" onChange={this.handleChange}>
            <option value='coding'>Coding</option>
            <option value='football'>Football</option>
            <option value='cooking'>Cooking</option>
          </select>
          {/* <input name='topic' placeholder='topic' onChange={this.handleChange} required /> */}
          <input name='body' placeholder='body' onChange={this.handleChange} required value={body} />
          <button>Add</button>
        </label>
      </form>
    );
  }
}

export default ArticleCreator;

