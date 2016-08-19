'use strict';
import React from 'react';
import { getDistance } from './point-utils';

const WIDTH = 150;
const HEIGHT = 70;
const PORT_RADIUS = HEIGHT / 10;
const STROKE_WIDTH = 1;

function isInsideRect(pt, x, y, w, h) {
  return (
    pt.x >= x
    && pt.x < (x + w)
    && pt.y >= y
    && pt.y < (y + h)
  );
}

function isInsideCircle(pt, x, y, r) {
  return getDistance(pt, { x, y }) <= r;
}

/* eslint-disable no-multi-spaces */
export function isInside(block, pt) {
  const pos = block.pos;
  if (isInsideCircle(pt,      pos.x,         pos.y + (HEIGHT / 2), PORT_RADIUS)) return 'in-port';
  else if (isInsideCircle(pt, pos.x + WIDTH, pos.y + (HEIGHT / 2), PORT_RADIUS)) return 'out-port';
  else if (isInsideRect(pt,   pos.x,         pos.y,                WIDTH, HEIGHT)) return 'block';
  else return null;
}
/* eslint-enable */

export function getPoint(block, where) {
  const pos = block.pos;
  if (where === 'in-port') return { x: pos.x, y: pos.y + (HEIGHT / 2) };
  else if (where === 'out-port') return { x: pos.x + WIDTH, y: pos.y + (HEIGHT / 2) };
  else throw new Error(`unknown where ${where}`);
}

export function Block(props) {
  const { pos } = props.block;
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
      />
      <text
        fontFamily="Roboto"
        fontSize="16"
        x={pos.x + (WIDTH / 2)}
        y={pos.y + (HEIGHT / 2) + 6}
        width={WIDTH}
        textAnchor="middle"
        strokeWidth={0}
        fill="#000000">
        Block {props.tag}
      </text>
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
      />
    </g>
  );
}
