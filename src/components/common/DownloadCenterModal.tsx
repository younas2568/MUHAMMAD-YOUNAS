import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Trash2, 
  HardDrive, 
  Smartphone, 
  BookOpen, 
  Volume2, 
  Calendar, 
  FileText, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { ALL_114_SURAHS } from '../../data/quranMeta';
import { BUILTIN_SURAHS, getSurahAudioUrl } from '../../data/quranVerses';
import { offlineStorage, DownloadedSurahMeta } from '../../utils/offlineStorage';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { SIX_KALMAS } from '../../data/kalmaData';
import { calculatePrayerTimes, POPULAR_CITIES, getHijriDate } from '../../utils/prayerTimes';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlayStoreGuide: () => void;
}

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({
  isOpen,
  onClose,
  onOpenPlayStoreGuide
}) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'app' | 'quran' | 'documents'>('app');
  const [downloadedList, setDownloadedList] = useState<DownloadedSurahMeta[]>([]);
  const [downloadingNumber, setDownloadingNumber] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadDownloaded();
    }
  }, [isOpen]);

  const loadDownloaded = async () => {
    const list = await offlineStorage.getDownloadedSurahs();
    setDownloadedList(list);
  };

  if (!isOpen) return null;

  // Download a Surah text and cache its audio recitation
  const handleDownloadSurah = async (surahNumber: number) => {
    setDownloadingNumber(surahNumber);
    setDownloadProgress(20);

    try {
      // 1. Get or fetch data
      let surahData = BUILTIN_SURAHS[surahNumber];
      if (!surahData) {
        setDownloadProgress(45);
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`);
        const json = await res.json();
        if (json.code === 200 && json.data) {
          const meta = ALL_114_SURAHS.find(s => s.number === surahNumber)!;
          surahData = {
            ...meta,
            verses: json.data[0].ayahs.map((a: any, i: number) => ({
              numberInSurah: a.numberInSurah,
              textArabic: a.text,
              translationEn: json.data[1]?.ayahs[i]?.text || '',
              translationUr: json.data[2]?.ayahs[i]?.text || '',
              translationHi: `सूरह ${meta.hindiName} - आयत ${a.numberInSurah}`
            }))
          };
        }
      }

      setDownloadProgress(75);

      // Cache audio
      const audioUrl = getSurahAudioUrl(surahNumber);
      await offlineStorage.cacheAudioFile(audioUrl, `surah_${surahNumber}`);

      // Save to IndexedDB
      await offlineStorage.saveSurahOffline(surahData, true);

      setDownloadProgress(100);
      setDownloadSuccessMsg(`Surah ${ALL_114_SURAHS.find(s => s.number === surahNumber)?.transliteration} downloaded for offline use!`);
      setTimeout(() => setDownloadSuccessMsg(null), 3000);

      await loadDownloaded();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingNumber(null);
      setDownloadProgress(0);
    }
  };

  const handleDeleteSurah = async (surahNumber: number) => {
    await offlineStorage.deleteDownloadedSurah(surahNumber);
    await loadDownloaded();
  };

  // Download Documents (e.g. Ramadan Timetable text file or Kalmas)
  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadRamadanTable = () => {
    const times = calculatePrayerTimes(new Date(), POPULAR_CITIES[3]);
    const hijri = getHijriDate(new Date());

    const content = `NOOR-UL-QURAN - RAMADAN TIMETABLE & SEHRI/IFTAR
Created by: Muhammad Younas (Upper Dir, KPK, Pakistan)
App: Noor-ul-Quran (Holy Quran, Namaz, Hadith & Prayer Times)

DATE: ${new Date().toLocaleDateString()} | HIJRI: ${hijri.formattedEn}
CITY: Karachi / Pakistan (Standard)

DAILY PRAYER & FASTING SCHEDULE:
----------------------------------------
- SEHRI ENDS (Imsak):  ${times.imsak} (10 mins before Fajr)
- FAJR ADHAN:          ${times.fajr}
- SUNRISE:             ${times.sunrise}
- DHUHR:               ${times.dhuhr}
- ASR (Hanafi):        ${times.asr}
- IFTAR / MAGHRIB:     ${times.maghrib} (At Sunset)
- ISHA:                ${times.isha}

FASTING INTENTION (SEHRI DUA):
وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ
"I intend to keep the fast tomorrow for the month of Ramadan."
اور میں نے ماہِ رمضان کے کل کے روزے کی نیت کی۔

IFTAR SUPPLICATION (IFTAR DUA):
اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ
"O Allah, I fasted for You and in You I believe and upon You I place my trust, and with Your provision I break my fast."
اے اللہ! میں نے تیرے ہی لیے روزہ رکھا اور تجھ ہی پر ایمان لایا اور تجھ ہی پر بھروسہ کیا اور تیرے ہی رزق سے افطار کیا۔

----------------------------------------
Developed with devotion by:
Muhammad Younas, Upper Dir, KPK, Pakistan
Email: younas889700@gmail.com
Sadaqah Jariyah for the Muslim Ummah
`;
    downloadTextFile('Noor-ul-Quran-Ramadan-Timetable.txt', content);
  };

  const handleDownloadSixKalmas = () => {
    let content = `NOOR-UL-QURAN - THE SIX KALMAS OF ISLAM\nCreated by: Muhammad Younas (Upper Dir)\n\n`;
    SIX_KALMAS.forEach(k => {
      content += `========================================\n`;
      content += `${k.nameEn} (${k.nameUr})\n`;
      content += `ARABIC: ${k.arabicText}\n`;
      content += `TRANSLITERATION: ${k.transliterationEn}\n`;
      content += `ENGLISH: ${k.translationEn}\n`;
      content += `URDU: ${k.translationUr}\n`;
      content += `BENEFITS: ${k.benefits}\n\n`;
    });
    content += `\nApplication: Noor-ul-Quran\nCreator: Muhammad Younas • Upper Dir`;
    downloadTextFile('Noor-ul-Quran-Six-Kalmas.txt', content);
  };

  // Quick list of most popular Surahs for 1-tap download
  const popularSurahNumbers = [1, 36, 55, 56, 67, 18, 112, 113, 114];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-emerald-600/60 p-5 sm:p-6 shadow-2xl text-slate-100 my-8 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center font-bold shadow-lg">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <span>Download Center</span>
                <span className="font-arabic text-amber-300 text-sm">(ڈاؤن لوڈ سینٹر)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Download app, offline Quran Surahs with audio, and Islamic resources
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {downloadSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              activeTab === 'app'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install / Download App</span>
          </button>

          <button
            onClick={() => setActiveTab('quran')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              activeTab === 'quran'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Offline Quran Audio ({downloadedList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              activeTab === 'documents'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Print & Documents</span>
          </button>
        </div>

        {/* Tab 1: App Installation & APK */}
        {activeTab === 'app' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
            {/* Primary Android PWA Download */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 border border-emerald-600/50 p-4 shadow-lg space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                    ن
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Install Noor-ul-Quran on Mobile
                    </h4>
                    <p className="text-xs text-emerald-300">
                      Installs directly to your home screen with offline capability
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-amber-300 font-bold text-[10px]">
                  Official
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs">
                Noor-ul-Quran is an installable Android Progressive Web Application (PWA). It occupies minimal storage, runs 100% offline, and requires zero Google Play subscription fees.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                {isInstallable && (
                  <button
                    onClick={install}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold shadow-md transition"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Download & Install Now</span>
                  </button>
                )}

                {isInstalled && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Already Installed on this Device</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onOpenPlayStoreGuide();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Play Store APK Guide</span>
                </button>
              </div>
            </div>

            {/* Offline Storage Status */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                  <span>Device Offline Storage:</span>
                </span>
                <span className="font-mono text-emerald-300 font-bold">
                  {downloadedList.length} Surahs Saved
                </span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Downloaded Surahs and Azan recordings are stored in IndexedDB on your phone and can be read or listened to without any internet connection.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Quran Surahs & Audio Downloader */}
        {activeTab === 'quran' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-between">
              <div>
                <strong className="text-amber-300 text-xs block">Offline Quran Audio & Texts:</strong>
                <span className="text-slate-300 text-[11px]">
                  Download Mishary Rashid Alafasy audio recitation and complete translations.
                </span>
              </div>
              <button
                onClick={loadDownloaded}
                title="Refresh list"
                className="p-1.5 rounded-lg bg-emerald-900 text-emerald-200 hover:text-white"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Downloading progress bar */}
            {downloadingNumber !== null && (
              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/50 space-y-1.5 animate-pulse">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-300">
                    Downloading Surah #{downloadingNumber}...
                  </span>
                  <span className="font-mono font-bold text-white">{downloadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${downloadProgress}%` }}
                    className="bg-amber-400 h-full rounded-full transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Popular Surahs Quick Download Grid */}
            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                Most Recited Surahs (1-Tap Offline Download)
              </h5>

              <div className="space-y-1.5">
                {popularSurahNumbers.map(num => {
                  const surah = ALL_114_SURAHS.find(s => s.number === num)!;
                  const isDownloaded = downloadedList.some(d => d.surahNumber === num);
                  const isCurrentDownloading = downloadingNumber === num;

                  return (
                    <div
                      key={num}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-emerald-700/60 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-emerald-950 text-amber-300 font-mono text-xs font-bold flex items-center justify-center border border-emerald-800">
                          {num}
                        </span>
                        <div>
                          <span className="font-bold text-white text-xs">{surah.transliteration}</span>
                          <span className="font-arabic text-amber-300 text-xs ml-2">({surah.name})</span>
                          <span className="text-[10px] text-slate-400 block -mt-0.5">
                            {surah.totalVerses} Verses • {surah.revelationType}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isDownloaded ? (
                          <div className="flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/50 text-[10px] font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Downloaded</span>
                            </span>
                            <button
                              onClick={() => handleDeleteSurah(num)}
                              title="Delete from offline storage"
                              className="p-1 rounded-lg text-rose-400 hover:bg-rose-950 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            disabled={downloadingNumber !== null}
                            onClick={() => handleDownloadSurah(num)}
                            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-40 transition shadow"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-300" />
                            <span>Download</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Documents, Printables & PDFs */}
        {activeTab === 'documents' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            <p className="text-slate-300 text-xs">
              Download Islamic charts, fasting schedules, and supplication cards for offline reading, sharing, or printing:
            </p>

            {/* Ramadan Schedule */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-950 text-amber-400 border border-indigo-800">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Ramadan Timetable & Fasting Duas</h5>
                  <p className="text-[11px] text-slate-400">Complete Sehri & Iftar timetable with authentic duas</p>
                </div>
              </div>

              <button
                onClick={handleDownloadRamadanTable}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Download .txt</span>
              </button>
            </div>

            {/* Six Kalmas */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-950 text-amber-400 border border-emerald-800">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">The Six Kalmas of Islam (مکمل چھ کلمے)</h5>
                  <p className="text-[11px] text-slate-400">Complete Arabic text, Urdu & English translations</p>
                </div>
              </div>

              <button
                onClick={handleDownloadSixKalmas}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Noor-ul-Quran • By <strong>Muhammad Younas</strong> (Upper Dir)
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
