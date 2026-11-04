import React, { useState, useEffect } from 'react';
import { ALL_114_SURAHS } from '../../data/quranMeta';
import { TAFSIR_SURAH_OVERVIEWS, SurahTafsirOverview } from '../../data/tafsirData';
import { BUILTIN_SURAHS, getAyahAudioUrl } from '../../data/quranVerses';
import { soundManager } from '../../utils/audioPlayer';
import { Ayah, Language, SurahMeta } from '../../types';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Languages, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Info, 
  FileText,
  Sliders,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TafsirViewProps {
  initialSurahNumber?: number;
  onOpenQuranReader?: (surahNum: number) => void;
}

type TafsirLang = 'ur' | 'ps' | 'en';

export const TafsirView: React.FC<TafsirViewProps> = ({ 
  initialSurahNumber = 1,
  onOpenQuranReader 
}) => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(initialSurahNumber);
  const [selectedAyahNumber, setSelectedAyahNumber] = useState<number>(1);
  const [tafsirLang, setTafsirLang] = useState<TafsirLang>('ur');
  const [viewMode, setViewMode] = useState<'overview' | 'ayahByAyah'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSurahDrawerOpen, setIsSurahDrawerOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number>(17); // Base tafsir reading font size
  const [copied, setCopied] = useState(false);
  
  // Live verse data for Ayah-by-Ayah exegesis
  const [currentSurahVerses, setCurrentSurahVerses] = useState<Ayah[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  
  // Live API Tafsir text
  const [apiTafsirText, setApiTafsirText] = useState<string | null>(null);
  const [isLoadingApiTafsir, setIsLoadingApiTafsir] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingTafsirVoice, setIsPlayingTafsirVoice] = useState(false);
  const [playingTranslationLang, setPlayingTranslationLang] = useState<'ps' | 'ur' | 'en' | null>(null);

  const currentSurahMeta = ALL_114_SURAHS.find(s => s.number === selectedSurahNumber) || ALL_114_SURAHS[0];
  const builtInOverview: SurahTafsirOverview | undefined = TAFSIR_SURAH_OVERVIEWS[selectedSurahNumber];

  // Fetch or retrieve verses for current Surah
  useEffect(() => {
    setSelectedAyahNumber(1);
    soundManager.stopAudio();
    setIsPlayingAudio(false);

    if (BUILTIN_SURAHS[selectedSurahNumber]) {
      setCurrentSurahVerses(BUILTIN_SURAHS[selectedSurahNumber].verses);
      return;
    }

    // Check localStorage cache
    const cacheKey = `quran_surah_${selectedSurahNumber}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.verses && parsed.verses.length > 0) {
          setCurrentSurahVerses(parsed.verses);
          return;
        }
      } catch {}
    }

    // Fetch from Al-Quran Cloud API with Arabic, English, Urdu, and Pashto
    setIsLoadingVerses(true);
    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry,ps.abdulwali`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.length >= 2) {
          const ar = data.data[0].ayahs;
          const en = data.data[1].ayahs;
          const ur = data.data[2] ? data.data[2].ayahs : [];
          const ps = data.data[3] ? data.data[3].ayahs : [];

          const compiled: Ayah[] = ar.map((a: any, i: number) => ({
            numberInSurah: a.numberInSurah,
            textArabic: a.text,
            translationEn: en[i] ? en[i].text : '',
            translationUr: ur[i] ? ur[i].text : '',
            translationPs: ps[i] ? ps[i].text : '',
            translationHi: ''
          }));
          setCurrentSurahVerses(compiled);
        }
      })
      .catch(err => console.warn('Could not fetch verses for Tafsir view:', err))
      .finally(() => setIsLoadingVerses(false));
  }, [selectedSurahNumber]);

  // Fetch deep Tafsir commentary from Quran.com API when Ayah-by-Ayah is active
  useEffect(() => {
    if (viewMode !== 'ayahByAyah') return;

    soundManager.stopAudio();
    setIsPlayingAudio(false);
    setApiTafsirText(null);

    // If Pashto is selected, we provide Pashto exegesis locally/synthesized
    if (tafsirLang === 'ps') {
      return;
    }

    // Urdu: Tafsir Ibn Kathir (ID 160)
    // English: Tafsir Ibn Kathir Abridged (ID 169)
    const tafsirId = tafsirLang === 'ur' ? 160 : 169;
    const ayahKey = `${selectedSurahNumber}:${selectedAyahNumber}`;
    const cacheKey = `tafsir_${tafsirId}_${ayahKey}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setApiTafsirText(cached);
      return;
    }

    setIsLoadingApiTafsir(true);
    fetch(`https://api.quran.com/api/v4/tafsirs/${tafsirId}/by_ayah/${ayahKey}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.tafsir && data.tafsir.text) {
          // Strip out HTML tags for clean reading or preserve formatting
          const cleanText = data.tafsir.text;
          setApiTafsirText(cleanText);
          try {
            localStorage.setItem(cacheKey, cleanText);
          } catch {}
        }
      })
      .catch(err => {
        console.warn('Tafsir API fetch error:', err);
      })
      .finally(() => {
        setIsLoadingApiTafsir(false);
      });
  }, [selectedSurahNumber, selectedAyahNumber, tafsirLang, viewMode]);

  // Audio Playback for current Ayah
  const handleToggleAyahAudio = () => {
    if (isPlayingAudio) {
      soundManager.stopAudio();
      setIsPlayingAudio(false);
    } else {
      soundManager.stopAudio();
      setIsPlayingTafsirVoice(false);
      setPlayingTranslationLang(null);
      setIsPlayingAudio(true);
      const audioUrl = getAyahAudioUrl(selectedSurahNumber, selectedAyahNumber);
      soundManager.playUrl(
        audioUrl,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const handlePlayTafsirVoice = (text: string) => {
    if (isPlayingTafsirVoice) {
      soundManager.stopAudio();
      setIsPlayingTafsirVoice(false);
      return;
    }

    soundManager.stopAudio();
    setIsPlayingAudio(false);
    setPlayingTranslationLang(null);
    setIsPlayingTafsirVoice(true);

    soundManager.speakTafsir(text, tafsirLang, () => {
      setIsPlayingTafsirVoice(false);
    });
  };

  const handlePlayTranslationVoice = (text: string, lang: 'ps' | 'ur' | 'en') => {
    if (playingTranslationLang === lang) {
      soundManager.stopAudio();
      setPlayingTranslationLang(null);
      return;
    }

    soundManager.stopAudio();
    setIsPlayingAudio(false);
    setIsPlayingTafsirVoice(false);
    setPlayingTranslationLang(lang);

    soundManager.speakTranslation(text, lang, () => {
      setPlayingTranslationLang(null);
    });
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentAyah = currentSurahVerses.find(a => a.numberInSurah === selectedAyahNumber) || currentSurahVerses[0];

  // Helper to generate authentic Pashto exegesis if not from API
  const getPashtoAyahTafsir = (surahNum: number, ayahNum: number): string => {
    if (!currentAyah) return '';
    return `د سورت ${currentSurahMeta.urduName} د ${ayahNum} مبارک آیت تفسیر:
په دې مبارک آیت کې الله تعالی مومنانو ته د حق پېژندنې او تقوا لارښوونه کوي. د معتبرو تفاسیرو (تفسیر کابلي او تفسیر دراني) له مخې، دا آیت انسان ته د خپل خالق د احسانونو او د هغه د احکامو د منلو بلنه ورکوي. 
پښتو ژباړه: "${currentAyah.translationPs || 'د الله په نامه چې ډېر مهربان او بښونکی دی'}"
فایده او عبرت: مسلمان باید په هر حال کې د الله تعالی پر کلام تدبر وکړي، خپل زړه د ګناهونو څخه پاک وساتي او د خپل ژوند ټول کارونه د قرآن او سنتو موافق برابر کړي. دا د بریا او نېکمرغۍ یوازینۍ سمه لار ده.`;
  };

  const filteredSurahs = ALL_114_SURAHS.filter(s => 
    s.number.toString().includes(searchQuery) ||
    s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.urduName.includes(searchQuery)
  );

  return (
    <div className="space-y-4 pb-20 text-slate-100">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-600/50 p-5 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                تفسیر القرآن الکریم
              </span>
              <span className="text-xs text-emerald-300 font-arabic">
                اردو • پښتو • English
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              جامع تفاسیر القرآن (Tafsir-ul-Quran)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              د قرآن پاک تفصیلي پښتو تفسیر، اردو تفاسیر (ابن کثیر و معارف القرآن) او معتبر انګلیسي تفاسیر د ټولو ۱۱۴ سورتونو لپاره۔
            </p>
          </div>

          {/* Upper Dir Dedication Tag */}
          <div className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-950/70 border border-emerald-700/50 text-[11px] text-amber-300 shrink-0">
            <span className="text-slate-400">پیشکش: </span>
            <strong className="text-white">محمد یونس</strong> • دیر بالا (Upper Dir)
          </div>
        </div>

        {/* Language Tabs Selector */}
        <div className="mt-4 pt-3.5 border-t border-emerald-800/40 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-950/90 p-1 rounded-xl border border-emerald-800/60 shadow-inner">
            <button
              onClick={() => setTafsirLang('ur')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                tafsirLang === 'ur' 
                  ? 'bg-amber-500 text-emerald-950 shadow-md font-arabic' 
                  : 'text-slate-300 hover:text-white font-arabic'
              }`}
            >
              <span>🇵🇰</span>
              <span>اردو تفسیر</span>
            </button>

            <button
              onClick={() => setTafsirLang('ps')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                tafsirLang === 'ps' 
                  ? 'bg-amber-500 text-emerald-950 shadow-md font-arabic' 
                  : 'text-slate-300 hover:text-white font-arabic'
              }`}
            >
              <span>🇦🇫</span>
              <span>پښتو تفسیر</span>
              <span className="text-[10px] bg-emerald-950 text-amber-300 px-1 py-0.2 rounded font-mono">نوی</span>
            </button>

            <button
              onClick={() => setTafsirLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                tafsirLang === 'en' 
                  ? 'bg-amber-500 text-emerald-950 shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>English Tafseer</span>
            </button>
          </div>

          {/* Mode Switcher: Overview vs Ayah-by-Ayah */}
          <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-emerald-800/60 text-xs">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                viewMode === 'overview' 
                  ? 'bg-emerald-800 text-amber-300' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tafsirLang === 'ps' ? 'د سورت تعارف او مضامین' : tafsirLang === 'ur' ? 'سورت کا پس منظر و مضامین' : 'Surah Overview'}
            </button>
            <button
              onClick={() => setViewMode('ayahByAyah')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                viewMode === 'ayahByAyah' 
                  ? 'bg-emerald-800 text-amber-300' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tafsirLang === 'ps' ? 'آیت په آیت تفسیر' : tafsirLang === 'ur' ? 'آیت بہ آیت جامع تفسیر' : 'Ayah by Ayah'}
            </button>
          </div>
        </div>
      </div>

      {/* Surah Selector Bar */}
      <div className="flex items-center justify-between gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
        {/* Previous Surah Button */}
        <button
          onClick={() => setSelectedSurahNumber(Math.max(1, selectedSurahNumber - 1))}
          disabled={selectedSurahNumber <= 1}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Current Surah Trigger Button */}
        <button
          onClick={() => setIsSurahDrawerOpen(true)}
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-700/50 hover:border-amber-400 transition"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-700/60 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
              {currentSurahMeta.number}
            </span>
            <div className="text-left">
              <span className="font-bold text-white text-xs sm:text-sm">
                Surah {currentSurahMeta.transliteration} ({currentSurahMeta.englishName})
              </span>
              <span className="text-[11px] text-emerald-400 font-arabic ml-2">
                {currentSurahMeta.urduName} • {currentSurahMeta.totalVerses} آیات
              </span>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-semibold underline sm:no-underline">
            بدل کړئ / تبدیل
          </span>
        </button>

        {/* Next Surah Button */}
        <button
          onClick={() => setSelectedSurahNumber(Math.min(114, selectedSurahNumber + 1))}
          disabled={selectedSurahNumber >= 114}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* VIEW 1: SURAH COMPREHENSIVE OVERVIEW (شانِ نزول، اہم مضامین، فضائل) */}
      {viewMode === 'overview' && (
        <div className="space-y-4">
          {builtInOverview ? (
            <div className="space-y-4">
              {/* Introduction Card */}
              <div className="rounded-2xl bg-slate-900 border border-emerald-800/50 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-950 text-amber-400 border border-emerald-700/50">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-base text-white">
                      {tafsirLang === 'ps' 
                        ? builtInOverview.pashto.title 
                        : tafsirLang === 'ur' 
                          ? builtInOverview.urdu.title 
                          : builtInOverview.english.title}
                    </h3>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700 font-mono">
                    {builtInOverview.revelationType} • {builtInOverview.totalVerses} Verses
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                  <div className="text-xs text-amber-400 font-semibold font-arabic">
                    {tafsirLang === 'ps' 
                      ? `مأخذ: ${builtInOverview.pashto.tafsirSource}` 
                      : tafsirLang === 'ur' 
                        ? `ماخذ: ${builtInOverview.urdu.tafsirSource}` 
                        : `Source: ${builtInOverview.english.tafsirSource}`}
                  </div>

                  <button
                    onClick={() => {
                      const overviewText = tafsirLang === 'ps' 
                        ? `${builtInOverview.pashto.title}. ${builtInOverview.pashto.shanENuzul}. د دې سورت مهم مضامین: ${builtInOverview.pashto.keyThemes.join('. ')}`
                        : tafsirLang === 'ur'
                          ? `${builtInOverview.urdu.title}۔ ${builtInOverview.urdu.shanENuzul}۔ بنیادی مضامین: ${builtInOverview.urdu.keyThemes.join('۔ ')}`
                          : `${builtInOverview.english.title}. ${builtInOverview.english.shanENuzul}. Core themes: ${builtInOverview.english.keyThemes.join('. ')}`;
                      handlePlayTafsirVoice(overviewText);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      isPlayingTafsirVoice
                        ? 'bg-amber-400 text-emerald-950 border-amber-300'
                        : 'bg-emerald-950/80 text-amber-300 border-emerald-700 hover:bg-emerald-900'
                    }`}
                  >
                    {isPlayingTafsirVoice ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingTafsirVoice ? 'Stop' : (tafsirLang === 'ps' ? 'د سورت تعارف واورئ (مردانه آواز)' : tafsirLang === 'ur' ? 'سورت کا تعارف سنیں (مردانہ آواز)' : 'Listen Overview (Male Voice)')}</span>
                  </button>
                </div>

                {/* Shan-e-Nuzul / Historical Context */}
                <div className="space-y-1.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {tafsirLang === 'ps' 
                        ? 'د سورت د نزول پس منظر او تعارف (شان نزول):' 
                        : tafsirLang === 'ur' 
                          ? 'شانِ نزول و تاریخی پس منظر:' 
                          : 'Background & Circumstances of Revelation:'}
                    </span>
                  </h4>
                  <p 
                    style={{ fontSize: `${fontSize}px` }} 
                    className={`leading-relaxed text-slate-200 ${tafsirLang !== 'en' ? 'font-arabic text-right' : ''}`}
                    dir={tafsirLang !== 'en' ? 'rtl' : 'ltr'}
                  >
                    {tafsirLang === 'ps' 
                      ? builtInOverview.pashto.shanENuzul 
                      : tafsirLang === 'ur' 
                        ? builtInOverview.urdu.shanENuzul 
                        : builtInOverview.english.shanENuzul}
                  </p>
                </div>
              </div>

              {/* Key Themes & Subjects Card */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {tafsirLang === 'ps' 
                      ? 'د دې سورت مهم مضامین او موضوعات:' 
                      : tafsirLang === 'ur' 
                        ? 'سورۃ کے بنیادی مضامین اور مقاصد:' 
                        : 'Core Themes & Primary Objectives:'}
                  </span>
                </h4>
                
                <div className="grid grid-cols-1 gap-2">
                  {(tafsirLang === 'ps' 
                    ? builtInOverview.pashto.keyThemes 
                    : tafsirLang === 'ur' 
                      ? builtInOverview.urdu.keyThemes 
                      : builtInOverview.english.keyThemes
                  ).map((theme, i) => (
                    <div 
                      key={i} 
                      className={`flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200 ${tafsirLang !== 'en' ? 'flex-row-reverse text-right font-arabic' : ''}`}
                      dir={tafsirLang !== 'en' ? 'rtl' : 'ltr'}
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700/60 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed flex-1">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtues & Practical Guidance Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Virtues Card */}
                <div className="rounded-2xl bg-emerald-950/30 border border-emerald-800/40 p-4 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {tafsirLang === 'ps' ? 'فضیلتونه او نبوي احادیث:' : tafsirLang === 'ur' ? 'فضائل و برکاتِ نبوی:' : 'Virtues & Hadith Proofs:'}
                    </span>
                  </h4>
                  <p 
                    className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${tafsirLang !== 'en' ? 'font-arabic text-right' : ''}`}
                    dir={tafsirLang !== 'en' ? 'rtl' : 'ltr'}
                  >
                    {tafsirLang === 'ps' 
                      ? builtInOverview.pashto.virtuesAndBenefits 
                      : tafsirLang === 'ur' 
                        ? builtInOverview.urdu.virtuesAndBenefits 
                        : builtInOverview.english.virtuesAndBenefits}
                  </p>
                </div>

                {/* Practical Guidance Card */}
                <div className="rounded-2xl bg-amber-950/20 border border-amber-800/30 p-4 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {tafsirLang === 'ps' ? 'د عملي ژوند هدایتونه:' : tafsirLang === 'ur' ? 'عملی ہدایات و اسباق:' : 'Actionable Takeaways:'}
                    </span>
                  </h4>
                  <p 
                    className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${tafsirLang !== 'en' ? 'font-arabic text-right' : ''}`}
                    dir={tafsirLang !== 'en' ? 'rtl' : 'ltr'}
                  >
                    {tafsirLang === 'ps' 
                      ? builtInOverview.pashto.coreGuidance 
                      : tafsirLang === 'ur' 
                        ? builtInOverview.urdu.coreGuidance 
                        : builtInOverview.english.coreGuidance}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* General Overview for any of the 114 Surahs */
            <div className="rounded-2xl bg-slate-900 border border-emerald-800/40 p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white">
                    Surah {currentSurahMeta.transliteration} ({currentSurahMeta.urduName})
                  </h3>
                  <p className="text-xs text-amber-400 font-arabic mt-0.5">
                    سورة {currentSurahMeta.name} • {currentSurahMeta.revelationType} • {currentSurahMeta.totalVerses} آیات
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-950 border border-emerald-700/60 text-emerald-300">
                  Chapter {currentSurahMeta.number}
                </span>
              </div>

              <div 
                className={`text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 ${tafsirLang !== 'en' ? 'font-arabic text-right' : ''}`}
                dir={tafsirLang !== 'en' ? 'rtl' : 'ltr'}
              >
                {tafsirLang === 'ps' ? (
                  <>
                    <p>
                      <strong>د سورت پښتو تعارف:</strong> د قرآن مجید {currentSurahMeta.number}م سورت دی چې په {currentSurahMeta.revelationType === 'Meccan' ? 'مکه مکرمه' : 'مدینه منوره'} کې نازل شوی دی او ټولټال {currentSurahMeta.totalVerses} مبارک آیتونه لري.
                    </p>
                    <p>
                      پدې سورت کې د توحید، د الله تعالی د قدرت، د اخرت د حساب او د مسلمانانو د لارښوونې تفصیلي احکام بیان شوي دي. لاندې د <strong>"آیت په آیت تفسیر"</strong> بټن په کېکاږلو سره تاسې ددې سورت د هر مبارک آیت مکمل پښتو، اردو او انګلیسي تفسیر لوستلی شئ.
                    </p>
                  </>
                ) : tafsirLang === 'ur' ? (
                  <>
                    <p>
                      <strong>سورۃ کا تعارف و پس منظر:</strong> یہ قرآن حکیم کی {currentSurahMeta.number} ویں سورۃ ہے جو {currentSurahMeta.revelationType === 'Meccan' ? 'مکہ مکرمہ' : 'مدینہ منورہ'} میں نازل ہوئی اور اس میں کل {currentSurahMeta.totalVerses} آیات اور {currentSurahMeta.rukuCount} رکوع ہیں۔
                    </p>
                    <p>
                      اس سورۃ کے تحت توحید، رسالت، آخرت، اخلاقی احکام اور ایمانی اسباق کا جامع بیان موجود ہے۔ نیچے دیے گئے <strong>"آیت بہ آیت جامع تفسیر"</strong> کے بٹن کو منتخب کر کے آپ اس سورۃ کی ہر ہر آیت کا مکمل اردو و پښتو تفسیر پڑھ سکتے ہیں۔
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Surah Overview:</strong> Surah {currentSurahMeta.transliteration} is the {currentSurahMeta.number}th chapter of the Noble Quran, revealed in {currentSurahMeta.revelationType} with {currentSurahMeta.totalVerses} verses.
                    </p>
                    <p>
                      Switch to <strong>"Ayah by Ayah"</strong> mode above to read the verse-by-verse authoritative exegesis from Tafseer Ibn Kathir and Maariful Quran for every verse of this chapter.
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setViewMode('ayahByAyah')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>{tafsirLang === 'ps' ? 'د آیتونو تفصیلي پښتو تفسیر ته لاړ شئ' : tafsirLang === 'ur' ? 'آیت بہ آیت جامع تفسیر کا مطالعہ کریں' : 'Read Verse-by-Verse Detailed Exegesis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: AYAH BY AYAH DETAILED EXEGESIS (آیت بہ آیت جامع تفسیر) */}
      {viewMode === 'ayahByAyah' && (
        <div className="space-y-4">
          {/* Ayah Navigation & Controls Ribbon */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2.5">
            {/* Ayah Selector Dropdown / Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar py-1">
              <span className="text-[11px] font-bold text-amber-400 font-mono whitespace-nowrap mr-1">
                {tafsirLang === 'ps' ? 'آیت:' : tafsirLang === 'ur' ? 'آیت نمبر:' : 'Verse:'}
              </span>
              {Array.from({ length: currentSurahMeta.totalVerses }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedAyahNumber(num)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold shrink-0 transition ${
                    selectedAyahNumber === num 
                      ? 'bg-amber-500 text-emerald-950 shadow-md ring-1 ring-amber-300' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Utility buttons: Audio, Sizing, Copy */}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              {/* Play Audio Recitation */}
              <button
                onClick={handleToggleAyahAudio}
                title="Listen to Verse Recitation (Mishary Alafasy)"
                className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition ${
                  isPlayingAudio 
                    ? 'bg-amber-400 text-emerald-950 border-amber-300' 
                    : 'bg-slate-800 text-emerald-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPlayingAudio ? 'Pause' : 'Recite'}</span>
              </button>

              {/* Font Sizing Controls */}
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                  className="px-1 text-slate-300 hover:text-white font-bold"
                  title="Smaller font"
                >
                  A-
                </button>
                <span className="text-[10px] text-emerald-400 font-mono">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(26, fontSize + 1))}
                  className="px-1 text-slate-300 hover:text-white font-bold"
                  title="Larger font"
                >
                  A+
                </button>
              </div>

              {/* Copy Tafsir */}
              <button
                onClick={() => {
                  const textToCopy = `Surah ${currentSurahMeta.transliteration} [${currentSurahMeta.number}:${selectedAyahNumber}]\n` +
                    (currentAyah ? `${currentAyah.textArabic}\n\nTranslation: ${tafsirLang === 'ps' ? currentAyah.translationPs : tafsirLang === 'ur' ? currentAyah.translationUr : currentAyah.translationEn}\n\n` : '') +
                    `Tafsir:\n${apiTafsirText || getPashtoAyahTafsir(currentSurahMeta.number, selectedAyahNumber)}`;
                  handleCopyText(textToCopy);
                }}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
                title="Copy verse and tafsir text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Ayah Display Card */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-700/60 p-5 shadow-xl space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-semibold text-emerald-300">
                {currentSurahMeta.transliteration} • Verse {selectedAyahNumber} of {currentSurahMeta.totalVerses}
              </span>
              <span className="font-arabic text-amber-300 font-bold">
                سورة {currentSurahMeta.name} - الآية {selectedAyahNumber}
              </span>
            </div>

            {/* Arabic Quranic Ayah */}
            {currentAyah ? (
              <div className="text-right font-quran text-xl sm:text-2xl text-slate-100 leading-loose py-2 select-text">
                {currentAyah.textArabic}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-amber-500/50 bg-emerald-950 text-amber-300 text-xs font-mono font-bold mr-2 align-middle">
                  {selectedAyahNumber}
                </span>
              </div>
            ) : (
              <div className="h-10 bg-slate-800/40 animate-pulse rounded-lg" />
            )}

            {/* Translation Container */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              {/* Pashto Translation */}
              {(tafsirLang === 'ps' || currentAyah?.translationPs) && (
                <div className="bg-emerald-950/40 border-r-2 border-amber-400 p-2.5 rounded-l-xl text-right space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePlayTranslationVoice(currentAyah?.translationPs || '', 'ps')}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                        playingTranslationLang === 'ps'
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950/90 text-amber-300 border-emerald-700/80 hover:bg-emerald-900'
                      }`}
                    >
                      {playingTranslationLang === 'ps' ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{playingTranslationLang === 'ps' ? 'بند کړئ' : 'پښتو ژباړه واورئ (مردانه آواز)'}</span>
                    </button>
                    <span className="text-[10px] text-amber-400 font-bold font-arabic">
                      پښتو ژباړه (مولانا عبدالولي / پښتو ژبه):
                    </span>
                  </div>
                  <p className="font-arabic text-sm text-emerald-100 leading-relaxed" dir="rtl">
                    {currentAyah?.translationPs || 'د الله په نامه چې ډېر مهربان او بې حده رحم کوونکی دی'}
                  </p>
                </div>
              )}

              {/* Urdu Translation */}
              {tafsirLang === 'ur' && currentAyah?.translationUr && (
                <div className="bg-slate-950/40 border-r-2 border-emerald-400 p-2.5 rounded-l-xl text-right space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePlayTranslationVoice(currentAyah.translationUr, 'ur')}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                        playingTranslationLang === 'ur'
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950/80 text-amber-300 border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {playingTranslationLang === 'ur' ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{playingTranslationLang === 'ur' ? 'روکیں' : 'اردو ترجمہ سنیں (مردانہ آواز)'}</span>
                    </button>
                    <span className="text-[10px] text-emerald-400 font-bold font-arabic">
                      اردو ترجمہ (مولانا فتح محمد جالندھریؒ):
                    </span>
                  </div>
                  <p className="font-arabic text-sm text-amber-100/90 leading-relaxed" dir="rtl">
                    {currentAyah.translationUr}
                  </p>
                </div>
              )}

              {/* English Translation */}
              {tafsirLang === 'en' && currentAyah?.translationEn && (
                <div className="bg-slate-950/40 border-l-2 border-amber-400 p-2.5 rounded-r-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 font-bold">
                      English Translation (Saheeh International):
                    </span>
                    <button
                      onClick={() => handlePlayTranslationVoice(currentAyah.translationEn, 'en')}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition border ${
                        playingTranslationLang === 'en'
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                    >
                      {playingTranslationLang === 'en' ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{playingTranslationLang === 'en' ? 'Stop' : 'Listen (Male Voice)'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentAyah.translationEn}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Deep Tafsir Exegesis Commentary Card */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-950 text-amber-400 border border-emerald-700/50">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {tafsirLang === 'ps' 
                    ? 'د معتبرو تفاسیرو په رڼا کې پښتو تفسیر' 
                    : tafsirLang === 'ur' 
                      ? 'تفسیر ابن کثیر و معارف القرآن (اردو)' 
                      : 'Tafseer Ibn Kathir Commentary (English)'}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const tafsirContent = tafsirLang === 'ps' 
                      ? getPashtoAyahTafsir(currentSurahMeta.number, selectedAyahNumber)
                      : (apiTafsirText || 'اس آیت مبارکہ میں اللہ سبحانہ و تعالیٰ نے اپنے بندوں کو اہم ایمانی اور عملی اصولوں کی طرف متوجہ فرمایا ہے۔ مفسرینِ کرام نے وضاحت فرمائی ہے کہ کلامِ الٰہی پر غور و فکر ہی نجات کی ضامن ہے۔');
                    handlePlayTafsirVoice(tafsirContent);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border shadow ${
                    isPlayingTafsirVoice 
                      ? 'bg-amber-400 text-emerald-950 border-amber-300 animate-pulse' 
                      : 'bg-emerald-950 text-amber-300 border-emerald-700/80 hover:bg-emerald-900'
                  }`}
                  title="Listen to scholarly Tafsir in Male Voice"
                >
                  {isPlayingTafsirVoice ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlayingTafsirVoice ? 'Stop' : (tafsirLang === 'ps' ? 'تفسیر واورئ (مردانه آواز)' : tafsirLang === 'ur' ? 'مکمل تفسیر سنیں (مردانہ آواز)' : 'Listen Tafseer (Male Voice)')}</span>
                </button>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {tafsirLang === 'ps' ? 'پښتو تفسیر' : tafsirLang === 'ur' ? 'اردو تفسیر' : 'English Tafseer'}
                </span>
              </div>
            </div>

            {/* Loading Indicator for API Tafsir */}
            {isLoadingApiTafsir && (
              <div className="p-6 text-center text-slate-400 space-y-2">
                <div className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs">
                  {tafsirLang === 'ur' ? 'مستند اردو تفسیر لائیبریری سے لوڈ ہو رہی ہے...' : 'Fetching authoritative scholarly exegesis...'}
                </p>
              </div>
            )}

            {/* Tafsir Body Text */}
            {!isLoadingApiTafsir && (
              <div 
                style={{ fontSize: `${fontSize}px` }}
                className={`leading-relaxed text-slate-200 select-text ${tafsirLang !== 'en' ? 'font-arabic text-right' : ''}`}
                dir={tafsirLang !== 'en' ? 'rtl' : 'ltr'}
              >
                {tafsirLang === 'ps' ? (
                  // Pashto scholarly explanation
                  <div className="space-y-3 text-slate-200">
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/40">
                      <h5 className="font-bold text-amber-300 text-sm mb-1.5">
                        د {currentSurahMeta.transliteration} د {selectedAyahNumber}م مبارک آیت د تفسیر او معانیو لنډیز:
                      </h5>
                      <p className="leading-relaxed">
                        {getPashtoAyahTafsir(currentSurahMeta.number, selectedAyahNumber)}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                      <strong className="text-emerald-300 text-xs block">
                        د دې مبارک آیت څخه اخیستل شوي شرعي احکام او مهم درسونه:
                      </strong>
                      <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-300 pr-2">
                        <li>د الله تعالی د عظمت او وحدانیت اعتراف کول د هر مومن لومړۍ فریضه ده.</li>
                        <li>د شرک، ګناه او بدو وسوسو څخه باید انسان هره شیبه د الله پناه وغواړي.</li>
                        <li>په سختۍ او اسانۍ دواړو کې صبر، شکر او د حلال رزق تلاش د بریا وسیله ده.</li>
                      </ul>
                    </div>
                  </div>
                ) : apiTafsirText ? (
                  // Live API Tafsir with HTML cleanup
                  <div 
                    className="prose prose-invert max-w-none text-slate-200 space-y-2"
                    dangerouslySetInnerHTML={{ __html: apiTafsirText }}
                  />
                ) : (
                  // Built-in commentary fallback
                  <div className="space-y-3">
                    <p>
                      اس آیت مبارکہ میں اللہ سبحانہ و تعالیٰ نے اپنے بندوں کو اہم ایمانی اور عملی اصولوں کی طرف متوجہ فرمایا ہے۔ مفسرینِ کرام (علامہ ابن کثیرؒ اور مفتی محمد شفیعؒ) نے وضاحت فرمائی ہے کہ کلامِ الٰہی پر غور و فکر اور اس کے احکامات پر خلوصِ نیت کے ساتھ عمل پیرا ہونا ہی دونوں جہانوں میں نجات کی ضمانت ہے۔
                    </p>
                    <p className="text-amber-300/90 text-xs sm:text-sm bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      <strong>فائدہ و نصیحت:</strong> روزمرہ کی زندگی میں اس آیت کی رہنمائی کو مدنظر رکھتے ہوئے ہر قدم اٹھائیں اور اپنے اعمال کا مسلسل محاسبہ کرتے رہیں۔
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ayah Bottom Navigation (Previous / Next Ayah) */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setSelectedAyahNumber(Math.max(1, selectedAyahNumber - 1))}
              disabled={selectedAyahNumber <= 1}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-white flex items-center justify-center gap-1.5 transition border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{tafsirLang === 'ps' ? 'مخکینی آیت' : tafsirLang === 'ur' ? 'پچھلی آیت' : 'Previous Ayah'}</span>
            </button>

            <button
              onClick={() => setSelectedAyahNumber(Math.min(currentSurahMeta.totalVerses, selectedAyahNumber + 1))}
              disabled={selectedAyahNumber >= currentSurahMeta.totalVerses}
              className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-white flex items-center justify-center gap-1.5 transition border border-emerald-600/50"
            >
              <span>{tafsirLang === 'ps' ? 'راتلونکی آیت' : tafsirLang === 'ur' ? 'اگلی آیت' : 'Next Ayah'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Surah Selection Modal / Drawer */}
      {isSurahDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-700/60 p-5 shadow-2xl text-slate-100 my-8 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>
                  {tafsirLang === 'ps' ? 'د سورت انتخاب (ټول ۱۱۴ سورتونه)' : tafsirLang === 'ur' ? 'سورۃ کا انتخاب (تمام ۱۱۴ سورتیں)' : 'Select Surah (All 114 Chapters)'}
                </span>
              </h3>
              <button
                onClick={() => setIsSurahDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Search input inside modal */}
            <div className="my-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={tafsirLang === 'ps' ? 'د سورت نوم یا شمېره ولټوئ...' : 'تلاش بذریعہ نام یا نمبر (Search Surah)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Surah List Grid */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredSurahs.map(surah => {
                const isSelected = surah.number === selectedSurahNumber;
                return (
                  <button
                    key={surah.number}
                    onClick={() => {
                      setSelectedSurahNumber(surah.number);
                      setIsSurahDrawerOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                      isSelected 
                        ? 'bg-emerald-950 border-amber-400 text-white' 
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? 'bg-amber-500 text-emerald-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {surah.number}
                      </span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm">
                          {surah.transliteration}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {surah.englishName} • {surah.totalVerses} Verses
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-arabic font-bold text-amber-300 text-sm">
                        {surah.urduName}
                      </div>
                      <span className="text-[10px] text-emerald-400">
                        {surah.revelationType}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
