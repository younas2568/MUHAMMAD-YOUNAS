import React, { useState } from 'react';
import { Language, Kalma } from '../../types';
import { SIX_KALMAS } from '../../data/kalmaData';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Check, 
  Copy,
  BookOpen
} from 'lucide-react';
import { soundManager } from '../../utils/audioPlayer';

interface KalmasViewProps {
  language: Language;
}

export const KalmasView: React.FC<KalmasViewProps> = ({ language }) => {
  const [selectedKalmaId, setSelectedKalmaId] = useState<number>(1);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [playingUrduId, setPlayingUrduId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const selectedKalma = SIX_KALMAS.find(k => k.id === selectedKalmaId) || SIX_KALMAS[0];

  const handleToggleAudio = (kalma: Kalma) => {
    if (playingId === kalma.id) {
      soundManager.stopAudio();
      setPlayingId(null);
      return;
    }

    soundManager.stopAudio();
    setPlayingUrduId(null);
    setPlayingId(kalma.id);
    soundManager.speakText(kalma.arabicText, 'ar-SA', () => {
      setPlayingId(null);
    });
  };

  const handleToggleUrduAudio = (kalma: Kalma) => {
    if (playingUrduId === kalma.id) {
      soundManager.stopAudio();
      setPlayingUrduId(null);
      return;
    }

    soundManager.stopAudio();
    setPlayingId(null);
    setPlayingUrduId(kalma.id);
    soundManager.speakTranslation(kalma.translationUr, 'ur', () => {
      setPlayingUrduId(null);
    });
  };

  const handleCopy = (kalma: Kalma) => {
    const text = `${kalma.nameEn} (${kalma.nameUr})\n\n${kalma.arabicText}\n\nTranslation: ${kalma.translationEn}\n\nUrdu: ${kalma.translationUr}`;
    navigator.clipboard.writeText(text);
    setCopiedId(kalma.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 border border-emerald-600/40 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-700/50 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Foundations of Islamic Belief</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              الكَلِمَاتُ السِّتُّ الإِسْلَامِيَّةُ
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              The Six Kalmas of Islam with Arabic tashkeel, Urdu & English translations, and audio recitation.
            </p>
          </div>
          <div className="hidden sm:block font-arabic text-4xl text-amber-300/30">
            كَلِمَات
          </div>
        </div>
      </div>

      {/* Kalma 1 to 6 Horizontal Pill Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SIX_KALMAS.map(k => {
          const isSelected = selectedKalmaId === k.id;
          return (
            <button
              key={k.id}
              onClick={() => {
                setSelectedKalmaId(k.id);
                soundManager.stopAudio();
                setPlayingId(null);
              }}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                isSelected 
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-md ring-2 ring-amber-400/30' 
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-emerald-700/60'
              }`}
            >
              <span className="text-[11px] font-mono font-extrabold uppercase">
                Kalima {k.id}
              </span>
              <span className={`text-xs font-arabic mt-0.5 ${isSelected ? 'text-emerald-950 font-bold' : 'text-amber-400'}`}>
                {k.nameAr.split(' ')[1] || k.nameAr}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Kalma Card */}
      <div className="rounded-3xl bg-slate-900 border border-emerald-700/60 p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 font-bold text-xs flex items-center justify-center shadow">
                {selectedKalma.id}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {selectedKalma.nameEn}
              </h3>
            </div>
            <p className="font-arabic text-sm text-amber-300 mt-0.5 pl-9">
              {selectedKalma.nameUr} • {selectedKalma.meaningEn}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleCopy(selectedKalma)}
              title="Copy Kalima text and translation"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {copiedId === selectedKalma.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleToggleAudio(selectedKalma)}
              title={playingId === selectedKalma.id ? "Stop Recitation" : "Listen to Kalma Recitation"}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-md transition ${
                playingId === selectedKalma.id 
                  ? 'bg-amber-400 text-emerald-950 animate-pulse' 
                  : 'bg-emerald-900 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-200'
              }`}
            >
              {playingId === selectedKalma.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-300" />}
              <span>{playingId === selectedKalma.id ? 'Stop' : 'Recite'}</span>
            </button>
          </div>
        </div>

        {/* Vocalized Arabic Calligraphy Box */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-950 border border-emerald-800/60 p-5 text-right shadow-inner space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 float-left">
            Arabic Text with Tashkeel
          </span>
          <div className="clear-both font-quran text-2xl sm:text-3xl text-amber-100 font-bold leading-loose select-text py-2">
            {selectedKalma.arabicText}
          </div>

          <p className="text-left text-xs sm:text-sm italic text-emerald-300 font-sans pt-2 border-t border-emerald-900/40">
            {selectedKalma.transliterationEn}
          </p>
        </div>

        {/* Urdu & English Translations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-right space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleToggleUrduAudio(selectedKalma)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                  playingUrduId === selectedKalma.id
                    ? 'bg-amber-400 text-emerald-950 border-amber-300'
                    : 'bg-emerald-950 text-amber-300 border-emerald-800 hover:bg-emerald-900'
                }`}
              >
                {playingUrduId === selectedKalma.id ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{playingUrduId === selectedKalma.id ? 'Stop' : 'ترجمہ سنیں (مردانہ آواز)'}</span>
              </button>
              <span className="text-xs font-bold text-amber-400">اردو ترجمہ:</span>
            </div>
            <p className="font-arabic text-sm text-slate-100 leading-relaxed">
              {selectedKalma.translationUr}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs font-bold text-amber-400 block mb-1.5">English Translation:</span>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              {selectedKalma.translationEn}
            </p>
          </div>
        </div>

        {/* Spiritual Virtues & Hadith Proof */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700/40 text-xs text-slate-300 leading-relaxed space-y-1">
          <strong className="text-amber-300 text-xs flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Virtues & Benefits:</span>
          </strong>
          <p className="text-emerald-100/90">{selectedKalma.benefits}</p>
        </div>
      </div>
    </div>
  );
};
