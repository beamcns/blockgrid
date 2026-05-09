import { useCallback, useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, type Piece, type PlacementPreview, type Point } from '../types/game';
import { canPlacePiece, getAbsoluteCells } from '../utils/gameLogic';
import type { Board } from '../types/game';

interface DragState {
  piece: Piece;
  pieceIndex: number;
  pointerId: number;
  x: number;
  y: number;
  origin: Point | null;
}

interface UseDragPlacementOptions {
  board: Board;
  onPlace: (piece: Piece, pieceIndex: number, origin: Point) => boolean;
}

const getBoardOriginFromPointer = (boardElement: HTMLDivElement | null, x: number, y: number): Point | null => {
  if (!boardElement) {
    return null;
  }

  const rect = boardElement.getBoundingClientRect();

  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    return null;
  }

  const cellSize = rect.width / BOARD_SIZE;

  return {
    row: Math.floor((y - rect.top) / cellSize),
    col: Math.floor((x - rect.left) / cellSize),
  };
};

export const useDragPlacement = ({ board, onPlace }: UseDragPlacementOptions) => {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [lastInvalid, setLastInvalid] = useState<Point | null>(null);

  const preview: PlacementPreview | null = dragState?.origin
    ? {
        cells: getAbsoluteCells(dragState.piece, dragState.origin),
        isValid: canPlacePiece(board, dragState.piece, dragState.origin),
      }
    : null;

  const startDrag = useCallback(
    (piece: Piece, pieceIndex: number, event: React.PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      const origin = getBoardOriginFromPointer(boardRef.current, event.clientX, event.clientY);

      setDragState({
        piece,
        pieceIndex,
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        origin,
      });
    },
    [],
  );

  useEffect(() => {
    if (!dragState) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== dragState.pointerId) {
        return;
      }

      const origin = getBoardOriginFromPointer(boardRef.current, event.clientX, event.clientY);

      setDragState((current) =>
        current
          ? {
              ...current,
              x: event.clientX,
              y: event.clientY,
              origin,
            }
          : current,
      );
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== dragState.pointerId) {
        return;
      }

      const origin = getBoardOriginFromPointer(boardRef.current, event.clientX, event.clientY);

      if (origin && canPlacePiece(board, dragState.piece, origin)) {
        onPlace(dragState.piece, dragState.pieceIndex, origin);
      } else {
        setLastInvalid(origin);
        window.setTimeout(() => setLastInvalid(null), 240);
      }

      setDragState(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [board, dragState, onPlace]);

  return {
    boardRef,
    dragState,
    preview,
    lastInvalid,
    startDrag,
  };
};
