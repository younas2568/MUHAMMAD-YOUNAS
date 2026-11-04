import React, { useState, useEffect } from 'react';
import { TabType, Language, BookmarkItem } from '../../types';
import { 
  BookOpen, 
  Clock, 
  ScrollText, 
  HeartHandshake, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Moon, 
  Sun,
  Flame,
  Award,
  Layers,
  HelpCircle,
  ShieldCheck,
  User,
  Heart,
  Download,
  FileText
} from 'lucide-react';
import { calculatePrayerTimes, getHijriDate, POPULAR_CITIES, Coordinates } from '../../utils/prayerTimes';
import { soundManager, AZAN_PRESETS } from '../../utils/audioPlayer';
import { BUILTIN_SURAHS, getAyahAudioUrl } from '../../data/quranVerses';
import { HADITH_COLLECTIONS } from '../../data/hadithData';
import { DAILY_SUNNAHS } from '../../data/sunnahData';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  language: Language;
  onOpenSurah: (surahNumber: number) => void;
  lastRead: BookmarkItem | null;
  onOpenPlayStoreGuide: () => void;
  onOpenCreatorModal: () => void;
  onOpenDownloadModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  language,
  onOpenSurah,
  lastRead,
  onOpenPlayStoreGuide,
  onOpenCreatorModal,
  onOpenDownloadModal
}) => {
  const [selectedCity, setSelectedCity] = useState<Coordinates>(POPULAR_CITIES[3]); // Karachi default
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlayingAzan, setIsPlayingAzan] = useState(false);
  const [isPlayingDailyAyah, setIsPlayingDailyAyah] = useState(false);
  const [hijriDate, setHijriDate] = useState(getHijriDate(new Date()));
  const [prayerTimes, setPrayerTimes] = useState(calculatePrayerTimes(new Date(), selectedCity));

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setPrayerTimes(calculatePrayerTimes(now, selectedCity));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedCity]);

  // Request user live GPS location if available
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedCity({
            city: 'My Location',
            country: 'GPS Detected',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        () => {
          // Fallback retained
        },
        { timeout: 6000 }
      );
    }
  }, []);

  const handleToggleAzan = () => {
    if (isPlayingAzan) {
      soundManager.stopAudio();
      setIsPlayingAzan(false);
    } else {
      setIsPlayingDailyAyah(false);
      setIsPlayingAzan(true);
      soundManager.playUrl(
        AZAN_PRESETS[0].url,
        () => setIsPlayingAzan(false),
        () => setIsPlayingAzan(false)
      );
    }
  };

  const handleToggleDailyAyah = () => {
    if (isPlayingDailyAyah) {
      soundManager.stopAudio();
      setIsPlayingDailyAyah(false);
    } else {
      setIsPlayingAzan(false);
      setIsPlayingDailyAyah(true);
      // Play Ayat-ul-Kursi or Surah Al-Fatihah 1st verse
      soundManager.playUrl(
        getAyahAudioUrl(1, 1),
        () => setIsPlayingDailyAyah(false),
        () => setIsPlayingDailyAyah(false)
      );
    }
  };

  const quickFeatures = [
    { id: 'quran' as TabType, labelEn: 'Holy Quran', labelUr: 'قرآن مجید (پښتو و اردو)', desc: '114 Surahs, Pashto/Urdu/En', icon: BookOpen, color: 'from-emerald-700 to-teal-800', border: 'border-emerald-600/40' },
    { id: 'tafsir' as TabType, labelEn: 'Tafsir-ul-Quran', labelUr: 'تفسیر القرآن (پښتو و اردو)', desc: 'Pashto, Urdu & English Exegesis', icon: FileText, color: 'from-amber-600 via-amber-700 to-emerald-950', border: 'border-amber-400/60' },
    { id: 'namaz' as TabType, labelEn: 'Namaz Guide', labelUr: 'نماز گائیڈ', desc: '5 Prayers, Wudu, Recitations', icon: Clock, color: 'from-amber-600 to-amber-800', border: 'border-amber-500/40' },
    { id: 'kalmas' as TabType, labelEn: 'Six Kalmas', labelUr: 'چھ کلمے', desc: 'Vocalized Arabic & Audio', icon: Sparkles, color: 'from-teal-700 to-emerald-900', border: 'border-teal-500/40' },
    { id: 'hadith' as TabType, labelEn: 'Hadith Books', labelUr: 'احادیث کتب', desc: 'Bukhari, Muslim, Tirmidhi', icon: ScrollText, color: 'from-cyan-700 to-blue-900', border: 'border-cyan-500/40' },
    { id: 'sunnah' as TabType, labelEn: 'Daily Sunnah', labelUr: 'روزمرہ سنتیں', desc: 'Eating, Sleeping, Habits Tracker', icon: CheckCircle2, color: 'from-green-700 to-emerald-900', border: 'border-green-500/40' },
    { id: 'knowledge' as TabType, labelEn: 'Knowledge & Quiz', labelUr: 'اسلامی معلومات', desc: 'Pillars, Articles, Trivia Quiz', icon: HelpCircle, color: 'from-purple-800 to-indigo-950', border: 'border-purple-500/40' },
    { id: 'duas' as TabType, labelEn: 'Daily Duas', labelUr: 'مسنون دعائیں', desc: 'Hisn al-Muslim with Audio', icon: HeartHandshake, color: 'from-rose-700 to-red-950', border: 'border-rose-500/40' },
    { id: 'qibla' as TabType, labelEn: 'Qibla Compass', labelUr: 'قبلہ رخ', desc: 'Real Kaaba Degree Bearing', icon: Compass, color: 'from-emerald-800 to-slate-900', border: 'border-emerald-500/40' },
    { id: 'tasbeeh' as TabType, labelEn: 'Digital Tasbeeh', labelUr: 'ڈیجیٹل تسبیح', desc: 'Tactile Sound & Vibration Counter', icon: Layers, color: 'from-amber-700 to-yellow-900', border: 'border-amber-600/40' },
    { id: 'ramadan' as TabType, labelEn: 'Ramadan & Fasting', labelUr: 'رمضان المبارک', desc: 'Sehri & Iftar Timetable', icon: Moon, color: 'from-indigo-800 to-blue-950', border: 'border-indigo-500/40' }
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Islamic Greeting & Date Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 border border-emerald-600/40 shadow-xl p-5 text-white">
        {/* Background Islamic Pattern */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full border-[20px] border-amber-400/10 pointer-events-none" />
        <div className="absolute right-6 top-6 opacity-20 pointer-events-none">
          <span className="font-arabic text-8xl text-amber-300">نور</span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-amber-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{hijriDate.formattedEn}</span>
            </span>

            <button
              onClick={() => setActiveTab('prayer-times')}
              className="flex items-center gap-1 text-xs text-emerald-200 hover:text-white bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-600/30 transition"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span className="truncate max-w-[120px]">{selectedCity.city}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300 tracking-wide">
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
            Welcome to Noor-ul-Quran — Your authentic companion for Quran, Namaz, and Sunnah.
          </p>

          {/* Next Prayer Countdown Card inside Banner */}
          <div className="mt-4 pt-3.5 border-t border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                  Next Prayer: <strong className="text-amber-300 text-sm font-sans">{prayerTimes.nextPrayer}</strong>
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mt-0.5">
                {prayerTimes.timeToNext}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAzan}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md transition ${
                  isPlayingAzan 
                    ? 'bg-amber-400 text-emerald-950 animate-pulse' 
                    : 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200'
                }`}
              >
                {isPlayingAzan ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isPlayingAzan ? 'Stop Azan' : 'Play Azan'}</span>
              </button>

              <button
                onClick={() => setActiveTab('prayer-times')}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-bold shadow-md transition"
              >
                View Times
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily 5 Prayer Schedule Strip */}
      <div className="grid grid-cols-5 gap-1.5 bg-slate-900/90 border border-emerald-800/40 rounded-2xl p-2 shadow-md text-center">
        {[
          { name: 'Fajr', time: prayerTimes.fajr, active: prayerTimes.nextPrayer === 'Fajr' },
          { name: 'Dhuhr', time: prayerTimes.dhuhr, active: prayerTimes.nextPrayer === 'Dhuhr' },
          { name: 'Asr', time: prayerTimes.asr, active: prayerTimes.nextPrayer === 'Asr' },
          { name: 'Maghrib', time: prayerTimes.maghrib, active: prayerTimes.nextPrayer === 'Maghrib' },
          { name: 'Isha', time: prayerTimes.isha, active: prayerTimes.nextPrayer === 'Isha' },
        ].map((p, idx) => (
          <div 
            key={idx}
            className={`py-1.5 px-1 rounded-xl transition ${
              p.active 
                ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-emerald-950 font-bold shadow-sm' 
                : 'bg-slate-800/40 text-slate-300'
            }`}
          >
            <div className="text-[11px] font-semibold">{p.name}</div>
            <div className="text-[10px] font-mono mt-0.5 whitespace-nowrap">{p.time}</div>
          </div>
        ))}
      </div>

      {/* Resume Last Read Quran (if exists) */}
      {lastRead && (
        <div 
          onClick={() => onOpenSurah(lastRead.surahNumber)}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-amber-500/40 shadow-lg cursor-pointer hover:border-amber-400 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                Continue Reading
              </span>
              <div className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                {lastRead.surahName} • Verse {lastRead.verseNumber}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition" />
        </div>
      )}

      {/* Main Feature Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Islamic Features</span>
          </h3>
          <span className="text-xs text-emerald-400">All 10 Modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
          {quickFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} p-3.5 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition group`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-black/25 text-amber-300 group-hover:bg-amber-400 group-hover:text-emerald-950 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-arabic text-emerald-200/90 font-bold">
                    {feat.labelUr}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {feat.labelEn}
                </h4>
                <p className="text-[11px] text-emerald-100/70 mt-0.5 line-clamp-1">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Ayah of the Day */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-700/50 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-800/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-xs">
              آية
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Ayah of the Day</h4>
              <p className="text-[11px] text-slate-400">Surah Al-Fatihah (1:1-2)</p>
            </div>
          </div>
          <button
            onClick={handleToggleDailyAyah}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 text-xs font-semibold border border-emerald-600/40 transition"
          >
            {isPlayingDailyAyah ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPlayingDailyAyah ? 'Pause' : 'Recite'}</span>
          </button>
        </div>

        <div className="text-right font-quran text-xl sm:text-2xl text-emerald-100 leading-loose py-1">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
        </div>

        <div className="mt-2 space-y-1 text-xs text-slate-300">
          <p className="italic text-emerald-300">
            "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds."
          </p>
          <p className="font-arabic text-amber-200/90 text-right text-xs pt-1">
            اللہ کے نام سے شروع جو نہایت مہربان بہت رحم والا ہے۔ سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-emerald-900/50 flex justify-end">
          <button
            onClick={() => onOpenSurah(1)}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <span>Read Full Surah</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Daily Authentic Hadith Highlight */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs">
              حديث
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Authentic Hadith</h4>
              <p className="text-[11px] text-slate-400">{HADITH_COLLECTIONS[0].reference}</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/50">
            Sahih
          </span>
        </div>

        <div className="text-right font-arabic text-base sm:text-lg text-emerald-200 leading-relaxed py-1">
          {HADITH_COLLECTIONS[0].arabicText}
        </div>

        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {HADITH_COLLECTIONS[0].translationEn}
        </p>

        <p className="text-xs font-arabic text-slate-300 mt-1 text-right">
          {HADITH_COLLECTIONS[0].translationUr}
        </p>

        <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setActiveTab('hadith')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <span>Browse Kutub al-Sittah</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Daily Sunnah Action Prompt */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-600/40 p-4 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Sunnah Habit of the Day</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {DAILY_SUNNAHS[0].titleEn}
            </h4>
            <p className="text-[11px] text-emerald-200/80">
              {DAILY_SUNNAHS[0].titleUr}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('sunnah')}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-bold shrink-0 transition"
        >
          Checklist
        </button>
      </div>

      {/* Google Play Store Banner */}
      <div className="rounded-2xl bg-slate-900/90 border border-emerald-800/50 p-3.5 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-950 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white">Google Play Ready</div>
            <div className="text-[11px] text-slate-400">Offline PWA & Android AAB/APK build ready</div>
          </div>
        </div>
        <button
          onClick={onOpenPlayStoreGuide}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 font-semibold border border-emerald-600/40"
        >
          View Instructions
        </button>
      </div>

      {/* Creator & Developer Signature Card with Real Photo */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-teal-950 border border-emerald-600/50 p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3.5">
          <div className="relative w-16 h-16 shrink-0">
            <img
              src="/creator-photo.jpg"
              alt="Muhammad Younas"
              className="w-16 h-16 rounded-2xl object-cover object-top ring-2 ring-amber-400 shadow-lg border border-slate-900"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-emerald-950 font-bold shadow">
              ✓
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Application Creator & Developer</span>
            </span>
            <h4 className="text-base font-extrabold text-white tracking-wide">
              MUHAMMAD YOUNAS
            </h4>
            <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>UPPER DIR (دیر بالا), KPK, PAKISTAN</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onOpenDownloadModal}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Downloads</span>
          </button>

          <button
            onClick={onOpenCreatorModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-md transition whitespace-nowrap"
          >
            Creator Info
          </button>
        </div>
      </div>

      {/* Footer copyright & dedication note */}
      <div className="text-center text-[11px] text-slate-500 pt-2 pb-1 space-y-0.5">
        <p>Noor-ul-Quran • Created by <strong>Muhammad Younas</strong> (Upper Dir)</p>
        <p className="font-arabic text-emerald-500/80">صدقہ جاریہ برائے امت مسلمہ</p>
      </div>
    </div>
  );
};
