import { type Piece } from '../types/game';
import { getPieceBounds } from '../utils/pieces';

interface PiecePreviewProps {
  piece: Piece;
  isDragging?: boolean;
  compact?: boolean;
}

export const PiecePreview = ({ piece, isDragging = false, compact = false }: PiecePreviewProps) => {
  const bounds = getPieceBounds(piece);
  const cellSet = new Set(piece.cells.map((cell) => `${cell.row}-${cell.col}`));
  const sizeClass = compact ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-6 w-6 sm:h-7 sm:w-7';

  return (
    <div
      className="grid place-content-center gap-1"
      style={{
        gridTemplateColumns: `repeat(${bounds.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${bounds.rows}, minmax(0, 1fr))`,
      }}
      aria-label={piece.name}
    >
      {Array.from({ length: bounds.rows * bounds.cols }, (_, index) => {
        const row = Math.floor(index / bounds.cols);
        const col = index % bounds.cols;
        const filled = cellSet.has(`${row}-${col}`);

        return (
          <span
            key={`${row}-${col}`}
            className={[
              sizeClass,
              'rounded-[8px] transition-transform duration-200',
              filled ? `bg-gradient-to-br ${piece.color} shadow-tile` : 'opacity-0',
              isDragging && filled ? 'scale-105' : '',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
};
