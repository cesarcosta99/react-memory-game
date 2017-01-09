import Game from './Game';
import React from 'react';

const defaultState = {
  rows: 5,
  columns: 5,
  activeCellsCount: 6,
  gameId: 1,
  totalScore: 0
};

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  createNewGame() {
    var newId = this.state.gameId + 1;
    if (this.state.gameState === 'won') {
      this.setState({
        rows: this.state.rows + 1,
        columns: this.state.columns + 1,
        activeCellsCount: this.state.activeCellsCount + 1,
      });
    } else {
      this.setState(defaultState);
    }
    this.setState({gameId: newId});
  }

  updateGameState(state, score) {
    if (score) {
      this.setState({gameState: state, totalScore: this.state.totalScore + score});
    } else {
      this.setState({gameState: state});
    }
  }

  render() {
    return (
      <div>
        <Game key={this.state.gameId} {...this.state} createNewGame={this.createNewGame.bind(this)}
          updateGameState={(newState, newTotalScore) => this.updateGameState(newState, newTotalScore)} />
      </div>
    );
  }
}