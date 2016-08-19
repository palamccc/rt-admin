
const GRID_SIZE = 10;

export function getOffset(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

export function subOffset(p1, off) {
  return { x: p1.x - off.x, y: p1.y - off.y };
}

function round(number, step) {
  const rem = number % step;
  return (number - rem) + (Math.round(rem / step) * step);
}

export function alignGrid(p1) {
  return {
    x: round(p1.x, GRID_SIZE),
    y: round(p1.y, GRID_SIZE),
  };
}

export function getDistance(p1, p2) {
  const a = p1.x - p2.x;
  const b = p1.y - p2.y;
  return Math.sqrt((a * a) + (b * b));
}
