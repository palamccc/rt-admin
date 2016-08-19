'use strict';
import React, { Component } from 'react';
import autoBind from './auto-bind';
import { Block, isInside, getPoint } from './block.jsx';
import Connector from './connector.jsx';
import { getOffset, alignGrid, subOffset } from './point-utils';

const AC_NONE = 'none';
const AC_BLOCK_MOVE = 'bmove';
const AC_NEW_LINK = 'nlink';

export default class JourneyEditor extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      action: AC_NONE,
      moveId: -1,
      offset: { x: 0, y: 0 },
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 0 },
      blocks: [
        { pos: { x: 150, y: 250 } },
        { pos: { x: 350, y: 150 } },
        { pos: { x: 350, y: 350 } },
      ],
      connectors: [],
    };
  }

  onRefUpdate(svg) {
    this.svg = svg;
  }

  onMouseDown(e) {
    const loc = this.getMouseLoc(e);
    if (loc) this.onBlockMouseDown(loc);
  }

  onBlockMouseDown(loc) {
    if (loc.where === 'block') {
      const block = this.state.blocks[loc.id];
      this.setState({
        action: AC_BLOCK_MOVE,
        moveId: loc.id,
        offset: getOffset(loc.point, block.pos),
      });
    } else if (loc.where === 'out-port') {
      this.setState({
        action: AC_NEW_LINK,
        moveId: loc.id,
        p1: loc.point,
        p2: loc.point,
      });
    }
  }

  onMouseMove(e) {
    const pt = this.getSVGPoint({ x: e.clientX, y: e.clientY });
    const st = this.state;
    if (st.action === AC_BLOCK_MOVE) {
      const blocks = st.blocks;
      const index = st.moveId;
      blocks[index].pos = alignGrid(subOffset(pt, st.offset));
      this.setState({ blocks });
    } else if (st.action === AC_NEW_LINK) {
      this.setState({ p2: pt });
    }
  }

  onMouseUp(e) {
    const st = this.state;
    const newSt = { action: AC_NONE };
    if (st.action === AC_NEW_LINK) {
      const loc = this.getMouseLoc(e);
      if (loc && loc.where === 'in-port') {
        const connectors = st.connectors;
        connectors.push({
          fromId: st.moveId,
          toId: loc.id,
        });
        newSt.connectors = connectors;
      }
    }
    this.setState(newSt);
  }

  getSVGPoint(point) {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: point.x - rect.left,
      y: point.y - rect.top,
    };
  }

  getMouseLoc(e) {
    const point = this.getSVGPoint({ x: e.clientX, y: e.clientY });
    const blocks = this.state.blocks;
    for (let i = 0; i < blocks.length; i++) {
      const where = isInside(blocks[i], point);
      if (where) return { id: i, where, point };
    }
    return null;
  }

  render() {
    const st = this.state;
    return (
      <svg
        style={{ width: '100%', height: '100%' }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        ref={this.onRefUpdate}
      >
        {st.connectors.map((c, i) =>
          <Connector
            p1={getPoint(st.blocks[c.fromId], 'out-port')}
            p2={getPoint(st.blocks[c.toId], 'in-port')}
            key={i}
          />
        )}
        {st.blocks.map((b, i) =>
          <Block
            block={b}
            key={i}
            tag={i}
          />
        )}
        {st.action === AC_NEW_LINK && (
          <Connector p1={st.p1} p2={st.p2} />
        )}
      </svg>
    );
  }
}
