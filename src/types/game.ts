export const BOARD_SIZE = 8;

export type CellValue = string | null;
export type Board = CellValue[][];

export interface Point {
  row: number;
  col: number;
}

export interface PieceShape {
  id: string;
  name: string;
  cells: Point[];
}

export interface Piece {
  id: string;
  shapeId: string;
  name: string;
  cells: Point[];
  color: string;
}

export interface PlacementPreview {
  cells: Point[];
  isValid: boolean;
}

export interface ClearResult {
  board: Board;
  clearedCells: Point[];
  rows: number[];
  cols: number[];
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  color: string;
}
