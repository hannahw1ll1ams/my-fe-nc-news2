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
        {/* {votesChange === 1 && <MdArrowDropUp size={50} className='active' onClick={() => { this.updateVotes(1) }} />} */}
        <button className='upButton' onClick={() => { this.updateVotes(1) }} disabled={votesChange === 1}>
          <MdArrowDropUp size={40} />
        </button>
        {votes + votesChange}
        <button className='downButton' onClick={() => { this.updateVotes(-1) }} disabled={votesChange === -1}>
          <MdArrowDropDown size={40} />
        </button>
        {/* <button onClick={() => { this.updateVotes(1) }} disabled={votesChange === 1}>VOTE UP</button>
        VOTES : {votes + votesChange}
        <button onClick={() => { this.updateVotes(-1) }} disabled={votesChange === -1}>VOTE DOWN</button> */}
        {error && <ErrorPage error={error} />}
      </div>
    );
  }
}

export default VoteUpdater;
