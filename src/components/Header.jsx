import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import '../css/Header.css';

class Header extends Component {
  render() {
    const playerGravatar = JSON.parse(localStorage.getItem('player'));
    const name = playerGravatar.name;
    const gravatarEmail = playerGravatar.gravatarEmail;
    const myHash = MD5(gravatarEmail);
    const gravatarImg = `https://www.gravatar.com/avatar/${myHash
      .toString()
      .toLowerCase()}.jpg`;
    localStorage.setItem('gravatarIMG', gravatarImg);
    return (
      <header className="header">
        <div className="content-player">
          <img className="img-avatar" src={gravatarImg} alt={name} />
          <p className="player" data-testid="header-player-name">
            {name}
          </p>
        </div>
        <div>
          <p
            className="player"
            data-testid="header-score"
          >{`Pontos: ${this.props.score}`}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.score,
});

Header.propTypes = {
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);
