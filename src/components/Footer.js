import React from 'react';

const defaultProps = {
  hints: {
    ready: 'Get ready',
    memorize: 'Memorize',
    recall: 'Recall',
    won: 'Well played',
    lost: 'Game over'
  }
};

export default class Footer extends React.Component {
  remainingCount() {
    if (this.props.gameState !== 'recall') {
      return null;
    }

    return (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length}
      </div>
    );
  }

  playAgainButton() {
    if (['won', 'lost'].indexOf(this.props.gameState) >= 0) {
      return (
        <button className="play-again-button" onClick={this.props.playAgain}>
          Play Again
        </button>
      );
    }
  }

  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}...
        </div>
        {this.remainingCount()}
        {this.playAgainButton()}
      </div>
    );
  }
}

Footer.defaultProps = defaultProps;