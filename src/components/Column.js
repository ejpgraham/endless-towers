import React, { Component } from 'react';
import Disc from './Disc';
import moveIsValid from '../rules/move-rules';

class Column extends Component {
  constructor (props) {
    super(props);

    this.state = {
      discs: props.contents,
      numberOfDiscs: props.contents.length,
      discBeingHeld: props.discBeingHeld
    };
    this.checkIfDiscIsBeingHeld = props.checkIfDiscIsBeingHeld;
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ discBeingHeld: nextProps.discBeingHeld, discs: nextProps.contents });
  }

  handleClick (e) {
    e.preventDefault();
    if (this.state.discs.length === 0 && this.state.discBeingHeld === false) {
      return;
    }
    let validMove = moveIsValid(this.state.discBeingHeld, this.state.discs);
    if (this.state.discBeingHeld !== false && validMove) {
      let disc = this.props.parentHandler(false);
      this.state.discs.unshift(disc);
      this.setState({
        discs: this.state.discs,
        discBeingHeld: false
      });
    } else if (this.checkIfDiscIsBeingHeld() !== false && validMove === false) {
      console.log('invalid move');
    } else {
      let discBeingHeld = this.state.discs.shift();
      this.props.parentHandler(discBeingHeld);
      this.setState({
        discs: this.state.discs,
        discBeingHeld: true
      });
    }
  }

  render () {
    return (
      <div className="tower-container" onClick={this.handleClick}>
        <div className="tower-spoke">
        </div>
        {this.state.discs.map((discWidth, index) =>
          <Disc width={discWidth}
            key={index}
            position={this.state.discs.length - 1 - index}
            discColor={this.props.discColor}
            inverted={this.props.inverted}
            gameHeight={this.props.height}
          />
        )}
      </div>
    );
  }
}

export default Column;
