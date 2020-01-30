import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetScore } from '../actions';
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

  btn() {
    return (
      <div>
        <Link to="/">
          <button onClick={this.props.resetScore} className="btn-jogarNovamente">
            JOGAR NOVAMENTE
          </button>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h1>Ranking</h1>
        {Ranking.generateRankingTable()}
        {this.btn()}
      </div>
    );
  }
}

Ranking.propTypes = {
  resetScore: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
