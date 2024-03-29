import Cell from './Cell';
import Footer from './Footer';
import React from 'react';
import Row from './Row';
import sampleSize from 'lodash/sampleSize';

const defaultProps = {
  allowedWrongAttempts: 2,
  timeoutSeconds: 10
};

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = [];
    let row;

    for (let i = 0; i < this.props.rows; i++) {
      row = [];
      for (let j = 0; j < this.props.columns; j++) {
        row.push(`${i}${j}`);
      }
      this.matrix.push(row);
    }

    let mergedArrays = [].concat.apply([], this.matrix);
    this.activeCells = sampleSize(mergedArrays, this.props.activeCellsCount)

    this.state = {
      gameState: 'ready',
      wrongGuesses: [],
      correctGuesses: [],
      score: 0
    }
  }

  componentDidMount() {
    this.memorizeTimer = setTimeout(() => {
      this.setState({ gameState: 'memorize' }, () => {
        this.recallTimer = setTimeout(this.startRecallMode.bind(this), 2000);
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimer);
    clearTimeout(this.recallTimer);
    this.finishGame();
  }

  startRecallMode() {
    this.setState({gameState: 'recall'}, () => {
      this.secondsRemaining = this.props.timeoutSeconds;
      this.playTimer = setInterval(() => {
        if (--this.secondsRemaining === 0) {
          this.setState({gameState: this.finishGame('lost')});
        }
      }, 1000);
    });
  }

  finishGame(gameState, score) {
    clearInterval(this.playTimer);
    if (score) {
      this.props.updateGameState(gameState, score);
    } else {
      this.props.updateGameState(gameState);
    }
    return gameState;
  }

  recordGuess({cellId, userGuessIsCorrect}) {
    let {wrongGuesses, correctGuesses, gameState, score} = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.activeCellsCount) {
        score = 3 - wrongGuesses.length;
        if (this.secondsRemaining >= 5) {
          score *= 2;
        }
        gameState = this.finishGame('won', score);
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        gameState = this.finishGame('lost');
      }
    }
    this.setState({correctGuesses, wrongGuesses, gameState, score});
  }

  render() {
    let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) >= 0;
    return (
      <div>
        <div className="score">Game score: {this.state.score}</div>
        <div className="total-score">Total score: {this.props.totalScore}</div>
        <div className="grid">
          {this.matrix.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((cellId) =>
                <Cell key={cellId} id={cellId} showActiveCells={showActiveCells} activeCells={this.activeCells}
                  recordGuess={this.recordGuess.bind(this)} {...this.state} />)
              }
            </Row>
          ))}
        </div>
        <Footer {...this.state} activeCellsCount={this.props.activeCellsCount} playAgain={this.props.createNewGame} />
      </div>
    );
  }
}

Game.defaultProps = defaultProps;