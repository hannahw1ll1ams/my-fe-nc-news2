import React, { Component } from 'react';
import * as api from '../api'
import ErrorPage from './ErrorPage';

class VoteUpdater extends Component {
  state = {
    votesChange: 0,
    error: null
  }

  updateVotes = (votesDifference) => {
    const { id, item } = this.props;
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
    const { votes, updateVotesCountInArticleList, id } = this.props;
    const { votesChange, error } = this.state;

    return (
      <>
        <button onClick={() => { this.updateVotes(1); updateVotesCountInArticleList(1, id) }} disabled={votesChange === 1}>VOTE UP</button>
        VOTES : {votes + votesChange}
        <button onClick={() => { this.updateVotes(-1); updateVotesCountInArticleList(-1, id) }} disabled={votesChange === -1}>VOTE DOWN</button>
        {error && <ErrorPage error={error} />}
      </>
    );
  }
}

export default VoteUpdater;