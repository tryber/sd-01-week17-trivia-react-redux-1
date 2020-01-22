import React, { Component } from 'react';
import MD5 from 'crypto-js/md5';
import '../css/Header.css';

class Header extends Component {
  render() {
    const playerGravatar = JSON.parse(localStorage.getItem('player'));
    const name = playerGravatar.name;
    const gravatarEmail = playerGravatar.gravatarEmail;
    const score = playerGravatar.score;
    const myHash = MD5(gravatarEmail);
    const gravatarImg = `https://www.gravatar.com/avatar/${myHash
      .toString()
      .toLowerCase()}.jpg`;
    return (
      <header className="header">
        <div className="content-player">
          <img className="img-avatar" src={gravatarImg} alt={name} />
          <p className="player" data-testid="header-player-name">
            {name}
          </p>
        </div>
        <div>
          <p className="player" data-testid="header-score">{`Pontos: ${score}`}</p>
        </div>
      </header>
    );
  }
}

export default Header;
