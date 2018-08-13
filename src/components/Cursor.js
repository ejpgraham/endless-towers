import React, { Component } from 'react';
import Disc from './Disc.js';

class Cursor extends Component {
  constructor (props) {
    super(props);
    this.state = {discBeingHeld: props.discBeingHeld,
      x: 0,
      y: 0
    };
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ discBeingHeld: nextProps.discBeingHeld });
  }

  onMouseMove (e) {
    this.setState({x: e.clientX, y: e.clientY});
  }

  componentDidMount () {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  render () {
    const coordinates = [this.state.x, this.state.y];
    const discBeingHeld = this.state.discBeingHeld;
    const discInCursor = discBeingHeld !== false ? (
      <Disc width={discBeingHeld} coordinates={coordinates}/>
    ) : (
      <div></div>
    );
    return (
      <div>
        {discInCursor}
      </div>
    );
  }
}

export default Cursor;
