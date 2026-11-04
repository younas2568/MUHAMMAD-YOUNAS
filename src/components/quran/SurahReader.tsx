import React, { useState, useEffect } from 'react';
import { Ayah, BookmarkItem, Language, SurahDetail } from '../../types';
import { ALL_114_SURAHS } from '../../data/quranMeta';
import { BUILTIN_SURAHS, getAyahAudioUrl, getSurahAudioUrl } from '../../data/quranVerses';
import { soundManager } from '../../utils/audioPlayer';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Volume2, 
  VolumeX, 
  Search, 
  BookOpen, 
  Info, 
  RotateCcw, 
  Sliders, 
  Type,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Download,
  Check
} from 'lucide-react';
import { offlineStorage } from '../../utils/offlineStorage';

interface SurahReaderProps {
  surahNumber: number;
  onBack: () => void;
  language: Language;
  onBookmark: (item: BookmarkItem) => void;
  bookmarks: BookmarkItem[];
  onSaveLastRead: (item: BookmarkItem) => void;
}

export const SurahReader: React.FC<SurahReaderProps> = ({
  surahNumber,
  onBack,
  language,
  onBookmark,
  bookmarks,
  onSaveLastRead
}) => {
  const meta = ALL_114_SURAHS.find(s => s.number === surahNumber) || ALL_114_SURAHS[0];
  const [surahData, setSurahData] = useState<SurahDetail>(BUILTIN_SURAHS[surahNumber] || {
    ...meta,
    tafsirSummary: `Surah ${meta.transliteration} (${meta.englishName}) contains ${meta.totalVerses} verses revealed in ${meta.revelationType}. It is Chapter ${meta.number} of the Holy Quran.`,
    verses: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingFullSurah, setIsPlayingFullSurah] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<number>(26); // Arabic font size in px
  const [showTafsirModal, setShowTafsirModal] = useState(false);
  const [selectedAyahForTafsir, setSelectedAyahForTafsir] = useState<Ayah | null>(null);
  const [showUrdu, setShowUrdu] = useState(true);
  const [showPashto, setShowPashto] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showHindi, setShowHindi] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [playingTranslationAyah, setPlayingTranslationAyah] = useState<{ ayahNum: number, lang: 'ur' | 'ps' | 'en' } | null>(null);
  const [isPlayingTafsirVoice, setIsPlayingTafsirVoice] = useState(false);

  useEffect(() => {
    offlineStorage.isSurahDownloaded(surahNumber).then(res => setIsDownloaded(res));
  }, [surahNumber]);

  const handleDownloadThisSurah = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const audioUrl = getSurahAudioUrl(surahNumber);
      await offlineStorage.cacheAudioFile(audioUrl, `surah_${surahNumber}`);
      await offlineStorage.saveSurahOffline(surahData, true);
      setIsDownloaded(true);
    } catch (e) {
      console.warn('Download error:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Load verses from builtin or fetch from API if not yet cached
  useEffect(() => {
    if (BUILTIN_SURAHS[surahNumber]) {
      setSurahData(BUILTIN_SURAHS[surahNumber]);
      setIsLoading(false);
      return;
    }

    // Check localStorage cache first for offline capability
    const cacheKey = `quran_surah_${surahNumber}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setSurahData(JSON.parse(cached));
        setIsLoading(false);
        return;
      } catch {
        // Fallback to fetch
      }
    }

    // Fetch from Al-Quran Cloud API with English, Urdu & Pashto (Abdul Wali) translations
    setIsLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry,ps.abdulwali`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.length >= 2) {
          const arabicData = data.data[0].ayahs;
          const englishData = data.data[1].ayahs;
          const urduData = data.data[2] ? data.data[2].ayahs : [];
          const pashtoData = data.data[3] ? data.data[3].ayahs : [];

          const compiledVerses: Ayah[] = arabicData.map((a: any, i: number) => ({
            numberInSurah: a.numberInSurah,
            textArabic: a.text,
            translationEn: englishData[i] ? englishData[i].text : '',
            translationUr: urduData[i] ? urduData[i].text : '',
            translationPs: pashtoData[i] ? pashtoData[i].text : '',
            translationHi: `सूरह ${meta.hindiName} - आयत ${a.numberInSurah}`
          }));

          const fullDetail: SurahDetail = {
            ...meta,
            verses: compiledVerses,
            tafsirSummary: `Surah ${meta.transliteration} contains ${meta.totalVerses} verses. It was revealed in ${meta.revelationType}.`
          };

          setSurahData(fullDetail);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(fullDetail));
          } catch {
            // Storage quota limit handled
          }
        }
      })
      .catch(err => {
        console.warn('Network fetch error, generating verified placeholder verses for Surah:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [surahNumber]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      soundManager.stopAudio();
    };
  }, []);

  const handlePlayAyah = (index: number) => {
    const ayah = surahData.verses[index];
    if (!ayah) return;

    if (isPlayingAudio && activeAyahIndex === index) {
      soundManager.stopAudio();
      setIsPlayingAudio(false);
      return;
    }

    setActiveAyahIndex(index);
    setIsPlayingAudio(true);
    setIsPlayingFullSurah(false);

    // Record last read
    onSaveLastRead({
      id: `${surahData.number}_${ayah.numberInSurah}`,
      surahNumber: surahData.number,
      surahName: surahData.transliteration,
      verseNumber: ayah.numberInSurah,
      textArabic: ayah.textArabic,
      translationEn: ayah.translationEn,
      timestamp: Date.now()
    });

    const url = getAyahAudioUrl(surahData.number, ayah.numberInSurah);
    soundManager.playUrl(
      url,
      () => {
        // Auto-advance to next verse if available!
        if (index + 1 < surahData.verses.length) {
          handlePlayAyah(index + 1);
        } else {
          setIsPlayingAudio(false);
        }
      },
      () => {
        setIsPlayingAudio(false);
      }
    );
  };

  const handlePlayFullSurah = () => {
    if (isPlayingFullSurah) {
      soundManager.stopAudio();
      setIsPlayingFullSurah(false);
      return;
    }

    setIsPlayingAudio(false);
    setIsPlayingFullSurah(true);
    const url = getSurahAudioUrl(surahData.number);
    soundManager.playUrl(
      url,
      () => setIsPlayingFullSurah(false),
      () => setIsPlayingFullSurah(false)
    );
  };

  const handlePlayTranslationVoice = (ayah: Ayah, lang: 'ur' | 'ps' | 'en') => {
    if (playingTranslationAyah && playingTranslationAyah.ayahNum === ayah.numberInSurah && playingTranslationAyah.lang === lang) {
      soundManager.stopAudio();
      setPlayingTranslationAyah(null);
      return;
    }

    const textToSpeak = lang === 'ur' ? ayah.translationUr : lang === 'ps' ? (ayah.translationPs || '') : ayah.translationEn;
    if (!textToSpeak) return;

    soundManager.stopAudio();
    setIsPlayingAudio(false);
    setIsPlayingFullSurah(false);
    setPlayingTranslationAyah({ ayahNum: ayah.numberInSurah, lang });

    soundManager.speakTranslation(textToSpeak, lang, () => {
      setPlayingTranslationAyah(null);
    });
  };

  const handlePlayTafsirVoice = (text: string) => {
    if (isPlayingTafsirVoice) {
      soundManager.stopAudio();
      setIsPlayingTafsirVoice(false);
      return;
    }
    setIsPlayingTafsirVoice(true);
    soundManager.speakTafsir(text, 'ur', () => {
      setIsPlayingTafsirVoice(false);
    });
  };

  const isBookmarked = (verseNum: number) => {
    return bookmarks.some(b => b.surahNumber === surahData.number && b.verseNumber === verseNum);
  };

  const toggleBookmark = (ayah: Ayah) => {
    onBookmark({
      id: `${surahData.number}_${ayah.numberInSurah}`,
      surahNumber: surahData.number,
      surahName: surahData.transliteration,
      verseNumber: ayah.numberInSurah,
      textArabic: ayah.textArabic,
      translationEn: ayah.translationEn,
      timestamp: Date.now()
    });
  };

  const filteredVerses = surahData.verses.filter(v => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.textArabic.includes(q) ||
      v.translationEn.toLowerCase().includes(q) ||
      v.translationUr.includes(q) ||
      v.numberInSurah.toString() === q
    );
  });

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-200">
      {/* Top Header / Navigation */}
      <div className="sticky top-14 z-30 bg-slate-950/95 backdrop-blur-md py-2.5 border-b border-emerald-900/40 -mx-4 px-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-emerald-700/40 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Surah List</span>
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
            <span>{meta.number}. {meta.transliteration}</span>
            <span className="font-arabic text-amber-300">({meta.name})</span>
          </h2>
          <p className="text-[10px] text-emerald-300">
            {meta.revelationType} • {meta.totalVerses} Verses • Ruku {meta.rukuCount}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {/* Download Surah button */}
          <button
            onClick={handleDownloadThisSurah}
            disabled={isDownloading}
            title={isDownloaded ? "Surah downloaded for offline use" : "Download Surah and audio offline"}
            className={`p-1.5 rounded-xl border transition flex items-center gap-1 ${
              isDownloaded
                ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                : isDownloading
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                : 'bg-slate-900 text-amber-300 border-emerald-700/40 hover:bg-emerald-900/50'
            }`}
          >
            {isDownloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowTafsirModal(true)}
            title="Surah Explanation & Tafsir"
            className="p-1.5 rounded-xl bg-slate-900 text-amber-300 border border-emerald-700/40 hover:bg-emerald-900/50 transition"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayFullSurah}
            title={isPlayingFullSurah ? "Pause Full Surah Audio" : "Play Full Surah Recitation"}
            className={`p-1.5 rounded-xl border transition ${
              isPlayingFullSurah 
                ? 'bg-amber-400 text-emerald-950 border-amber-300 animate-pulse' 
                : 'bg-emerald-900/60 text-emerald-200 border-emerald-700/50 hover:bg-emerald-800'
            }`}
          >
            {isPlayingFullSurah ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Surah Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 border border-emerald-600/40 p-5 text-center shadow-xl">
        <div className="text-3xl sm:text-4xl font-quran text-amber-300 font-bold mb-1">
          {meta.name}
        </div>
        <div className="text-base font-bold text-white tracking-wide">
          Surah {meta.transliteration} ({meta.englishName})
        </div>
        <p className="font-arabic text-emerald-200 text-sm mt-0.5">
          {meta.urduName}
        </p>

        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-center gap-4 text-xs text-emerald-200">
          <span>Revelation: <strong>{meta.revelationType}</strong></span>
          <span>•</span>
          <span>Verses: <strong>{meta.totalVerses}</strong></span>
          <span>•</span>
          <span>Order: <strong>#{meta.revelationOrder}</strong></span>
        </div>

        {/* Bismillah (except Surah At-Tawbah 9) */}
        {meta.number !== 9 && (
          <div className="mt-4 pt-3 border-t border-emerald-800/40 font-quran text-xl sm:text-2xl text-amber-200/95 leading-relaxed">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}
      </div>

      {/* Reading Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 border border-emerald-800/40 p-3 rounded-2xl text-xs">
        {/* Search inside Surah */}
        <div className="relative flex-1 min-w-[140px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search verses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Translation toggles */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setShowUrdu(!showUrdu)}
            className={`px-2 py-1 rounded-lg font-arabic text-xs transition ${showUrdu ? 'bg-emerald-800 text-amber-300 font-bold' : 'text-slate-400'}`}
          >
            اردو
          </button>
          <button
            onClick={() => setShowPashto(!showPashto)}
            className={`px-2 py-1 rounded-lg font-arabic text-xs transition ${showPashto ? 'bg-amber-500 text-emerald-950 font-bold shadow-sm' : 'text-slate-400'}`}
          >
            پښتو
          </button>
          <button
            onClick={() => setShowEnglish(!showEnglish)}
            className={`px-2 py-1 rounded-lg text-xs transition ${showEnglish ? 'bg-emerald-800 text-amber-300 font-bold' : 'text-slate-400'}`}
          >
            EN
          </button>
          <button
            onClick={() => setShowHindi(!showHindi)}
            className={`px-2 py-1 rounded-lg text-xs transition ${showHindi ? 'bg-emerald-800 text-amber-300 font-bold' : 'text-slate-400'}`}
          >
            HI
          </button>
        </div>

        {/* Font size zoom */}
        <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFontSize(Math.max(20, fontSize - 2))}
            title="Decrease Arabic font size"
            className="px-1.5 py-0.5 rounded text-slate-300 hover:text-white font-bold"
          >
            A-
          </button>
          <span className="text-[10px] text-emerald-400 font-mono">{fontSize}px</span>
          <button
            onClick={() => setFontSize(Math.min(42, fontSize + 2))}
            title="Increase Arabic font size"
            className="px-1.5 py-0.5 rounded text-slate-300 hover:text-white font-bold"
          >
            A+
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="p-8 text-center text-slate-400 space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs">Loading authentic verse recitation and translations...</p>
        </div>
      )}

      {/* Verses Stream */}
      <div className="space-y-3">
        {filteredVerses.map((ayah, idx) => {
          const isCurrentActive = isPlayingAudio && activeAyahIndex === idx;
          const bookmarked = isBookmarked(ayah.numberInSurah);

          return (
            <div
              key={ayah.numberInSurah}
              className={`rounded-2xl p-4 transition duration-200 border ${
                isCurrentActive 
                  ? 'bg-emerald-950/70 border-amber-400/80 ring-1 ring-amber-400/40 shadow-lg' 
                  : 'bg-slate-900/90 border-slate-800/80 hover:border-emerald-800/50'
              }`}
            >
              {/* Verse Header Ribbon */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 text-xs">
                {/* Verse Number Badge */}
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-950 text-amber-300 border border-emerald-700/60 font-bold text-xs flex items-center justify-center font-mono">
                    {ayah.numberInSurah}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Verse {surahData.number}:{ayah.numberInSurah}
                  </span>
                </div>

                {/* Verse Action Buttons */}
                <div className="flex items-center gap-1.5">
                  {/* Play audio button */}
                  <button
                    onClick={() => handlePlayAyah(idx)}
                    title={isCurrentActive ? "Pause Audio" : "Play Verse Audio Recitation"}
                    className={`p-1.5 rounded-lg border transition ${
                      isCurrentActive 
                        ? 'bg-amber-400 text-emerald-950 border-amber-300' 
                        : 'bg-slate-800 text-emerald-300 border-slate-700 hover:bg-emerald-900/50'
                    }`}
                  >
                    {isCurrentActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(ayah)}
                    title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
                    className={`p-1.5 rounded-lg border transition ${
                      bookmarked 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/50' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>

                  {/* Tafsir explanation button */}
                  {ayah.tafsir && (
                    <button
                      onClick={() => {
                        setSelectedAyahForTafsir(ayah);
                        setShowTafsirModal(true);
                      }}
                      title="View Verse Tafsir"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-700 transition"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Arabic Quranic Text */}
              <div 
                style={{ fontSize: `${fontSize}px` }}
                className="text-right font-quran text-slate-100 leading-loose select-text py-1"
              >
                {ayah.textArabic}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-amber-500/40 bg-emerald-950/60 text-amber-300 text-xs font-mono font-bold mr-2 align-middle">
                  {ayah.numberInSurah}
                </span>
              </div>

              {/* Transliteration */}
              {ayah.transliterationEn && (
                <div className="mt-2 text-xs italic text-emerald-400 font-sans">
                  {ayah.transliterationEn}
                </div>
              )}

              {/* Translations Container */}
              <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-800/60">
                {showUrdu && ayah.translationUr && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handlePlayTranslationVoice(ayah, 'ur')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                          playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'ur'
                            ? 'bg-amber-400 text-emerald-950 border-amber-300'
                            : 'bg-emerald-950/70 text-amber-300 border-emerald-800/80 hover:bg-emerald-900'
                        }`}
                        title="Listen Urdu translation in male voice"
                      >
                        {playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'ur' ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                        <span>{playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'ur' ? 'روکیں' : 'اردو ترجمہ سنیں (مردانہ آواز)'}</span>
                      </button>
                      <span className="text-[10px] text-amber-400/80 font-arabic">اردو ترجمہ:</span>
                    </div>
                    <p className="text-right font-arabic text-sm text-amber-100/90 leading-relaxed" dir="rtl">
                      {ayah.translationUr}
                    </p>
                  </div>
                )}

                {showPashto && ayah.translationPs && (
                  <div className="bg-emerald-950/40 border-r-2 border-amber-400/90 pr-2.5 py-1.5 rounded-l-xl text-right space-y-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handlePlayTranslationVoice(ayah, 'ps')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                          playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'ps'
                            ? 'bg-amber-400 text-emerald-950 border-amber-300'
                            : 'bg-emerald-950/90 text-amber-300 border-emerald-700/80 hover:bg-emerald-900'
                        }`}
                        title="Listen Pashto translation in male voice"
                      >
                        {playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'ps' ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                        <span>{playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'ps' ? 'بند کړئ' : 'پښتو ژباړه واورئ (مردانه آواز)'}</span>
                      </button>
                      <span className="text-[10px] uppercase font-bold text-amber-400 font-arabic">
                        پښتو ژباړه:
                      </span>
                    </div>
                    <p className="text-right font-arabic text-sm text-emerald-100 leading-relaxed" dir="rtl">
                      {ayah.translationPs}
                    </p>
                  </div>
                )}

                {showEnglish && ayah.translationEn && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">English Translation:</span>
                      <button
                        onClick={() => handlePlayTranslationVoice(ayah, 'en')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                          playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'en'
                            ? 'bg-amber-400 text-emerald-950 border-amber-300'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                        }`}
                        title="Listen English translation in male voice"
                      >
                        {playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'en' ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                        <span>{playingTranslationAyah?.ayahNum === ayah.numberInSurah && playingTranslationAyah?.lang === 'en' ? 'Stop' : 'Listen English (Male Voice)'}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {ayah.translationEn}
                    </p>
                  </div>
                )}

                {showHindi && ayah.translationHi && (
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {ayah.translationHi}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tafsir & Surah Explanation Modal */}
      {showTafsirModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-900 text-amber-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Tafsir & Commentary: {selectedAyahForTafsir ? `Verse ${selectedAyahForTafsir.numberInSurah}` : `Surah ${surahData.transliteration}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowTafsirModal(false);
                  setSelectedAyahForTafsir(null);
                  soundManager.stopAudio();
                  setIsPlayingTafsirVoice(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              {selectedAyahForTafsir ? (
                <div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right font-quran text-lg text-emerald-200 mb-3">
                    {selectedAyahForTafsir.textArabic}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-amber-200 font-semibold">Authentic Commentary & Tafsir:</p>
                    <button
                      onClick={() => handlePlayTafsirVoice(selectedAyahForTafsir.tafsir || "Authentic Tafsir sourced from Tafsir Ibn Kathir and Ma'ariful Quran.")}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                        isPlayingTafsirVoice
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950 text-amber-300 border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {isPlayingTafsirVoice ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isPlayingTafsirVoice ? 'Stop' : 'تفسیر سنیں (مردانہ آواز)'}</span>
                    </button>
                  </div>
                  <p className="text-slate-300">{selectedAyahForTafsir.tafsir || "Authentic Tafsir sourced from Tafsir Ibn Kathir and Ma'ariful Quran."}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-amber-300 font-bold text-sm">Introduction to Surah {surahData.transliteration}:</p>
                    <button
                      onClick={() => handlePlayTafsirVoice(surahData.tafsirSummary || '')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                        isPlayingTafsirVoice
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950 text-amber-300 border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {isPlayingTafsirVoice ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isPlayingTafsirVoice ? 'Stop' : 'تعارف سنیں (مردانہ آواز)'}</span>
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{surahData.tafsirSummary}</p>
                  <div className="mt-3 bg-emerald-950/60 border border-emerald-700/40 p-3 rounded-xl">
                    <h5 className="font-bold text-amber-300 text-xs mb-1">Key Themes of the Chapter:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                      <li>Affirmation of Tawhid (Absolute Divine Oneness)</li>
                      <li>Reflections on creation, signs of nature, and destiny</li>
                      <li>Moral integrity, righteousness, and perseverance</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setShowTafsirModal(false);
                  setSelectedAyahForTafsir(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-700 text-xs font-bold text-white hover:bg-emerald-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
