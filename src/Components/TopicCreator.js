import React, { Component } from 'react';

class TopicCreator extends Component {
  state = {
    slug: '',
    description: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { createNewTopic } = this.props;
    let { slug, description } = this.state;
    createNewTopic(slug, description)
    this.setState({
      slug: '',
      description: ''
    })
  }


  render() {
    const { slug, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input name='slug' placeholder='Topic' onChange={this.handleChange} required value={slug} />
          <input name='description' placeholder='Description of Topic' onChange={this.handleChange} required value={description} />
        </label>
        <button>SUBMIT!</button>
      </form>
    );
  }
}

export default TopicCreator;