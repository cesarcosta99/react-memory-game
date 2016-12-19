import React from 'react';

class Cell extends React.Component {
  isActive() {
    return this.props.activeCells.indexOf(this.props.id) !== -1;
  }

  render() {
    let className = 'cell';
    if (this.props.gameState === 'memorize' && this.isActive()) {
      className += ' active';
    }

    return (
      <div className={className}>
        {this.props.id}
      </div>
    );
  }
}

export default Cell;