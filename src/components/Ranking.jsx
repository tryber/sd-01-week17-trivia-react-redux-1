import React, { Component } from 'react';
import '../css/Ranking.css';

class Ranking extends Component {
  static generateRankingTable() {
    const ranking = JSON.parse(localStorage.ranking);
    return ranking.map((position, index) => (
      <div key={position.name} data-testid={`${position.name}-${index}`}>
        <img src={position.picture} alt={position.name} />
        <p>{`${position.name} - ${position.score} pontos`}</p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h1>Ranking</h1>
        {Ranking.generateRankingTable()}
      </div>
    );
  }
}

export default Ranking;
