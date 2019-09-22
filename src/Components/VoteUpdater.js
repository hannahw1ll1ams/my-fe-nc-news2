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
        this.setState(currentState => {
          return {
            error: {
              msg: error.response.data.msg,
              status: error.response.status
            }, votesChange: currentState.votesChange - votesDifference
          }
        })
      })
  }
  render() {
    const { votes } = this.props;
    const { votesChange, error } = this.state;

    return (
      <>
        <button onClick={() => this.updateVotes(1)} disabled={votesChange === 1}>VOTE UP</button>
        <p>VOTES : {votes + votesChange}</p>
        <button onClick={() => this.updateVotes(-1)} disabled={votesChange === -1}>VOTE DOWN</button>
        {error && <ErrorPage error={error} />}
      </>
    );
  }
}

export default VoteUpdater;