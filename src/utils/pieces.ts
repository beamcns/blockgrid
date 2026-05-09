import type { Piece, PieceShape, Point } from '../types/game';

const normalizeCells = (cells: Point[]): Point[] => {
  const minRow = Math.min(...cells.map((cell) => cell.row));
  const minCol = Math.min(...cells.map((cell) => cell.col));

  return cells.map((cell) => ({
    row: cell.row - minRow,
    col: cell.col - minCol,
  }));
};

export const PIECE_SHAPES: PieceShape[] = [
  { id: 'single', name: 'Dot', cells: [{ row: 0, col: 0 }] },
  {
    id: 'line-2-h',
    name: 'Pair',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ],
  },
  {
    id: 'line-2-v',
    name: 'Pair',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
    ],
  },
  {
    id: 'line-3-h',
    name: 'Triple',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ],
  },
  {
    id: 'line-3-v',
    name: 'Triple',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
  },
  {
    id: 'square-2',
    name: 'Square',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ],
  },
  {
    id: 'square-3',
    name: 'Block',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: 'l-a',
    name: 'Corner',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
    ],
  },
  {
    id: 'l-b',
    name: 'Corner',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
      { row: 2, col: 0 },
    ],
  },
  {
    id: 'l-c',
    name: 'Corner',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
  },
  {
    id: 't-a',
    name: 'Crown',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 1 },
    ],
  },
  {
    id: 't-b',
    name: 'Crown',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
  },
  {
    id: 'zig-a',
    name: 'Zig',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
  },
  {
    id: 'zig-b',
    name: 'Zig',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 0 },
    ],
  },
].map((shape) => ({ ...shape, cells: normalizeCells(shape.cells) }));

const COLORS = [
  'from-cyan-300 to-sky-500',
  'from-emerald-300 to-teal-500',
  'from-amber-300 to-orange-500',
  'from-rose-300 to-pink-500',
  'from-violet-300 to-indigo-500',
  'from-lime-300 to-green-500',
  'from-fuchsia-300 to-purple-500',
];

const pickRandom = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const createRandomPiece = (): Piece => {
  const shape = pickRandom(PIECE_SHAPES);

  return {
    id: crypto.randomUUID(),
    shapeId: shape.id,
    name: shape.name,
    cells: shape.cells,
    color: pickRandom(COLORS),
  };
};

export const createPieceSet = (): Piece[] => [createRandomPiece(), createRandomPiece(), createRandomPiece()];

export const getPieceBounds = (piece: Piece) => ({
  rows: Math.max(...piece.cells.map((cell) => cell.row)) + 1,
  cols: Math.max(...piece.cells.map((cell) => cell.col)) + 1,
});
