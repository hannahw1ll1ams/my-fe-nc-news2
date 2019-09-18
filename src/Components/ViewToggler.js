import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';


class ViewToggler extends Component {
  state = {
    isShowing: false,
    i: true

  }
  handleClick = () => {
    const { isShowing, i } = this.state;
    this.setState({ isShowing: !isShowing, i: !i });
  };
  render() {
    const { isShowing, i } = this.state;
    const { item } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>{i === true ? <p>+Add {item}</p> : <p>Hide Form</p>}
        </button>
        {isShowing && <ArticleCreator />}
      </div>
    );
  }
}

export default ViewToggler;