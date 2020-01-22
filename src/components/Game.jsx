import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { connect } from 'react-redux';
import { loadData } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    this.props.loadTriviaData();
  }

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

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateAnswers(question) {
    const incorrectAnswers = question.incorrect_answers.map((answer, index) => {
      return (
        <label key={answer} htmlFor={answer}>
          <input
            type="radio"
            id={answer}
            value={answer}
            name="answer"
            data-testid={`wrong-answer-${index}`}
          />
          {answer}
        </label>
      );
    });
    const correctAnswer = (
      <label key={question.correct_answer} htmlFor={question.correct_answer}>
        <input type="radio" name="answer" data-testid="correct-awnser" />
        {question.correct_answer}
      </label>
    );
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return this.shuffleArray(allAnswers);
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
});

const mapDispatchToProps = (dispatch) => ({
  loadTriviaData: () => dispatch(loadData()),
});

Game.propTypes = {
  loadTriviaData: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
