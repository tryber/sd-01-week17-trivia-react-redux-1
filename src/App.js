import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Configurations from './components/Configurations';
import Ranking from './components/Ranking';
import Feedback from './components/Feedback';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/configurations" component={Configurations} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/feedback" component={Feedback} />
      </Switch>
    </BrowserRouter>
  );
}
