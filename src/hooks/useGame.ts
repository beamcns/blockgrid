import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Board, type Particle, type Piece, type Point } from '../types/game';
import { playSound } from '../utils/audio';
import {
  calculateScore,
  canAnyPieceFit,
  canPlacePiece,
  clearCompletedLines,
  createEmptyBoard,
  getAbsoluteCells,
  placePiece,
} from '../utils/gameLogic';
import { createPieceSet } from '../utils/pieces';

const BEST_SCORE_KEY = 'block-grid-best-score';
const CLEAR_ANIMATION_MS = 420;

const readBestScore = () => {
  const stored = Number.parseInt(localStorage.getItem(BEST_SCORE_KEY) ?? '0', 10);
  return Number.isFinite(stored) ? stored : 0;
};

export const useGame = () => {
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [pieces, setPieces] = useState<Array<Piece | null>>(() => createPieceSet());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(readBestScore);
  const [combo, setCombo] = useState(0);
  const [clearingCells, setClearingCells] = useState<Point[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const availablePieces = useMemo(() => pieces.filter((piece): piece is Piece => Boolean(piece)), [pieces]);

  const commitScore = useCallback(
    (nextScore: number) => {
      setScore(nextScore);

      if (nextScore > bestScore) {
        setBestScore(nextScore);
        localStorage.setItem(BEST_SCORE_KEY, String(nextScore));
      }
    },
    [bestScore],
  );

  const restart = useCallback(() => {
    setBoard(createEmptyBoard());
    setPieces(createPieceSet());
    setScore(0);
    setCombo(0);
    setClearingCells([]);
    setParticles([]);
    setIsClearing(false);
    setIsGameOver(false);
  }, []);

  const canPlace = useCallback((piece: Piece, origin: Point) => canPlacePiece(board, piece, origin), [board]);

  const place = useCallback(
    (piece: Piece, pieceIndex: number, origin: Point) => {
      if (isClearing || isGameOver || !canPlacePiece(board, piece, origin)) {
        playSound('invalid');
        return false;
      }

      const placedBoard = placePiece(board, piece, origin);
      const clearResult = clearCompletedLines(placedBoard);
      const clearedLines = clearResult.rows.length + clearResult.cols.length;
      const nextCombo = clearedLines > 0 ? combo + 1 : 0;
      const nextScore = score + calculateScore(piece, clearedLines, nextCombo);
      const remainingPieces = pieces.map((candidate, index) => (index === pieceIndex ? null : candidate));
      const refillPieces = remainingPieces.every((candidate) => candidate === null) ? createPieceSet() : remainingPieces;

      commitScore(nextScore);

      if (clearResult.clearedCells.length > 0) {
        const newParticles = getAbsoluteCells(piece, origin).map(({ row, col }) => ({
          id: crypto.randomUUID(),
          x: (col + 0.5) * 12.5,
          y: (row + 0.5) * 12.5,
          color: piece.color,
        }));

        setBoard(placedBoard);
        setPieces(remainingPieces);
        setCombo(nextCombo);
        setClearingCells(clearResult.clearedCells);
        setParticles((current) => [...current, ...newParticles]);
        setIsClearing(true);
        playSound('clear');

        window.setTimeout(() => {
          setBoard(clearResult.board);
          setPieces(refillPieces);
          setClearingCells([]);
          setIsClearing(false);
        }, CLEAR_ANIMATION_MS);

        window.setTimeout(() => {
          setParticles((current) => current.filter((particle) => !newParticles.some((next) => next.id === particle.id)));
        }, 820);
      } else {
        setBoard(placedBoard);
        setPieces(refillPieces);
        setCombo(0);
        playSound('place');
      }

      return true;
    },
    [board, combo, commitScore, isClearing, isGameOver, pieces, score],
  );

  useEffect(() => {
    if (isClearing || isGameOver) {
      return;
    }

    if (availablePieces.length > 0 && !canAnyPieceFit(board, availablePieces)) {
      setIsGameOver(true);
      playSound('gameOver');
    }
  }, [availablePieces, board, isClearing, isGameOver]);

  return {
    board,
    pieces,
    availablePieces,
    score,
    bestScore,
    combo,
    clearingCells,
    particles,
    isGameOver,
    isClearing,
    canPlace,
    place,
    restart,
  };
};
