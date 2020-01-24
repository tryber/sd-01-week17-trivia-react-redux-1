import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/Configurations.css';
import { changeCategory, changeDifficulty, changeType } from '../actions';

class Configurations extends Component {
  selectCategory() {
    return (
      <select
        onChange={(e) => this.props.changeCategory(e)}
        name="trivia_category"
        data-testid="question-category-dropdow"
      >
        <option value="">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </select>
    );
  }

  selectDifficulty() {
    return (
      <select
        onChange={(e) => this.props.changeDifficulty(e)}
        name="trivia_difficulty"
        data-testid="question-difficulty-dropdown"
      >
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    );
  }

  selectType() {
    return (
      <select
        onChange={(e) => this.props.changeType(e)}
        name="trivia_type"
        data-testid="question-type-dropdown"
      >
        <option value="any">Any Type</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>
    );
  }

  render() {
    return (
      <div className="container">
        <h2>Configurações</h2>
        <label htmlFor="trivia_category">Categorias: </label>
        {this.selectCategory()}
        <label htmlFor="trivia_difficulty">Dificuldade: </label>
        {this.selectDifficulty()}
        <label htmlFor="trivia_type">Tipo: </label>
        {this.selectType()}
        <Link to="/">
          <button type="button">Aplicar Configurações!</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (e) => dispatch(changeCategory(e.target.value)),
  changeDifficulty: (e) => dispatch(changeDifficulty(e.target.value)),
  changeType: (e) => dispatch(changeType(e.target.value)),
});

Configurations.propTypes = {
  changeCategory: PropTypes.func.isRequired,
  changeDifficulty: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Configurations);
