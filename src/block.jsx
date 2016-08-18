'use strict';
import React, { Component } from 'react';
import autoBind from './auto-bind';

const WIDTH = 150;
const HEIGHT = 70;
const PORT_RADIUS = HEIGHT / 10;
const STROKE_WIDTH = 1;

export default class Block extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  onBlockMouseDown(e) {
    this.props.onBlockMouseDown({ x: e.clientX, y: e.clientY }, this.props.tag);
  }
  onPortMouseDown(e) {
    this.props.onPortMouseDown({ x: e.clientX, y: e.clientY }, this.props.tag);
  }
  onPortMouseUp(e) {
    console.log('here3');
    e.stopPropagation();
    this.props.onPortMouseUp({ x: e.clientX, y: e.clientY }, this.props.tag);
  }
  render() {
    const { pos } = this.props.block;
    return (
      <g>
        <rect
          x={pos.x}
          y={pos.y}
          width={WIDTH}
          height={HEIGHT}
          rx={5}
          ry={5}
          strokeWidth={STROKE_WIDTH}
          stroke="#000"
          fill="#fff"
          cursor="move"
          onMouseDown={this.onBlockMouseDown}
        />
        <ellipse
          ry={PORT_RADIUS}
          rx={PORT_RADIUS}
          cx={pos.x}
          cy={pos.y + (HEIGHT / 2)}
          strokeWidth={STROKE_WIDTH}
          stroke="#000"
          fill="#00bfbf"
        />
        <ellipse
          ry={PORT_RADIUS}
          rx={PORT_RADIUS}
          cx={pos.x + WIDTH}
          cy={pos.y + (HEIGHT / 2)}
          strokeWidth={STROKE_WIDTH}
          stroke="#000"
          fill="#00bfbf"
          onMouseDown={this.onPortMouseDown}
        />
      </g>
    );
  }
}
