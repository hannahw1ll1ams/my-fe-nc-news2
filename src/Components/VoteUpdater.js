import React, { Component } from 'react';
import * as api from '../api'
import ErrorPage from './ErrorPage';

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import '../css/router.css'


class VoteUpdater extends Component {
  state = {
    votesChange: 0,
    error: null
  }

  updateVotes = (votesDifference) => {
    const { id, item, updateVotesCountInArticleList } = this.props;
    item === 'articles' && updateVotesCountInArticleList(votesDifference, id)
    this.setState(currentState => {
      return { votesChange: currentState.votesChange + votesDifference, error: null }
    })
    api.patchVotes(item, id, votesDifference)
      .catch((error) => {
        const { data, status } = error.response
        this.setState(currentState => {
          return {
            error: {
              msg: data.msg,
              status: status
            }, votesChange: currentState.votesChange - votesDifference
          }
        })
      })
  }
  render() {
    const { votes } = this.props;
    const { votesChange, error } = this.state;

    return (
      <div className='votingButtons'>
        <div className='upButton'>
          <MdArrowDropUp size={50} onClick={() => { this.updateVotes(1) }} disabled={votesChange === 1} />
        </div>
        {votes + votesChange}
        <div className='downButton'>
          <MdArrowDropDown size={50} onClick={() => { this.updateVotes(-1) }} disabled={votesChange === -1} />
        </div>
        {/* <button onClick={() => { this.updateVotes(1) }} disabled={votesChange === 1}>VOTE UP</button>
        VOTES : {votes + votesChange}
        <button onClick={() => { this.updateVotes(-1) }} disabled={votesChange === -1}>VOTE DOWN</button> */}
        {error && <ErrorPage error={error} />}
      </div>
    );
  }
}

export default VoteUpdater;
