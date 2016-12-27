import Game from './Game';
import React from 'react';

const defaultState = {
  rows: 5,
  columns: 5,
  activeCellsCount: 6
};

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.setState({gameId: 1});
  }

  createNewGame() {
    var newId = this.state.gameId + 1;
    if (this.state.gameState === 'won') {
      this.setState({
        rows: this.state.rows + 1,
        columns: this.state.columns + 1,
        activeCellsCount: this.state.activeCellsCount + 1
      });
    } else {
      this.setState(defaultState);
    }
    this.setState({gameId: newId});
  }

  updateGameState(state) {
    this.setState({gameState: state});
  }

  render() {
    return (
      <div>
        <Game key={this.state.gameId} {...this.state} createNewGame={this.createNewGame.bind(this)}
          updateGameState={(newState) => this.updateGameState(newState)} />
      </div>
    );
  }
}