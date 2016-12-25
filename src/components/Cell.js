import React from 'react';

export default class Cell extends React.Component {
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