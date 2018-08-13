import React, { Component } from 'react';
import randomColor from '../assets/color-scheme';

class Disc extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width: (this.props.width + 1) * 20,
      maxWidth: 320,
      coordinates: this.props.coordinates,
      color: randomColor(this.props.discColor)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.discColor !== this.props.discColor) {
      this.setState({color: randomColor(nextProps.discColor)})
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.coordinates) {
      return true;
    } else if (this.props.inverted !== nextProps.inverted) {
      return true;
    } else if (this.props.discColor === nextProps.discColor && this.props.position === nextProps.position) {
      return false;
    }
    return true;
  }

  render () {
    const inverted = this.props.inverted ? 'top' : 'bottom';
    const disc = this.props.coordinates ? (
      <div className='disc'
        style={{backgroundColor: 'red',
          width: (this.props.width + 1) * 20,
          height: 15,
          left: this.props.coordinates[0],
          top: this.props.coordinates[1],
          pointerEvents: 'none'
        }}></div>
    ) : (
      <div
        className='disc'
        style={{backgroundColor: this.state.color,
          width: (this.props.width + 1) * 20,
          marginLeft: (this.state.maxWidth - (this.props.width + 1) * 20) / 2,
          height: 15,
          [inverted]: (this.props.position * 15),
          gameHeight: this.props.gameHeight
        }}>
      </div>
    );

    return (
      <div>
        {disc}
      </div>
    );
  }
}

export default Disc;
