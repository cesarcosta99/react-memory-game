import React from 'react';

export default class Cell extends React.Component {
  isActive() {
    return this.props.activeCells.indexOf(this.props.id) !== -1;
  }

  guessState() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }

  handleClick() {
    if (this.guessState() === undefined && this.props.gameState === 'recall') {
      this.props.recordGuess({
        cellId: this.props.id,
        userGuessIsCorrect: this.isActive()
      });
    }
  }

  render() {
    let className = 'cell';
    if (this.props.showActiveCells && this.isActive()) {
      className += ' active';
    }
    className += ' guess-' + this.guessState();

    const cellStyle = {
      height: 500 / this.props.activeCells.length,
      width: 500 / this.props.activeCells.length,
    };

    return (
      <div className={className} style={cellStyle} onClick={this.handleClick.bind(this)}>&nbsp;</div>
    );
  }
}