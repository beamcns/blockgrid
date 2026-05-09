type SoundType = 'place' | 'clear' | 'invalid' | 'gameOver';

const frequencies: Record<SoundType, number[]> = {
  place: [420, 560],
  clear: [620, 780, 960],
  invalid: [170],
  gameOver: [260, 200, 150],
};

export const playSound = (type: SoundType) => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.gain.setValueAtTime(type === 'invalid' ? 0.035 : 0.055, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.24);
  gain.connect(context.destination);

  frequencies[type].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = type === 'clear' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.045);
    oscillator.connect(gain);
    oscillator.start(context.currentTime + index * 0.045);
    oscillator.stop(context.currentTime + index * 0.045 + 0.12);
  });
};

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
