import React, { Component } from 'react';

class CommentCreator extends Component {
  state = {
    body: ''
  }

  handleChange = (event) => {
    this.setState({ body: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { postNewComment } = this.props;
    const { body } = this.state;
    postNewComment(body)
    this.setState({ body: '' })
  }

  render() {
    const { body } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          TYPE YOUR NEW COMMENT HERE:
          <input name="comment_body" onChange={this.handleChange} value={body} required />
          <button>Submit</button>
        </label>
      </form>
    );
  }
}

export default CommentCreator;