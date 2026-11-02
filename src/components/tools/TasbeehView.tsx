import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audioPlayer';
import { 
  ArrowLeft, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Layers, 
  Check, 
  Vibrate, 
  Award,
  Plus
} from 'lucide-react';

interface TasbeehViewProps {
  onBack: () => void;
}

interface ZikrPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  target: number;
}

export const TasbeehView: React.FC<TasbeehViewProps> = ({ onBack }) => {
  const PRESETS: ZikrPreset[] = [
    { id: 'subhanallah', nameAr: 'سُبْحَانَ اللَّهِ', nameEn: 'SubhanAllah (Glory be to Allah)', target: 33 },
    { id: 'alhamdulillah', nameAr: 'الْحَمْدُ لِلَّهِ', nameEn: 'Alhamdulillah (All praise to Allah)', target: 33 },
    { id: 'allahuakbar', nameAr: 'اللَّهُ أَكْبَرُ', nameEn: 'Allahu Akbar (Allah is the Greatest)', target: 34 },
    { id: 'astaghfirullah', nameAr: 'أَسْتَغْفِرُ اللَّهَ', nameEn: 'Astaghfirullah (I seek Allah\'s forgiveness)', target: 100 },
    { id: 'lailahaillallah', nameAr: 'لَا إِلَٰهَ إِلَّا اللَّهُ', nameEn: 'La ilaha illallah (None worthy of worship but Allah)', target: 100 },
    { id: 'durood', nameAr: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', nameEn: 'Salawat / Durood upon the Prophet ﷺ', target: 100 },
    { id: 'ayat_karima', nameAr: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ', nameEn: 'Ayat Karima (Dua of Yunus AS)', target: 100 }
  ];

  const [selectedPreset, setSelectedPreset] = useState<ZikrPreset>(PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [totalLifetimeBeads, setTotalLifetimeBeads] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tasbeeh_lifetime_total');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);

  const handleTap = () => {
    const nextCount = count + 1;
    const isTargetHit = nextCount >= selectedPreset.target;

    if (soundEnabled) {
      soundManager.playTasbeehClick(isTargetHit);
    }

    if (vibrationEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(isTargetHit ? [70, 40, 70] : 15);
    }

    if (isTargetHit) {
      setCount(0);
      setCompletedCycles(c => c + 1);
    } else {
      setCount(nextCount);
    }

    const nextTotal = totalLifetimeBeads + 1;
    setTotalLifetimeBeads(nextTotal);
    try {
      localStorage.setItem('tasbeeh_lifetime_total', nextTotal.toString());
    } catch {}
  };

  const handleReset = () => {
    setCount(0);
    setCompletedCycles(0);
  };

  const progress = Math.min(100, Math.round((count / selectedPreset.target) * 100));

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tools</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs transition ${
              soundEnabled ? 'bg-emerald-900 text-amber-300 border-emerald-600' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle bead click sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Reset current counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPreset(p);
              setCount(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
              selectedPreset.id === p.id 
                ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-md' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <span>{p.nameAr}</span>
            <span className="font-mono text-[10px] ml-1.5 opacity-80">({p.target})</span>
          </button>
        ))}
      </div>

      {/* Main Digital Tasbeeh Interactive Counter Card */}
      <div className="rounded-3xl bg-slate-900 border border-emerald-700/60 p-6 shadow-2xl flex flex-col items-center justify-center text-center space-y-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
            Selected Dhikr & Glorification
          </span>
          <div className="font-quran text-2xl sm:text-3xl text-emerald-200 font-bold mt-1">
            {selectedPreset.nameAr}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {selectedPreset.nameEn}
          </p>
        </div>

        {/* Big Tactile Bead / Tap Button */}
        <button
          onClick={handleTap}
          className="relative w-56 h-56 rounded-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 border-8 border-amber-400/80 shadow-2xl flex flex-col items-center justify-center active:scale-95 transition transform cursor-pointer ring-4 ring-amber-400/30 group"
        >
          {/* Subtle Ring Progress */}
          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-white tracking-tight drop-shadow">
            {count}
          </div>
          <span className="text-xs text-amber-300 font-bold mt-1 font-mono uppercase tracking-wider">
            Target: {selectedPreset.target}
          </span>
          <span className="text-[10px] text-emerald-200/80 mt-1 uppercase font-semibold">
            TAP ANYWHERE TO COUNT
          </span>
        </button>

        {/* Progress Bar */}
        <div className="w-full max-w-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Round Progress</span>
            <span className="font-mono text-amber-300 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div 
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-150 rounded-full"
            />
          </div>
        </div>

        {/* Statistics & Cycles */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Completed Rounds</span>
            <span className="text-xl font-bold font-mono text-amber-300">{completedCycles}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Total Lifetime Beads</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{totalLifetimeBeads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
