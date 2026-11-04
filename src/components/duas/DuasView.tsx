import React, { useState } from 'react';
import { DuaItem, Language } from '../../types';
import { DAILY_DUAS } from '../../data/duaData';
import { 
  HeartHandshake, 
  Search, 
  Play, 
  Pause, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles,
  Sun,
  Moon,
  Compass,
  Utensils,
  Home,
  Shield,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { soundManager } from '../../utils/audioPlayer';

interface DuasViewProps {
  language: Language;
}

export const DuasView: React.FC<DuasViewProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playingUrduId, setPlayingUrduId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [counters, setCounters] = useState<Record<string, number>>({});

  const categories = [
    { id: 'all', label: 'All Duas', icon: Sparkles },
    { id: 'morning_evening', label: 'Morning & Evening', icon: Sun },
    { id: 'sleeping', label: 'Sleeping & Waking', icon: Moon },
    { id: 'eating', label: 'Food & Drink', icon: Utensils },
    { id: 'masjid', label: 'Masjid', icon: HeartHandshake },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'protection', label: 'Distress & Protection', icon: Shield },
    { id: 'forgiveness', label: 'Istighfar (Forgiveness)', icon: Sparkles },
  ];

  const handleToggleVoice = (dua: DuaItem) => {
    if (playingId === dua.id) {
      soundManager.stopAudio();
      setPlayingId(null);
      return;
    }

    soundManager.stopAudio();
    setPlayingUrduId(null);
    setPlayingId(dua.id);
    soundManager.speakText(dua.arabicText, 'ar-SA', () => {
      setPlayingId(null);
    });
  };

  const handleToggleUrduVoice = (dua: DuaItem) => {
    if (playingUrduId === dua.id) {
      soundManager.stopAudio();
      setPlayingUrduId(null);
      return;
    }

    soundManager.stopAudio();
    setPlayingId(null);
    setPlayingUrduId(dua.id);
    soundManager.speakTranslation(dua.translationUr, 'ur', () => {
      setPlayingUrduId(null);
    });
  };

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.titleEn} (${dua.titleUr})\nReference: ${dua.reference}\n\n${dua.arabicText}\n\nEnglish: ${dua.translationEn}\n\nUrdu: ${dua.translationUr}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const incrementCounter = (id: string, max = 100) => {
    setCounters(prev => {
      const current = prev[id] || 0;
      soundManager.playTasbeehClick(current + 1 >= max);
      return { ...prev, [id]: current + 1 };
    });
  };

  const resetCounter = (id: string) => {
    setCounters(prev => ({ ...prev, [id]: 0 }));
  };

  const filteredDuas = DAILY_DUAS.filter(d => {
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.titleEn.toLowerCase().includes(q) ||
      d.titleUr.includes(q) ||
      d.arabicText.includes(q) ||
      d.translationEn.toLowerCase().includes(q) ||
      d.occasion.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-emerald-950 border border-rose-800/40 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-xs font-bold border border-rose-700/50 mb-1.5">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Hisn al-Muslim (Fortress of the Muslim)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              الأَدْعِيَةُ وَالأَذْكَارُ الْمَأْثُورَةُ
            </h2>
            <p className="text-xs text-rose-100/90 mt-0.5">
              Daily authentic supplications for morning, evening, sleeping, eating, travelling & protection.
            </p>
          </div>
          <div className="hidden sm:block font-arabic text-4xl text-amber-300/30">
            دُعَاء
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map(c => {
          const Icon = c.icon;
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
                isSelected 
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-md' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search supplications (e.g. morning, waking, eating, evil eye)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 shadow-sm"
        />
      </div>

      {/* Duas Stream */}
      <div className="space-y-4">
        {filteredDuas.map(dua => {
          const currentCount = counters[dua.id] || 0;
          const target = dua.recommendedRepeat || 1;

          return (
            <div
              key={dua.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-lg space-y-3 hover:border-emerald-700/60 transition"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{dua.titleEn}</h4>
                  <p className="font-arabic text-amber-300 text-xs mt-0.5">{dua.titleUr}</p>
                  <p className="text-[11px] text-slate-400">{dua.occasion}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(dua)}
                    title="Copy Dua"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                  >
                    {copiedId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleToggleVoice(dua)}
                    title={playingId === dua.id ? "Stop Recitation" : "Listen in Male Voice"}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      playingId === dua.id 
                        ? 'bg-amber-400 text-emerald-950 animate-pulse' 
                        : 'bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
                    }`}
                  >
                    {playingId === dua.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{playingId === dua.id ? 'Stop' : 'دعا سنیں (مردانہ آواز)'}</span>
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-right font-quran text-lg sm:text-xl text-amber-100 font-bold leading-relaxed select-text">
                {dua.arabicText}
              </div>

              {/* Transliteration */}
              {dua.transliterationEn && (
                <p className="text-xs italic text-emerald-300 font-sans">
                  {dua.transliterationEn}
                </p>
              )}

              {/* Urdu & English Translations */}
              <div className="space-y-1.5 text-xs text-slate-200 leading-relaxed pt-1">
                <p>
                  <strong className="text-amber-400 block text-xs mb-0.5">English Translation:</strong>
                  {dua.translationEn}
                </p>

                <div className="pt-2 border-t border-slate-800 text-right space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleToggleUrduVoice(dua)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                        playingUrduId === dua.id
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950 text-amber-300 border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {playingUrduId === dua.id ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{playingUrduId === dua.id ? 'Stop' : 'ترجمہ سنیں (مردانہ آواز)'}</span>
                    </button>
                    <strong className="text-amber-400 text-xs font-sans">اردو ترجمہ:</strong>
                  </div>
                  <p className="font-arabic text-amber-100/90 leading-relaxed">
                    {dua.translationUr}
                  </p>
                </div>
              </div>

              {/* Footer: Reference & Interactive Tap Counter */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Ref: <strong className="text-slate-300">{dua.reference}</strong>
                </span>

                {target > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => incrementCounter(dua.id, target)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold font-mono shadow transition"
                    >
                      <span>Tap: {currentCount} / {target}</span>
                    </button>
                    {currentCount > 0 && (
                      <button
                        onClick={() => resetCounter(dua.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-slate-300"
                        title="Reset counter"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
