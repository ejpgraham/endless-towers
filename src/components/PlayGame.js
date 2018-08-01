import React, { Component } from 'react';
import Column from './Column';
import Cursor from './Cursor';
import newGameRules from '../rules/initialize-game';
import randomColor from '../assets/color-scheme';
// import automateGame from '../rules/automate-game';

class PlayGame extends Component {
  constructor (props) {
    super(props);
    let initialColumn = newGameRules(this.props.location.newGameDifficulty, localStorage, this.state);
    this.state = {
      columns: [Object.assign(initialColumn), [], []],
      gameHeight: Object.assign(initialColumn).length,
      discBeingHeld: false,
      color: 'grayscale',
      inverted: false,
      selfPlaying: false,
      automatedMoveQueue: [],
      playSpeed: 1,
      maxSpeed: 500,
      timer: null
    };
  }

  checkIfDiscIsBeingHeld () {
    return this.state.discBeingHeld;
  }

  parentHandleClick (discBeingHeld) {
    let discToReturn = this.state.discBeingHeld;
    this.setState({ discBeingHeld });
    return discToReturn;
  }

  handleColorClick (e) {
    e.preventDefault();
    this.setState((prevState) => {
      return prevState.color === 'grayscale'
        ? {color: 'rainbow'} : {color: 'grayscale'};
    });
  }

  handleInvertClick (e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {inverted: !prevState.inverted};
    });
  }

  handlePlayForMeClick (e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {selfPlaying: !prevState.selfPlaying};
    }, function () {
      if (this.state.selfPlaying) {
        this.setState(({
          columns: [Array.from(Array(this.state.gameHeight).keys()), [], []],
          automatedMoveQueue: []}),
        () => {
          this.automateGame(this.state.gameHeight, 0, 2, 1);
        });
      } else {
        clearInterval(this.state.timer);
        this.setState({timer: null});
      };
    });
  }

  handleSpeedClick (e) {
    e.preventDefault();
    if (this.state.playSpeed < this.state.maxSpeed) {
      this.setState((prevState) => {
        return {playSpeed: prevState.playSpeed + 1};
      });
    } else {
      this.setState({playSpeed: 1}, () => {
        clearInterval(this.state.timer);
        this.setState({timer: setInterval(this.makeMoves.bind(this), 1000 / this.state.playSpeed)});
      });
    }
    clearInterval(this.state.timer);
    this.state.timer = setInterval(this.makeMoves.bind(this), 1000 / this.state.playSpeed);
  }

  automateGame (discs, from, to, via) {
    if (discs === 0) {
      if (2 ** this.state.gameHeight - 1 === this.state.automatedMoveQueue.length) {
        this.setState({timer: setInterval(this.makeMoves.bind(this), 1100 - this.state.playSpeed * 100)});
      }
      return;
    }
    this.automateGame(discs - 1, from, via, to);
    this.state.automatedMoveQueue.push([from, to]);
    this.automateGame(discs - 1, via, to, from);
  }

  makeMoves () {
    let moves = this.state.automatedMoveQueue.shift();
    let copyOfColumns = Object.assign(this.state.columns)
    let disc = copyOfColumns[moves[0]].shift();
    copyOfColumns[moves[1]].unshift(disc);
    this.setState({automatedMoveQueue: this.state.automatedMoveQueue, columns: copyOfColumns}, () => {
      if (this.state.automatedMoveQueue.length <= 0) {
        clearInterval(this.state.timer);
        this.setState({selfPlaying: false});
        return;
      }
    });
  }

  timeRemaining () {
    let totalSeconds = Math.floor(this.state.automatedMoveQueue.length / this.state.playSpeed);
    let days = Math.floor(totalSeconds / (3600 * 24));
    totalSeconds -= days * 3600 * 24;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds -= hours * 3600;
    let minutes = Math.floor(totalSeconds / 60);
    totalSeconds -= minutes * 60;
    return days + ' Days ' + hours + ' Hours ' + minutes + ' Minutes ' + totalSeconds + ' Seconds';
  }

  render () {
    const title = this.state.inverted ? 'Endless Roots' : 'Endless Towers';

    return (
      <div className='game-container'>
        <h1 className='App-title'>{title}</h1>
        <section className='columns-container' onMouseMove={this.onMouseMove} style={{
          height: this.state.gameHeight * 15 }} >
          <Cursor discBeingHeld={this.state.discBeingHeld}/>
          {this.state.columns.map((columnContents, index) =>
            <Column contents={columnContents}
              key={index}
              discBeingHeld={this.state.discBeingHeld}
              parentHandler={this.parentHandleClick.bind(this)}
              checkIfDiscIsBeingHeld={this.checkIfDiscIsBeingHeld.bind(this)}
              discColor={this.state.color}
              inverted={this.state.inverted}
              height={this.state.gameHeight}
            />
          )}
        </section>
        <div className='buttons-container'>
          <button style={{backgroundColor: this.state.color === 'grayscale' ? 'white' : randomColor(this.state.color)}}
            type='button' className='button toggle-color-button' onClick={this.handleColorClick.bind(this)}>COLOR</button>
          <button type='button' className={(this.state.inverted ? 'inverted-button' : 'button') + ' toggle-inversion-button'} onClick={this.handleInvertClick.bind(this)}>INVERT</button>
          <button type='button' className='button toggle-speed-button' onClick={this.handleSpeedClick.bind(this)}>Speed: {this.state.playSpeed}x</button>
          <button type='button' className='button toggle-autoplay-button' onClick={this.handlePlayForMeClick.bind(this)}>{this.state.selfPlaying ? 'STOP PLAYING' : 'PLAY FOR ME'}</button>
        </div>
        {this.state.selfPlaying && this.state.automatedMoveQueue.length > 1 ?
          <div className={(this.state.inverted ? 'inverted-moves-container' : 'moves-container')}>
            <div className='moves-remaining'>{ this.state.playSpeed === 1 ? this.state.playSpeed + ' move per second' : this.state.playSpeed + ' moves per second'}</div>
            <div className='moves-remaining'>{ this.state.automatedMoveQueue.length + ' Moves Remaining'}</div>
            <div className='time-remaining'>{ 'Game will be solved in: ' + this.timeRemaining()} </div>
          </div> : null}
      </div>
    );
  }
}
export default PlayGame;
