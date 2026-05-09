import { RotateCcw, Sparkles, Trophy } from 'lucide-react';

interface ScorePanelProps {
  score: number;
  bestScore: number;
  combo: number;
  onRestart: () => void;
}

export const ScorePanel = ({ score, bestScore, combo, onRestart }: ScorePanelProps) => (
  <header className="flex w-full max-w-[980px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700/80">Block Grid</p>
      <h1 className="mt-1 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Block Grid</h1>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-lg shadow-slate-900/8 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Score</p>
        <p className="text-2xl font-black tabular-nums text-slate-950">{score}</p>
      </div>

      <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-lg shadow-slate-900/8 backdrop-blur">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          Best
        </p>
        <p className="text-2xl font-black tabular-nums text-slate-950">{bestScore}</p>
      </div>

      <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-lg shadow-slate-900/8 backdrop-blur">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
          Combo
        </p>
        <p className="text-2xl font-black tabular-nums text-slate-950">x{combo}</p>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex h-[66px] items-center gap-2 rounded-2xl bg-slate-950 px-5 font-bold text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        <RotateCcw className="h-5 w-5" />
        Restart
      </button>
    </div>
  </header>
);
