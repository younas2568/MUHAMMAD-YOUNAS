import React, { useState } from 'react';
import { HadithItem, Language } from '../../types';
import { HADITH_COLLECTIONS } from '../../data/hadithData';
import { 
  ScrollText, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  CheckCircle2, 
  BookOpen, 
  Filter,
  Share2
} from 'lucide-react';

interface HadithViewProps {
  language: Language;
}

export const HadithView: React.FC<HadithViewProps> = ({ language }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedHadiths, setSavedHadiths] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_hadiths');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const collections = [
    'All',
    'Bukhari',
    'Muslim',
    'Abu Dawood',
    'Tirmidhi',
    'Nasai',
    'Ibn Majah',
    'Nawawi'
  ];

  const toggleSaveHadith = (id: string) => {
    let updated: string[];
    if (savedHadiths.includes(id)) {
      updated = savedHadiths.filter(x => x !== id);
    } else {
      updated = [...savedHadiths, id];
    }
    setSavedHadiths(updated);
    try {
      localStorage.setItem('saved_hadiths', JSON.stringify(updated));
    } catch {
      // Storage handled
    }
  };

  const handleCopy = (hadith: HadithItem) => {
    const text = `${hadith.reference} (${hadith.bookName})\nNarrator: ${hadith.narrator}\n\n${hadith.arabicText}\n\nEnglish: ${hadith.translationEn}\n\nUrdu: ${hadith.translationUr}`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHadiths = HADITH_COLLECTIONS.filter(h => {
    const matchesCollection = selectedCollection === 'All' || h.collection === selectedCollection;
    if (!matchesCollection) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.topic.toLowerCase().includes(q) ||
      h.translationEn.toLowerCase().includes(q) ||
      h.translationUr.includes(q) ||
      h.arabicText.includes(q) ||
      h.narrator.toLowerCase().includes(q) ||
      h.reference.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-cyan-950 to-blue-950 border border-emerald-600/40 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-700/50 mb-1.5">
              <ScrollText className="w-3.5 h-3.5" />
              <span>Kutub al-Sittah (The Six Books)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              صَحِيحُ السُّنَّةِ وَالأَحَادِيثُ النَّبَوِيَّةُ
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              Authentic collections from Bukhari, Muslim, Abu Dawood, Tirmidhi, Nasai, Ibn Majah & 40 Hadith.
            </p>
          </div>
          <div className="hidden sm:block font-arabic text-4xl text-amber-300/30">
            حديث
          </div>
        </div>
      </div>

      {/* Collection Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {collections.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCollection(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
              selectedCollection === c 
                ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-md' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {c === 'All' ? 'All Collections' : c === 'Nawawi' ? '40 Hadith Nawawi' : `Sahih ${c}`}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by topic (Intentions, Prayer, Charity, Parents) or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-sm"
        />
      </div>

      {/* Hadith List */}
      <div className="space-y-4">
        {filteredHadiths.map(hadith => {
          const isSaved = savedHadiths.includes(hadith.id);
          return (
            <div
              key={hadith.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-lg space-y-3 hover:border-emerald-700/60 transition"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400">{hadith.reference}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                      {hadith.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {hadith.bookName} • Narrated by {hadith.narrator}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(hadith)}
                    title="Copy Hadith"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                  >
                    {copiedId === hadith.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => toggleSaveHadith(hadith.id)}
                    title={isSaved ? "Remove Bookmark" : "Save Hadith"}
                    className={`p-1.5 rounded-lg border transition ${
                      isSaved 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/50' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Topic Badge */}
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-300 text-[10px] font-semibold border border-slate-700">
                Topic: {hadith.topic}
              </div>

              {/* Arabic Hadith Text */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-right font-arabic text-base sm:text-lg text-emerald-100 leading-relaxed select-text">
                {hadith.arabicText}
              </div>

              {/* Translations */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <p>
                  <strong className="text-amber-400 block text-xs mb-0.5">English Translation:</strong>
                  {hadith.translationEn}
                </p>

                <div className="pt-2 border-t border-slate-800 text-right">
                  <strong className="text-amber-400 block text-xs mb-0.5 font-sans">اردو ترجمہ:</strong>
                  <p className="font-arabic text-amber-100/90 leading-relaxed">
                    {hadith.translationUr}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
