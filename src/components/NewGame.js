import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import newGameRules from '../rules/initialize-game';

class NewGame extends Component {
  constructor (props) {
    super(props);
    this.state = {currentDifficulty: 0};
    this.isChecked = this.isChecked.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  isChecked (index) {
    if (this.state.currentDifficulty === index) {
      return true;
    } else {
      return false;
    }
  }

  handleClick (index) {
    this.setState(() => {
      return {currentDifficulty: index};
    });
  }

  render () {
    return (
      <section className='new-game'>
        <h2 className='new-game-title'>Select your difficulty:</h2>
        <ul className='difficulty-container'>
          {
            this.props.difficulties.map((difficulty, index) =>
              <li className='difficulty-list-item' onClick={() => this.handleClick(index)}>
                <input className='difficulty-check-box' type='checkbox' key={index} checked={this.isChecked(index)} />
                <label className='difficulty-label'>{difficulty}</label>
              </li>
            )
          }
        </ul>
        <Link className='link-to-play-game' params={{difficulty: this.state.currentDifficulty}}
          to={{pathname: '/playgame', newGameDifficulty: this.state.currentDifficulty}}
          difficulty={ this.state.currentDifficulty }>Begin Game</Link>
      </section>
    );
  }
}

export default NewGame;
