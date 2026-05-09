import { RotateCcw } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

export const GameOverModal = ({ score, bestScore, onRestart }: GameOverModalProps) => (
  <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-5 backdrop-blur-sm">
    <div className="w-full max-w-md animate-pop-in rounded-[28px] border border-white/75 bg-white/90 p-7 text-center shadow-2xl shadow-slate-950/25">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-700">Game Over</p>
      <h2 className="mt-2 text-4xl font-black text-slate-950">Nice run</h2>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Score</p>
          <p className="text-3xl font-black tabular-nums text-slate-950">{score}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Best</p>
          <p className="text-3xl font-black tabular-nums text-slate-950">{bestScore}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 font-bold text-white shadow-xl shadow-slate-950/20 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        <RotateCcw className="h-5 w-5" />
        Play again
      </button>
    </div>
  </div>
);
