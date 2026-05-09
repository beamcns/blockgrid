import type { Piece } from '../types/game';
import { PiecePreview } from './PiecePreview';

interface DragGhostProps {
  piece: Piece;
  x: number;
  y: number;
}

export const DragGhost = ({ piece, x, y }: DragGhostProps) => (
  <div
    className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/30 p-3 shadow-2xl shadow-slate-950/20 backdrop-blur-sm"
    style={{ left: x, top: y }}
  >
    <PiecePreview piece={piece} compact />
  </div>
);
