import type { Piece } from '../types/game';
import { PiecePreview } from './PiecePreview';

interface PieceTrayProps {
  pieces: Array<Piece | null>;
  draggingId?: string;
  onStartDrag: (piece: Piece, pieceIndex: number, event: React.PointerEvent) => void;
}

export const PieceTray = ({ pieces, draggingId, onStartDrag }: PieceTrayProps) => (
  <section className="w-full max-w-[min(92vw,620px)]">
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {pieces.map((piece, index) => (
        <div
          key={piece?.id ?? `empty-${index}`}
          className="flex min-h-[116px] items-center justify-center rounded-[22px] border border-white/65 bg-white/62 p-3 shadow-lg shadow-slate-900/8 backdrop-blur transition-all duration-200 sm:min-h-[134px]"
        >
          {piece ? (
            <button
              type="button"
              className={[
                'grid h-full w-full touch-none place-items-center rounded-2xl transition duration-200',
                'hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300',
                draggingId === piece.id ? 'scale-95 opacity-40' : 'active:scale-95',
              ].join(' ')}
              onPointerDown={(event) => onStartDrag(piece, index, event)}
              aria-label={`Drag ${piece.name} piece`}
            >
              <PiecePreview piece={piece} isDragging={draggingId === piece.id} />
            </button>
          ) : (
            <div className="h-14 w-14 rounded-2xl border border-dashed border-slate-300/80 bg-slate-100/50" />
          )}
        </div>
      ))}
    </div>
  </section>
);
