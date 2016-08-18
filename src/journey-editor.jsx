'use strict';
import React, { Component } from 'react';
import autoBind from './auto-bind';
import Block from './block.jsx';
import Connector from './connector.jsx';

const GRID_SIZE = 10;

function offset(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function subOffset(p1, off) {
  return { x: p1.x - off.x, y: p1.y - off.y };
}

function round(number, step) {
  const rem = number % step;
  return (number - rem) + (Math.round(rem / step) * step);
}

function alignGrid(p1) {
  return {
    x: round(p1.x, GRID_SIZE),
    y: round(p1.y, GRID_SIZE),
  };
}

const AC_NONE = 'none';
const AC_BLOCK_MOVE = 'bmove';
const AC_NEW_LINK = 'nlink';

export default class JourneyEditor extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      action: AC_NONE,
      moveIndex: -1,
      offset: { x: 0, y: 0 },
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 0 },
      blocks: [
        { pos: { x: 50, y: 50 } },
        { pos: { x: 250, y: 50 } },
        { pos: { x: 450, y: 50 } },
      ],
      connectors: [],
    };
  }

  onBlockMouseDown(point, tag) {
    const block = this.state.blocks[tag];
    this.setState({
      action: AC_BLOCK_MOVE,
      moveIndex: tag,
      offset: offset(point, block.pos),
    });
  }

  onPortMouseDown(point, tag) {
    const spoint = this.getSVGPoint(point);
    this.setState({
      action: AC_NEW_LINK,
      moveIndex: tag,
      p1: spoint,
      p2: spoint,
    });
  }

  onPortMouseUp(point, tag) {
    console.log('here1');
    const st = this.state;
    if (st.action === AC_NEW_LINK) {
      const connectors = st.connectors;
      connectors.push({ p1: st.p1, p2: st.p2 });
      console.log(connectors);
      this.setState({ connectors });
    }
  }

  onMouseMove(e) {
    const point = { x: e.clientX, y: e.clientY };
    const st = this.state;
    if (st.action === AC_BLOCK_MOVE) {
      const blocks = st.blocks;
      const index = st.moveIndex;
      blocks[index].pos = alignGrid(subOffset(point, st.offset));
      this.setState({ blocks });
    } else if (st.action === AC_NEW_LINK) {
      const spoint = this.getSVGPoint(point);
      this.setState({ p2: spoint });
    }
  }

  onRefUpdate(svg) { this.svg = svg; }

  onMouseUp() {
    console.log('here2');
    this.setState({ action: AC_NONE });
  }

  getSVGPoint(point) {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: point.x - rect.left,
      y: point.y - rect.top,
    };
  }

  render() {
    const st = this.state;
    return (
      <svg
        style={{ width: '100%', height: '100%' }}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        ref={this.onRefUpdate}
      >
        {st.blocks.map((b, i) =>
          <Block
            block={b}
            key={i}
            tag={i}
            onBlockMouseDown={this.onBlockMouseDown}
            onPortMouseDown={this.onPortMouseDown}
            onPortMouseUp={this.onPortMouseUp}
          />
        )}
        {st.action === AC_NEW_LINK && (
          <Connector p1={st.p1} p2={st.p2} />
        )}
      </svg>
    );
  }
}
