import { BOARD_SIZE, type Board, type Particle, type PlacementPreview, type Point } from '../types/game';
import { pointKey } from '../utils/gameLogic';
import { Tile } from './Tile';

interface GameBoardProps {
  board: Board;
  boardRef: React.RefObject<HTMLDivElement | null>;
  preview: PlacementPreview | null;
  lastInvalid: Point | null;
  clearingCells: Point[];
  particles: Particle[];
}

export const GameBoard = ({ board, boardRef, preview, lastInvalid, clearingCells, particles }: GameBoardProps) => {
  const previewMap = new Map(preview?.cells.map((cell) => [pointKey(cell), preview.isValid]) ?? []);
  const clearingSet = new Set(clearingCells.map(pointKey));
  const invalidKey = lastInvalid ? pointKey(lastInvalid) : null;

  return (
    <div className="relative aspect-square w-[min(86vw,520px)] shrink-0 touch-none">
      <div
        ref={boardRef}
        className="grid aspect-square w-full grid-cols-8 gap-1.5 rounded-[26px] border border-white/70 bg-white/72 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur md:gap-2 md:p-4"
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const previewValid = previewMap.get(key);

            return (
              <Tile
                key={key}
                color={cell}
                isPreview={previewMap.has(key)}
                isInvalid={previewValid === false || invalidKey === key}
                isClearing={clearingSet.has(key)}
              />
            );
          }),
        )}
      </div>

      {Array.from({ length: BOARD_SIZE - 1 }, (_, index) => (
        <div
          key={`v-${index}`}
          className="pointer-events-none absolute bottom-3 top-3 hidden w-px bg-white/35 md:block"
          style={{ left: `${((index + 1) / BOARD_SIZE) * 100}%` }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`absolute h-2.5 w-2.5 animate-float-up rounded-full bg-gradient-to-br ${particle.color} shadow-glow`}
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          />
        ))}
      </div>
    </div>
  );
};
