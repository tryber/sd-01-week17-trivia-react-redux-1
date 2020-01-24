import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { loadData, successQuestion, falseQuestion } from '../actions';
import '../css/Game.css';


// className={if(this.)?}


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

  componentDidMount() {
    this.props.loadTriviaData();
  }

  handleClickTrue() {
    this.props.verifyTrue();
  }

  handleClickFalse() {
    this.props.verifyFalse();
  }
  
  static shuffleArray(array) {
    const newArray = array;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  correctClass(){
    const { correct } = this.props;
    const correctcard = ['answer'];
    if(correct === true){
      return correctcard.push('-correct') && correctcard.join(' ');
    } return correctcard.push('-incorrect') && correctcard.join(' ');
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
          data-testid="correct-awnser" />
        {question.correct_answer}
      </label>
    );
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return Game.shuffleArray(allAnswers);
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
  loadTriviaData: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
