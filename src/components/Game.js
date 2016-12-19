import Cell from './Cell';
import Footer from './Footer';
import React from 'react';
import Row from './Row';
import sampleSize from 'lodash/sampleSize';

class Game extends React.Component {
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
      gameState: 'ready'
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ gameState: 'memorize' }, () => {
      setTimeout(() => this.setState({ gameState: 'recall' }), 2000);
    }), 2000);
  }

  render() {
    return (
      <div>
        <div className="grid">
          {this.matrix.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((cellId) => <Cell key={cellId} id={cellId} activeCells={this.activeCells} {...this.state} />)}
            </Row>
          ))}
        </div>
        <Footer {...this.state} />
      </div>
    );
  }
}

export default Game;