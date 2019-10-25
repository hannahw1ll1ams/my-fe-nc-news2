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
    const { postNewComment, updateCommentCount, updateIsLoadingNewComment } = this.props;
    const { body } = this.state;
    updateIsLoadingNewComment(true)
    postNewComment(body)
    this.setState({ body: '' })
    updateCommentCount(1)

  }

  render() {
    const { body } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className='commentInputs'>
        <label>
          <textarea name="comment_body" onChange={this.handleChange} value={body} required placeholder='Comment...' />
          <button className='commentSubmit'>POST</button>
        </label>
      </form>
    );
  }
}

export default CommentCreator;