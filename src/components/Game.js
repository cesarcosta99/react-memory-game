import Cell from './Cell';
import React from 'react';
import Row from './Row';

class Game extends React.Component {
  render() {
    let matrix = [],
        row;

    for (let i = 0; i < this.props.rows; i++) {
      row = [];

      for (let j = 0; j < this.props.columns; j++) {
        row.push(`${i}${j}`)
      }

      matrix.push(row);
    }
    return (
      <div className="grid">
        {matrix.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cellId) => <Cell key={cellId} id={cellId} />)}
          </Row>
        ))}
      </div>
    );
  }
}

export default Game;