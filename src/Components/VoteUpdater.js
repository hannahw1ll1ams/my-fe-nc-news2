import React, { Component } from 'react';
import * as api from '../api'

class VoteUpdater extends Component {
  state = {
    votesChange: 0
  }

  updateVotes = (votesDifference) => {
    const { id, item } = this.props;
    this.setState(currentState => {
      return { votesChange: currentState.votesChange + votesDifference, error: null }
    })
    api.patchVotes(item, id, votesDifference)
  }
  render() {
    const { votes } = this.props;
    const { votesChange } = this.state;
    return (
      <div>
        <button type='submit' onClick={() => this.updateVotes(1)} disabled={votesChange === 1}>VOTE UP</button>
        <p>VOTES : {votes + votesChange}</p>
        <button type='submit' onClick={() => this.updateVotes(-1)} disabled={votesChange === -1}>VOTE DOWN</button>

      </div>
    );
  }
}

export default VoteUpdater;