'use strict';
import React from 'react';

const PORT_SIZE = 10;
const PORT_HSIZE = PORT_SIZE / 2;
const STROKE_WIDTH = 1;

export default function Port(props) {
  const { pos } = props;
  return (
    <path
      d={`M${pos.x - PORT_HSIZE},${pos.y - PORT_HSIZE}
          h${PORT_SIZE}
          l${PORT_HSIZE},${PORT_HSIZE}
          l${-PORT_HSIZE},${PORT_HSIZE}
          h-${PORT_SIZE}
          v-${PORT_SIZE}`}
      strokeWidth={STROKE_WIDTH}
      stroke="#333"
      fill="#00bfbf"
    />
  );
}
