import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Configurations from './components/Configurations';
import Game from './components/Game';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/configurations" component={Configurations} />
        <Route path="/game" component={Game} />
        {/* <Route></Route> feedbacks */}
        {/* <Route></Route> ranking */}
      </Switch>
    </BrowserRouter>
  );
}
