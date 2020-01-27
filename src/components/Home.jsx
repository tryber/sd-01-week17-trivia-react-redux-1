import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Home.css';
import { loadData } from '../actions';
import getTokenTriviaAPI from '../service/APIService';

class Home extends React.Component {
  static sendPlayerToLocalStorage(name, gravatarEmail) {
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };
    localStorage.setItem('player', JSON.stringify(player));
  }

  static allFilters(filters, type) {
    if (filters[type] && filters[type] !== '') {
      return `&${type}=${filters[type]}`;
    }
    return '';
  }

  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      gravatarEmail: '',
      name: '',
    };
  }
  componentDidMount() {
    localStorage.removeItem('player');
    getTokenTriviaAPI();
  }

  componentWillUnmount() {
    this.props.loadTriviaData(this.gerateURLtoTriviaAPI());
  }

  findFilters(triviaToken) {
    const { filters } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${triviaToken}${Home.allFilters(
      filters,
      'category',
    )}${Home.allFilters(filters, 'difficulty')}${Home.allFilters(
      filters,
      'type',
    )}`;
    return url;
  }

  gerateURLtoTriviaAPI() {
    const triviaToken = localStorage.token;
    const defaultURL = `https://opentdb.com/api.php?amount=5&token=${triviaToken}`;
    if (this.props.filters) {
      return this.findFilters(triviaToken);
    }
    return defaultURL;
  }
  startGame() {
    const { gravatarEmail, name } = this.state;
    if (gravatarEmail !== '' && name !== '') {
      Home.sendPlayerToLocalStorage(name, gravatarEmail);
      return this.setState({
        shouldRedirect: true,
      });
    }
    return alert('tá faltando informação aí amigão!');
  }

  changeHandler(event, id) {
    this.setState({
      [id]: event.target.value,
    });
  }

  generateInputs() {
    return (
      <div>
        <p className="inputs-text">Email do Gravatar:</p>
        <input
          className="inputs-class"
          type="text"
          data-testid="input-gravatar-email"
          onBlur={(e) => this.changeHandler(e, 'gravatarEmail')}
        />
        <p className="inputs-text">Nome do jogador:</p>
        <input
          className="inputs-class"
          type="text"
          data-testid="input-player-name"
          onBlur={(e) => this.changeHandler(e, 'name')}
        />
        <button
          type="button"
          className="button-play"
          onClick={() => this.startGame()}
          data-testid="btn-play"
        >
          JOGAR!
        </button>
      </div>
    );
  }
  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/game" />;
    }
    return (
      <main>
        <Link to="/configurations">
          <button
            type="button"
            className="button-config"
            data-testid="config-button"
          >
            Configurações
          </button>
        </Link>
        <div>{this.generateInputs()}</div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.questionsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  loadTriviaData: (url) => dispatch(loadData(url)),
});

Home.propTypes = {
  loadTriviaData: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
