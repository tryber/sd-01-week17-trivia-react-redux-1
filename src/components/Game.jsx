import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { connect } from 'react-redux';
import { loadData } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    this.props.loadTriviaData();
  }
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadTriviaData: () => dispatch(loadData()),
});

Game.propTypes = {
  loadTriviaData: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Game);
