import React, { Component } from 'react';
import ArticleCreator from './ArticleCreator';


class ViewToggler extends Component {
  state = {
    isShowing: false,
    message: { true: '+ Add ', false: 'Hide Form' },
    i: true

  }
  handleClick = () => {
    const { isShowing, i } = this.state;
    this.setState({ isShowing: !isShowing, i: !i });
  };
  render() {
    const { isShowing, i, message } = this.state;
    // const { item } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>{message[i]}</button>
        {isShowing && <ArticleCreator />}
      </div>
    );
  }
}

export default ViewToggler;