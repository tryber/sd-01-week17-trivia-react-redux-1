import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Feedback.css';
import Header from './Header';

class Feedback extends React.Component {
  static ordenedArray(allAnswers) {
    const ordenedAnswers = allAnswers.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
    return ordenedAnswers;
  }

  static textFeedbackAssertions({ assertions }) {
    if (assertions < 3) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  static textFeedbackScore({ score, assertions }) {
    const text1 = `Você acertou ${assertions} questões!`;
    const text2 = `Um total de ${score} pontos!`;
    return (
      <p>
        <h2 data-testid="feedback-total-question">{text1}</h2>
        <h2 data-testid="feedback-total-score">{text2}</h2>
      </p>
    );
  }
  static btn() {
    return (
      <div>
        <Link to="/ranking">
          <button className="btn-Ranking">
            VER RANKING
          </button>
        </Link>
        <Link to="/">
          <button className="btn-jogarNovamente">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }

  componentWillUnmount() {
    this.saveRanking();
  }
  saveRanking() {
    const name = JSON.parse(localStorage.player);
    const gravatarImg = localStorage.gravatarIMG;
    if (localStorage.ranking) {
      const outdateStorage = JSON.parse(localStorage.ranking);
      const newPlayer = {
        name: name.name,
        picture: gravatarImg,
        score: this.props.finalPoints.score,
      };
      return (localStorage.ranking = JSON.stringify(
        Feedback.ordenedArray([...outdateStorage, newPlayer]),
      ));
    }
    return (localStorage.ranking = JSON.stringify([
      {
        name: name.name,
        picture: gravatarImg,
        score: this.props.finalPoints.score,
      },
    ]));
  }
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {Feedback.textFeedbackAssertions(this.props.finalPoints)}
        </h1>
        <p>{Feedback.textFeedbackScore(this.props.finalPoints)}</p>
        {Feedback.btn()}
      </div>
    );
  }
}

Feedback.propTypes = {
  finalPoints: PropTypes.shape({
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
    correct: PropTypes.bool.isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  finalPoints: state.gameReducer,
});
export default connect(mapStateToProps)(Feedback);
