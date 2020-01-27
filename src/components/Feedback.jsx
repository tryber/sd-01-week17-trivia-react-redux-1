import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Feedback.css';
import Header from './Header';

class Feedback extends React.Component {
  textFeedbackAssertions({ assertions }) {
    if (assertions < 3) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  textFeedbackScore({ score, assertions }) {
    const text1 = `Você acertou ${assertions} questões!`;
    const text2 = `Um total de ${score} pontos!`;
    return (
      <p>
        <h2 data-testid="feedback-total-question">{text1}</h2>
        <h2 data-testid="feedback-total-score">{text2}</h2>
      </p>
    );
  }
  btn() {
    return (
      <div>
        <Link to="/ranking">
          <button className="btn-Ranking">VER RANKING</button>
        </Link>
        <Link to="/">
          <button className="btn-jogarNovamente">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {this.textFeedbackAssertions(this.props.finalPoints)}
        </h1>
        <p>{this.textFeedbackScore(this.props.finalPoints)}</p>
        {this.btn()}
      </div>
    );
  }
}

Feedback.propTypes = {
  finalPoints: PropTypes.shape({
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
    correct: PropTypes.bool.isRequired,
  }),
};
const mapStateToProps = (state) => ({
  finalPoints: state.gameReducer,
});
export default connect(mapStateToProps)(Feedback);
