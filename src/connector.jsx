'use strict';
import React, { Component } from 'react';

const STROKE_WIDTH = 1;
const CURVE_SIZE = 50;

export default class Connector extends Component {
  render() {
    const { p1, p2 } = this.props;
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    const dist = Math.sqrt((a * a) + (b * b));
    if (dist > CURVE_SIZE) {
      return (
        <path
          d={`M${p1.x},${p1.y} C${p1.x + CURVE_SIZE},${p1.y} ${p2.x - CURVE_SIZE},${p2.y} ${p2.x},${p2.y}`}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          stroke="#000"
        />
      );
    } else {
      return (
        <path
          d={`M${p1.x},${p1.y} ${p2.x},${p2.y}`}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          stroke="#000"
        />
      );
    }
  }
}
