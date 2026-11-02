import React, { useState } from 'react';
import { BookmarkItem, Language } from '../../types';
import { ALL_114_SURAHS } from '../../data/quranMeta';
import { SurahReader } from './SurahReader';
import { 
  Search, 
  BookOpen, 
  Bookmark, 
  History, 
  Layers, 
  Play, 
  ChevronRight, 
  Trash2,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../../utils/audioPlayer';
import { getSurahAudioUrl } from '../../data/quranVerses';

interface QuranViewProps {
  language: Language;
  selectedSurahNumber: number | null;
  onSelectSurah: (num: number | null) => void;
  bookmarks: BookmarkItem[];
  onBookmark: (item: BookmarkItem) => void;
  onRemoveBookmark: (id: string) => void;
  lastRead: BookmarkItem | null;
  onSaveLastRead: (item: BookmarkItem) => void;
}

export const QuranView: React.FC<QuranViewProps> = ({
  language,
  selectedSurahNumber,
  onSelectSurah,
  bookmarks,
  onBookmark,
  onRemoveBookmark,
  lastRead,
  onSaveLastRead
}) => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'bookmarks' | 'juzz'>('surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Meccan' | 'Medinan'>('All');
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);

  if (selectedSurahNumber !== null) {
    return (
      <SurahReader
        surahNumber={selectedSurahNumber}
        onBack={() => onSelectSurah(null)}
        language={language}
        onBookmark={onBookmark}
        bookmarks={bookmarks}
        onSaveLastRead={onSaveLastRead}
      />
    );
  }

  const filteredSurahs = ALL_114_SURAHS.filter(s => {
    const matchesFilter = filterType === 'All' || s.revelationType === filterType;
    if (!matchesFilter) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.number.toString() === q ||
      s.transliteration.toLowerCase().includes(q) ||
      s.englishName.toLowerCase().includes(q) ||
      s.urduName.includes(q) ||
      s.hindiName.includes(q) ||
      s.name.includes(q)
    );
  });

  const handlePlaySurahAudio = (e: React.MouseEvent, num: number) => {
    e.stopPropagation();
    if (playingSurah === num) {
      soundManager.stopAudio();
      setPlayingSurah(null);
    } else {
      setPlayingSurah(num);
      soundManager.playUrl(
        getSurahAudioUrl(num),
        () => setPlayingSurah(null),
        () => setPlayingSurah(null)
      );
    }
  };

  // 30 Paras / Juzz List
  const juzzList = [
    { number: 1, nameAr: 'الم', nameEn: 'Alif Lam Meem', startSurah: 'Al-Fatihah (1:1)', endSurah: 'Al-Baqarah (2:141)' },
    { number: 2, nameAr: 'سَيَقُولُ', nameEn: 'Sayaqool', startSurah: 'Al-Baqarah (2:142)', endSurah: 'Al-Baqarah (2:252)' },
    { number: 3, nameAr: 'تِلْكَ الرُّسُلُ', nameEn: 'Tilkal Rusul', startSurah: 'Al-Baqarah (2:253)', endSurah: 'Ali \'Imran (3:92)' },
    { number: 4, nameAr: 'لَنْ تَنَالُوا', nameEn: 'Lan Tanaaloo', startSurah: 'Ali \'Imran (3:93)', endSurah: 'An-Nisa (4:23)' },
    { number: 5, nameAr: 'وَالْمُحْصَنَاتُ', nameEn: 'Wal Muhsanat', startSurah: 'An-Nisa (4:24)', endSurah: 'An-Nisa (4:147)' },
    { number: 6, nameAr: 'لَا يُحِبُّ اللَّهُ', nameEn: 'La Yuhibbullah', startSurah: 'An-Nisa (4:148)', endSurah: 'Al-Ma\'idah (5:81)' },
    { number: 7, nameAr: 'وَإِذَا سَمِعُوا', nameEn: 'Wa Iza Sami\'oo', startSurah: 'Al-Ma\'idah (5:82)', endSurah: 'Al-An\'am (6:110)' },
    { number: 8, nameAr: 'وَلَوْ أَنَّنَا', nameEn: 'Wa Lau Annana', startSurah: 'Al-An\'am (6:111)', endSurah: 'Al-A\'raf (7:87)' },
    { number: 9, nameAr: 'قَالَ الْمَلَأُ', nameEn: 'Qalal Mala\'o', startSurah: 'Al-A\'raf (7:88)', endSurah: 'Al-Anfal (8:40)' },
    { number: 10, nameAr: 'وَاعْلَمُوا', nameEn: 'Wa\'lamoo', startSurah: 'Al-Anfal (8:41)', endSurah: 'At-Tawbah (9:92)' },
    { number: 30, nameAr: 'عَمَّ يَتَسَاءَلُونَ', nameEn: 'Amma Yatasa\'aloon', startSurah: 'An-Naba (78:1)', endSurah: 'An-Nas (114:6)' }
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border border-emerald-600/40 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-700/50 mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>The Noble Quran</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              الْقُرْآنُ الْكَرِيمُ
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              Read all 114 Surahs with Urdu, English & Hindi translations, audio & tafsir.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="font-arabic text-4xl text-amber-300/30">١١٤</span>
          </div>
        </div>

        {/* Resume Last Read */}
        {lastRead && (
          <div 
            onClick={() => onSelectSurah(lastRead.surahNumber)}
            className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-300 font-semibold">Last Read:</span>
              <span className="text-xs text-white font-bold group-hover:text-amber-300 transition">
                Surah {lastRead.surahName} (Verse {lastRead.verseNumber})
              </span>
            </div>
            <span className="text-xs text-amber-400 group-hover:translate-x-1 transition font-bold flex items-center">
              Continue <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-emerald-900/50 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('surahs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
            activeTab === 'surahs' 
              ? 'bg-amber-500 text-emerald-950 font-bold shadow-md' 
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>All 114 Surahs</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
            activeTab === 'bookmarks' 
              ? 'bg-amber-500 text-emerald-950 font-bold shadow-md' 
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmarks ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('juzz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
            activeTab === 'juzz' 
              ? 'bg-amber-500 text-emerald-950 font-bold shadow-md' 
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Paras / Juzz</span>
        </button>
      </div>

      {/* Tab: All 114 Surahs */}
      {activeTab === 'surahs' && (
        <div className="space-y-3">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Surah by name, number or meaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {(['All', 'Meccan', 'Medinan'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg transition ${
                    filterType === type 
                      ? 'bg-emerald-800 text-amber-300 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Surahs List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredSurahs.map((surah) => {
              const isPlaying = playingSurah === surah.number;
              return (
                <div
                  key={surah.number}
                  onClick={() => onSelectSurah(surah.number)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-700/60 hover:bg-slate-850 cursor-pointer transition group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* Number Badge with 8-point star feeling */}
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 text-amber-300 border border-emerald-700/60 flex items-center justify-center font-bold text-xs font-mono shrink-0 group-hover:bg-amber-500 group-hover:text-emerald-950 transition">
                      {surah.number}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                          {surah.transliteration}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {surah.revelationType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {surah.englishName} • {surah.totalVerses} Verses
                      </p>
                      <p className="text-[11px] font-arabic text-emerald-300/80 -mt-0.5">
                        {surah.urduName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-quran text-lg font-bold text-amber-200/90 group-hover:text-amber-300 transition">
                      {surah.name}
                    </span>

                    <button
                      onClick={(e) => handlePlaySurahAudio(e, surah.number)}
                      title={isPlaying ? "Stop Audio" : "Play Surah Audio"}
                      className={`p-2 rounded-xl transition ${
                        isPlaying 
                          ? 'bg-amber-400 text-emerald-950 animate-pulse' 
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-sm font-semibold">No Bookmarks Saved Yet</p>
              <p className="text-xs text-slate-500">
                While reading any Surah, tap the bookmark icon to save your favorite verses here.
              </p>
            </div>
          ) : (
            bookmarks.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectSurah(item.surahNumber)}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-700/60 cursor-pointer transition flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">
                      Surah {item.surahName} : Verse {item.verseNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-right font-quran text-base text-emerald-100 my-1">
                    {item.textArabic}
                  </p>
                  <p className="text-xs text-slate-300 italic line-clamp-2">
                    "{item.translationEn}"
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBookmark(item.id);
                  }}
                  title="Remove Bookmark"
                  className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-950 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Paras / Juzz */}
      {activeTab === 'juzz' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {juzzList.map(juzz => (
            <div 
              key={juzz.number}
              onClick={() => onSelectSurah(juzz.number === 30 ? 78 : juzz.number)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-700/60 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-amber-300 border border-emerald-700/50 flex items-center justify-center font-bold text-xs font-mono">
                  {juzz.number}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Para {juzz.number}: {juzz.nameEn}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {juzz.startSurah} ➔ {juzz.endSurah}
                  </p>
                </div>
              </div>

              <span className="font-arabic text-base font-bold text-amber-300">
                {juzz.nameAr}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
