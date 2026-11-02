import React, { useState, useEffect } from 'react';
import { Language, SunnahItem } from '../../types';
import { DAILY_SUNNAHS } from '../../data/sunnahData';
import { 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Utensils, 
  Moon, 
  Droplet, 
  Compass, 
  Smile, 
  Check, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface SunnahViewProps {
  language: Language;
}

export const SunnahView: React.FC<SunnahViewProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedSunnahs, setCompletedSunnahs] = useState<string[]>(() => {
    try {
      const todayKey = `sunnah_habits_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = [
    { id: 'all', label: 'All Sunnahs', icon: Sparkles },
    { id: 'eating', label: 'Eating', icon: Utensils },
    { id: 'drinking', label: 'Drinking Water', icon: Droplet },
    { id: 'sleeping', label: 'Sleeping', icon: Moon },
    { id: 'travelling', label: 'Travelling', icon: Compass },
    { id: 'grooming', label: 'Grooming & Miswak', icon: CheckCircle2 },
    { id: 'greeting', label: 'Greeting & Smile', icon: Smile },
  ];

  const toggleComplete = (id: string) => {
    const todayKey = `sunnah_habits_${new Date().toISOString().slice(0, 10)}`;
    let updated: string[];
    if (completedSunnahs.includes(id)) {
      updated = completedSunnahs.filter(x => x !== id);
    } else {
      updated = [...completedSunnahs, id];
    }
    setCompletedSunnahs(updated);
    try {
      localStorage.setItem(todayKey, JSON.stringify(updated));
    } catch {
      // Storage handled
    }
  };

  const progressPercent = Math.round((completedSunnahs.length / DAILY_SUNNAHS.length) * 100);

  const filteredSunnahs = DAILY_SUNNAHS.filter(s => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 border border-emerald-600/40 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-700/50 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Way of the Prophet ﷺ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              سُنَنُ النَّبِيِّ ﷺ الْيَوْمِيَّةُ
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              Daily Sunnah practices for eating, sleeping, drinking, travelling, and daily manners.
            </p>
          </div>
          <div className="hidden sm:block font-arabic text-4xl text-amber-300/30">
            سُنَّة
          </div>
        </div>

        {/* Daily Habits Progress Bar */}
        <div className="mt-4 pt-3.5 border-t border-emerald-800/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-amber-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Today's Practiced Sunnahs:</span>
            </span>
            <span className="font-mono font-bold text-white">
              {completedSunnahs.length} / {DAILY_SUNNAHS.length} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-emerald-950 rounded-full h-2.5 overflow-hidden border border-emerald-700/50">
            <div 
              style={{ width: `${progressPercent}%` }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-300 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
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

      {/* Sunnah Cards List */}
      <div className="space-y-3">
        {filteredSunnahs.map(sunnah => {
          const isDone = completedSunnahs.includes(sunnah.id);
          return (
            <div
              key={sunnah.id}
              className={`rounded-2xl p-4 transition border ${
                isDone 
                  ? 'bg-emerald-950/60 border-emerald-600/60 shadow-md ring-1 ring-emerald-500/30' 
                  : 'bg-slate-900/90 border-slate-800/80 hover:border-emerald-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(sunnah.id)}
                    title={isDone ? "Mark as uncompleted" : "Mark practiced today"}
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition border ${
                      isDone 
                        ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow' 
                        : 'bg-slate-800 text-transparent border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${isDone ? 'stroke-[3]' : ''}`} />
                  </button>

                  <div>
                    <h4 className={`text-sm font-bold ${isDone ? 'text-amber-300' : 'text-white'}`}>
                      {sunnah.titleEn}
                    </h4>
                    <p className="font-arabic text-xs text-amber-200/90 mt-0.5">
                      {sunnah.titleUr}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 bg-slate-800/70 px-2 py-0.5 rounded-full border border-slate-700 whitespace-nowrap">
                  {sunnah.reference}
                </span>
              </div>

              <div className="mt-2 pl-9 text-xs text-slate-300 leading-relaxed space-y-1.5">
                <p>{sunnah.descriptionEn}</p>
                <p className="font-arabic text-slate-400 text-right">{sunnah.descriptionUr}</p>

                {sunnah.arabicSupplication && (
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
                    <span className="text-[10px] font-bold text-amber-400 block mb-0.5">مسنون دعا:</span>
                    <div className="font-quran text-base text-amber-100 py-1">
                      {sunnah.arabicSupplication}
                    </div>
                    {sunnah.transliteration && (
                      <p className="text-left text-[11px] italic text-emerald-400 font-sans pt-1 border-t border-slate-800">
                        {sunnah.transliteration}
                      </p>
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
