import React from 'react';
import { Route, Link } from 'react-router-dom';
import Image from './instructions_image_2.png';

const Instructions = () => (
  <section className="instructions">
    <ul className="instructions-list">
      <li className="instructions-list-item">The game is simple:</li>
      <li className="instructions-list-item">Move one stack of disks entirely to another column.</li>
      <li className="instructions-list-item"><img className='instructions-image' src={Image} alt={''}/></li>
      <li className="instructions-list-item">But there are rules:</li>
      <li className="instructions-list-item">1) You can't put a larger disk on top of a smaller disk.</li>
      <li className="instructions-list-item">2) You can only move one disk at a time. Click a disk to pick it up.</li>
      <li className="instructions-list-item">3) When you inevitably tire of this, press the PLAY FOR ME button.</li>
    </ul>
    <h4 className="new-game-link">
      <Link to='/newgame'> CONTINUE </Link>
    </h4>
  </section>
);

export default Instructions;
