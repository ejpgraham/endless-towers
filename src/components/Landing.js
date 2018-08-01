import React from 'react';
import { Route, Link } from 'react-router-dom';

const Landing = () => (
  <section className="landing">
    <h1 className="landing-title">ENDLESS TOWERS</h1>
    <h4 className="new-game-link">
      <Link to='/instructions'> New Game </Link>
    </h4>
  </section>
);

export default Landing;
