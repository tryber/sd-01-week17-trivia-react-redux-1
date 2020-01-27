import React, { Component } from 'react';
import '../css/Ranking.css';

class Ranking extends Component {
  generateRankingTable() {
    const ranking = JSON.parse(localStorage.ranking);
    return ranking.map((position, index) => {
      return (
        <div key={position.name} data-testid={`${position.name}-${index}`}>
          <img src={position.gravatarImg} alt={position.name} />
          <p>{`${position.name} - ${position.score} pontos`}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Ranking</h1>
        {this.generateRankingTable()}
      </div>
    );
  }
}

export default Ranking;
