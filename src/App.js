import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.js';
import NewGame from './components/NewGame.js';
import PlayGame from './components/PlayGame.js';
import Instructions from './components/Instructions.js';

class App extends Component {
  constructor () {
    super();
    this.defaultDifficulties = [
      'lengthy',
      'protracted',
      'interminable',
      'endless'
    ];
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <Route exact path='/' component={Landing} />
        </header>
        <main>
          <Route path='/newgame' render={ () =>
            <div>
              <h1 className='App-title'>Endless Towers</h1>
              <NewGame difficulties={this.defaultDifficulties} />
            </div> } />
          <Route path='/playgame' component={PlayGame} />
          <Route path='/instructions' component={Instructions} />
        </main>
      </div>
    );
  }
}

export default App;
