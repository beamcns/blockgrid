interface TileProps {
  color?: string | null;
  isPreview?: boolean;
  isInvalid?: boolean;
  isClearing?: boolean;
  className?: string;
}

export const Tile = ({ color, isPreview = false, isInvalid = false, isClearing = false, className = '' }: TileProps) => {
  const filledClasses = color
    ? `bg-gradient-to-br ${color} shadow-tile`
    : 'bg-slate-100/80 shadow-inner shadow-slate-300/50';
  const previewClasses = isInvalid
    ? 'bg-rose-400/50 ring-2 ring-rose-300/80'
    : 'bg-cyan-300/40 ring-2 ring-cyan-200/90';

  return (
    <div
      className={[
        'aspect-square rounded-[10px] transition-all duration-200',
        color ? filledClasses : filledClasses,
        isPreview ? previewClasses : '',
        isClearing ? 'animate-clear-cell' : '',
        className,
      ].join(' ')}
    />
  );
};
