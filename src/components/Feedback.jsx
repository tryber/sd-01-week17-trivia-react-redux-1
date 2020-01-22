import React from 'react';
import '../css/Feedback.css'
// import Header from './games/Header'
// let valor = {
//   name: 'douglas',
//   assertions: 3,
//   score: 20,
//   gravatarEmail:'teste@teste.com.br',
// }
function textFeedbackAssertions({ assertions }) {
  const answerFinal = {
    1: 'Podia ser melhor...',
    2: 'Mandou bem!',
  };
  switch (assertions) {
    case assertions < 3:
      return answerFinal[1];
    default:
      return answerFinal[2];
  }
}
const objectLocalStorage = JSON.parse(localStorage.getItem('player'));

function textFeedbackScore({ score, assertions }) {
  const text1 = `Voçê acertou ${assertions} questões!`;
  const text2 = `Um total de ${score} pontos!`;
  return (
    <p>
      <h2 data-testid="feedback-total-question">{text1}</h2>
      <h2 data-testid="feedback-total-score">{text2}</h2>
    </p>
  );
}
function btn() {
  return (
    <div>
      <button className="btn-Ranking">VER RANKING</button>
      <button className="btn-jogarNovamente">JOGAR NOVAMENTE</button>
    </div>
  )
}
const teste = () => <h3>Esse elemento será a header. Ele sairá daqui</h3>;
function Feedback() {
  return (
    <div>
      {teste()}
      <h1 data-testid="feedback-text">{textFeedbackAssertions(objectLocalStorage)}</h1>
      <p>{textFeedbackScore(objectLocalStorage)}</p>
      {btn()}
    </div>
  );
}

export default Feedback;
