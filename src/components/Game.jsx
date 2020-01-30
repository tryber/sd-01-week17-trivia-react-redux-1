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
        return -1;
      }
      if (a.key < b.key) {
        return 1;
      }
      return 0;
    });
    return ordenedAnswers;
  }

  static updateLocalStorage(newScore, newAssertions) {
    const previousPlayer = JSON.parse(localStorage.player);
    const player = {
      name: previousPlayer.name,
      score: newScore,
      assertions: newAssertions,
      gravatarEmail: previousPlayer.gravatarEmail,
    };
    localStorage.player = JSON.stringify(player);
  }

  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      showColor: false,
      time: 30,
      shouldReset: false,
    };
  }

  getTimeAndSave(getTime, reset, pause, start) {
    const second = Math.floor(getTime() / 1000);
    if (!this.state.showColor) {
      localStorage.setItem('time', second);
      if (second === 0) {
        this.handleClickFalse();
      }
    } else {
      pause();
    }
    if (this.state.shouldReset) {
      reset();
      start();
      this.setState({
        shouldReset: false,
        showColor: false,
      });
    }
  }

  calculateScore(previousScore) {
    switch (this.props.questions.results[this.state.questionIndex].difficulty) {
      case 'easy':
        return (localStorage.time * 1) + previousScore + 10;
      case 'medium':
        return (localStorage.time * 2) + previousScore + 10;
      case 'hard':
        return (localStorage.time * 3) + previousScore + 10;
      default:
        return 0;
    }
  }

  handleClickTrue() {
    const { score, assertions } = this.props;
    const newScore = this.calculateScore(score);
    const newAssertions = assertions + 1;
    Game.updateLocalStorage(newScore, newAssertions);
    this.setState({
      showColor: true,
    });
    return this.props.verifyTrue(newScore, newAssertions);
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
        disabled={this.state.showColor}
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
        disabled={this.state.showColor}
        className={this.state.showColor ? 'answer-correct' : ''}
        type="button"
        data-testid="correct-awnser"
      >
        {question.correct_answer}
      </button>
    );
    return Game.shuffleArray([...incorrectAnswers, correctAnswer]);
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
      showColor: false,
      shouldReset: true,
      questionIndex: nextIndex,
    });
  }

  generateNextButton(second) {
    if (second) {
      return (
        <Link to="/feedback">
          <button
            type="button"
            data-testid="btn-next"
            className={this.state.showColor ? 'show-button' : 'hide-button'}
            onClick={() => this.nextQuestion()}
          >
            Ver feedback!
          </button>
        </Link>
      );
    }
    return (
      <button
        type="button"
        data-testid="btn-next"
        className={this.state.showColor ? 'show-button' : 'hide-button'}
        onClick={() => this.nextQuestion()}
      >
        Próxima
      </button>
    );
  }
  timer() {
    return (
      <Timer initialTime={30001} direction="backward" data-testid="timer">
        {({ getTime, reset, pause, start }) => (
          <React.Fragment>
            <Timer.Seconds
              onChange={this.getTimeAndSave(
                getTime,
                reset,
                pause,
                start,
              )}
            />{' '}
            segundos
          </React.Fragment>
        )}
      </Timer>
    );
  }

  render() {
    const { questions } = this.props;
    if (!questions.results) {
      return 'Loading questions...';
    }
    if (questions.response_code === 3) {
      localStorage.removeItem('player');
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        {this.timer()}
        {this.generateQuestion(questions.results)}
        {this.state.questionIndex === 4
          ? this.generateNextButton(true)
          : this.generateNextButton(false)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.data,
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
