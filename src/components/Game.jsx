import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { loadData, successQuestion, falseQuestion } from '../actions';
import '../css/Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
    this.handleClickTrue = this.handleClickTrue.bind(this);
    this.handleClickFalse = this.handleClickFalse.bind(this);
    this.correctClass = this.correctClass.bind(this);
  }

  handleClickTrue() {
    this.props.verifyTrue();
  }

  handleClickFalse() {
    this.props.verifyFalse();
  }

  correctClass() {
    const { correct } = this.props;
    const correctcard = ['answer'];
    if (correct === true) {
      return correctcard.push('-correct') && correctcard.join(' ');
    }
    return correctcard.push('-incorrect') && correctcard.join(' ');
  }

  static shuffleArray(allAnswers) {
    const ordenedAnswers = allAnswers.sort(function(a, b) {
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

  generateAnswers(question) {
    const incorrectAnswers = question.incorrect_answers.map((answer, index) => (
      <label key={answer} htmlFor={answer}>
        <input
          onClick={() => this.handleClickFalse()}
          type="radio"
          className={this.correctClass()}
          id={answer}
          value={answer}
          name="answer"
          data-testid={`wrong-answer-${index}`}
        />
        {answer}
      </label>
    ));
    const correctAnswer = (
      <label key={question.correct_answer} htmlFor={question.correct_answer}>
        <input
          onClick={() => this.handleClickTrue()}
          className={this.correctClass()}
          type="radio"
          name="answer"
          data-testid="correct-awnser"
        />
        {question.correct_answer}
      </label>
    );
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return Game.shuffleArray(allAnswers);
  }

  // componentDidMount() {
  //   this.props.loadTriviaData();
  // }

  generateQuestion(questions) {
    if (questions) {
      const question = questions[this.state.questionIndex];
      // const newIndex = this.state.questionIndex + 1;
      // this.setState({
      //   questionIndex: newIndex
      // })
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
    return 'Loading questions...';
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        {this.generateQuestion(questions)}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.triviaReducer.data.results,
  correct: state.gameReducer.correct,
  // question: state.question.correct,
});

const mapDispatchToProps = (dispatch) => ({
  loadTriviaData: () => dispatch(loadData()),
  verifyTrue: () => dispatch(successQuestion()),
  verifyFalse: () => dispatch(falseQuestion()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
