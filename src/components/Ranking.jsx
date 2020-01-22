import React, { Component } from 'react';
import '../css/Ranking.css';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1>Ranking</h1>
        <span>
          <img
            src="https://pbs.twimg.com/media/DzKfUMMX0AEBu75.jpg"
            alt="teste"
          />
          Fonseca
        </span>
        <span>
          <img
            src="https://pt-static.z-dn.net/files/de3/2deeee3340df53f86d90c44276c9c731.jpg"
            alt="teste"
          />
          Cátia
        </span>
        <span>teste</span>
        <span>teste</span>
      </div>
    );
  }
}

export default Ranking;
