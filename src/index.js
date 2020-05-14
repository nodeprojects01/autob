import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/layouts/Home';
import Slots from './components/layouts/Slots';
import Intents from './components/layouts/Intents';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Intents} />
      <Route path="/slots" component={Slots} />
      <Route path="/intents" component={Intents} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
