import { DragGhost } from './components/DragGhost';
import { GameBoard } from './components/GameBoard';
import { GameOverModal } from './components/GameOverModal';
import { PieceTray } from './components/PieceTray';
import { ScorePanel } from './components/ScorePanel';
import { useDragPlacement } from './hooks/useDragPlacement';
import { useGame } from './hooks/useGame';

export const App = () => {
  const game = useGame();
  const drag = useDragPlacement({
    board: game.board,
    onPlace: game.place,
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,.22),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_48%,_#fff7ed_100%)] px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-6xl flex-col items-center gap-6">
        <ScorePanel score={game.score} bestScore={game.bestScore} combo={game.combo} onRestart={game.restart} />

        <section className="flex w-full flex-1 flex-col items-center justify-center gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex flex-col items-center gap-5">
            <GameBoard
              board={game.board}
              boardRef={drag.boardRef}
              preview={drag.preview}
              lastInvalid={drag.lastInvalid}
              clearingCells={game.clearingCells}
              particles={game.particles}
            />
          </div>

          <aside className="flex w-full max-w-[620px] flex-col items-center gap-4 lg:max-w-[300px]">
            <div className="w-full rounded-[24px] border border-white/70 bg-white/58 p-4 shadow-xl shadow-slate-900/8 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">Pieces</h2>
                {game.isClearing && <span className="text-xs font-bold text-cyan-700">Clearing</span>}
              </div>
              <PieceTray
                pieces={game.pieces}
                draggingId={drag.dragState?.piece.id}
                onStartDrag={drag.startDrag}
              />
            </div>
          </aside>
        </section>
      </div>

      {drag.dragState && <DragGhost piece={drag.dragState.piece} x={drag.dragState.x} y={drag.dragState.y} />}
      {game.isGameOver && <GameOverModal score={game.score} bestScore={game.bestScore} onRestart={game.restart} />}
    </main>
  );
};
