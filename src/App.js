import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/games/Game';
import Configurations from './components/Configurations';
import Ranking from './components/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/configurations" component={Configurations} />
        <Route path="/game" component={Game} />
        {/* <Route></Route> feedbacks */}
        <Route exact path="/game" component={Ranking} />
      </Switch>
    </BrowserRouter>
  );
}
