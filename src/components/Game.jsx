import React from 'react';
import { connect } from 'react-redux';
import { loadData } from '../actions';

class Game extends React.Component {
  componentDidMount() {
      this.props.loadTriviaData();
  }
  render() {
    return <div>diauwhdwaiuh</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTriviaData: () => dispatch(loadData()),
  };
};
export default connect(null, mapDispatchToProps)(Game);
