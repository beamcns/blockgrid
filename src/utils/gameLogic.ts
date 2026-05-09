import { BOARD_SIZE, type Board, type ClearResult, type Piece, type Point } from '../types/game';

export const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null));

export const canPlacePiece = (board: Board, piece: Piece, origin: Point): boolean =>
  piece.cells.every(({ row, col }) => {
    const targetRow = origin.row + row;
    const targetCol = origin.col + col;

    return (
      targetRow >= 0 &&
      targetRow < BOARD_SIZE &&
      targetCol >= 0 &&
      targetCol < BOARD_SIZE &&
      board[targetRow][targetCol] === null
    );
  });

export const getAbsoluteCells = (piece: Piece, origin: Point): Point[] =>
  piece.cells.map(({ row, col }) => ({ row: origin.row + row, col: origin.col + col }));

export const placePiece = (board: Board, piece: Piece, origin: Point): Board => {
  const nextBoard = board.map((row) => [...row]);

  getAbsoluteCells(piece, origin).forEach(({ row, col }) => {
    nextBoard[row][col] = piece.color;
  });

  return nextBoard;
};

export const findCompletedLines = (board: Board) => {
  const rows = board.flatMap((row, index) => (row.every(Boolean) ? [index] : []));
  const cols = Array.from({ length: BOARD_SIZE }, (_, col) => col).filter((col) =>
    board.every((row) => Boolean(row[col])),
  );

  return { rows, cols };
};

export const clearCompletedLines = (board: Board): ClearResult => {
  const { rows, cols } = findCompletedLines(board);
  const clearedCells: Point[] = [];

  const nextBoard = board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell && (rows.includes(rowIndex) || cols.includes(colIndex))) {
        clearedCells.push({ row: rowIndex, col: colIndex });
        return null;
      }

      return cell;
    }),
  );

  return { board: nextBoard, rows, cols, clearedCells };
};

export const canAnyPieceFit = (board: Board, pieces: Piece[]): boolean =>
  pieces.some((piece) =>
    Array.from({ length: BOARD_SIZE }, (_, row) =>
      Array.from({ length: BOARD_SIZE }, (_, col) => canPlacePiece(board, piece, { row, col })).some(Boolean),
    ).some(Boolean),
  );

export const calculateScore = (piece: Piece, clearedCount: number, combo: number): number => {
  const placementScore = piece.cells.length * 6;
  const lineScore = clearedCount > 0 ? clearedCount * clearedCount * 42 : 0;
  const comboScore = clearedCount > 0 ? combo * 35 : 0;

  return placementScore + lineScore + comboScore;
};

export const pointKey = ({ row, col }: Point) => `${row}-${col}`;
