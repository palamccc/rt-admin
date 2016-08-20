'use strict';
import React from 'react';
import { getDistance } from './point-utils';

const STROKE_WIDTH = 2;
const CURVE_SIZE = 50;

export default function Connector(props) {
  const { p1, p2 } = props;
  const dist = getDistance(p1, p2);
  if (dist > CURVE_SIZE) {
    return (
      <path
        d={`M${p1.x},${p1.y}
            C${p1.x + CURVE_SIZE},${p1.y}
             ${p2.x - CURVE_SIZE},${p2.y}
             ${p2.x},${p2.y}`}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        stroke="#888"
        markerEnd="url(#arrow)"
      />
    );
  } else {
    return (
      <path
        d={`M${p1.x},${p1.y} ${p2.x},${p2.y}`}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        stroke="#888"
      />
    );
  }
}
