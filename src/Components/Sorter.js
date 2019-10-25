import React, { Component } from 'react';

class Sorter extends Component {
  state = {
    order: 'desc',
    sort_by: 'created_at'
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { fetchArticles } = this.props;
    const { sort_by, order } = this.state;
    fetchArticles(sort_by, order)
  }

  render() {
    return (
      <form className='sorterElement' onSubmit={this.handleSubmit}>
        <select className='select-css' name="sort_by" onChange={this.handleChange}>
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comment Count</option>
          <option value='votes'>Votes</option>
        </select>
        <select className='select-css' name="order" onChange={this.handleChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button className='sortButton'>SORT</button>
      </form>
    );
  }
}

export default Sorter;