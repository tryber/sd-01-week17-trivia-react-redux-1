import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  static btn() {
    return (
      <div>
        <Link to="/">
          <button className="btn-jogarNovamente">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h1>Ranking</h1>
        {Ranking.generateRankingTable()}
        {Ranking.btn()}
      </div>
    );
  }
}

export default Ranking;
