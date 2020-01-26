import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from 'react-compound-timer';
import Header from './Header';
import { successQuestion, falseQuestion } from '../actions';
import '../css/Game.css';

class Game extends React.Component {
  static shuffleArray(allAnswers) {
    const ordenedAnswers = allAnswers.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      }
      if (a.key < b.key) {
        return -1;
      }
      return 0;
    });

    return ordenedAnswers;
  }

  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      showColor: false,
      time: 30,
    };
  }

  calculateScore(previousScore) {
    switch (this.props.questions.results[this.state.questionIndex].difficulty) {
      case 'easy':
        return previousScore + 10 + localStorage.time * 1;
      case 'medium':
        return previousScore + 10 + localStorage.time * 2;
      case 'hard':
        return previousScore + 10 + localStorage.time * 3;
      default:
        return 0;
    }
  }

  handleClickTrue() {
    if (localStorage.time < 1) {
      return this.handleClickFalse();
    }
    const { score, assertions } = this.props;
    const newScore = this.calculateScore(score);
    const newAssertions = assertions + 1;
    this.setState({
      showColor: true,
    });
    this.props.verifyTrue(newScore, newAssertions);
  }

  handleClickFalse() {
    this.setState({
      showColor: true,
    });
    this.props.verifyFalse();
  }

  generateAnswers(question) {
    const incorrectAnswers = question.incorrect_answers.map((answer, index) => (
      <button
        key={answer}
        onClick={() => this.handleClickFalse()}
        disabled={this.state.showColor ? true : false}
        type="button"
        className={this.state.showColor ? 'answer-incorrect' : ''}
        value={answer}
        data-testid={`wrong-answer-${index}`}
      >
        {answer}
      </button>
    ));
    const correctAnswer = (
      <button
        key={question.correct_answer}
        onClick={() => this.handleClickTrue()}
        disabled={this.state.showColor ? true : false}
        className={this.state.showColor ? 'answer-correct' : ''}
        type="button"
        data-testid="correct-awnser"
      >
        {question.correct_answer}
      </button>
    );
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return Game.shuffleArray(allAnswers);
  }

  generateQuestion(questions) {
    const question = questions[this.state.questionIndex];
    return (
      <div className="game-box">
        <div className="question">
          <p className="question-category">{question.category}</p>
          <p className="question-text">{question.question}</p>
        </div>
        <div>{this.generateAnswers(question)}</div>
      </div>
    );
  }

  nextQuestion() {
    const previousQuestion = this.state.questionIndex;
    const nextIndex = previousQuestion + 1;
    this.setState({
      questionIndex: nextIndex,
      showColor: false,
    });
  }

  getTime(param) {
    if (!this.state.showColor) {
      localStorage.setItem('time', param);
    }
  }

  generateNextButton() {
    return (
      <button
        type="button"
        className={this.props.showColor ? 'show-button' : 'hide-button'}
        onClick={() => this.nextQuestion()}
      >
        Próxima
      </button>
    );
  }

  render() {
    const { questions } = this.props;
    if (!questions.results) {
      return 'Loading questions...';
    }

    if (questions.response_code === 3) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        <Timer initialTime={30001} direction="backward">
          {({ getTime }) => (
            <React.Fragment>
              <Timer.Seconds
                onChange={this.getTime(Math.floor(getTime() / 1000))}
              />{' '}
              segundos
            </React.Fragment>
          )}
        </Timer>
        {this.generateQuestion(questions.results)}
        {this.state.questionIndex === 4 ? (
          <Link to="/feedback">{this.generateNextButton()}</Link>
        ) : (
          this.generateNextButton()
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.triviaReducer.data,
  correct: state.gameReducer.correct,
  score: state.gameReducer.score,
  assertions: state.gameReducer.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  verifyTrue: (score, assertions) =>
    dispatch(successQuestion(score, assertions)),
  verifyFalse: () => dispatch(falseQuestion()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf.isRequired,
  verifyFalse: PropTypes.func.isRequired,
  verifyTrue: PropTypes.func.isRequired,
  correct: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
