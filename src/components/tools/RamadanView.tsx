import React, { useState, useEffect } from 'react';
import { calculatePrayerTimes, POPULAR_CITIES } from '../../utils/prayerTimes';
import { soundManager } from '../../utils/audioPlayer';
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Sparkles, 
  Play, 
  Pause, 
  Clock, 
  HeartHandshake,
  Calendar
} from 'lucide-react';

interface RamadanViewProps {
  onBack: () => void;
}

export const RamadanView: React.FC<RamadanViewProps> = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playingDuaId, setPlayingDuaId] = useState<string | null>(null);

  const times = calculatePrayerTimes(currentTime, POPULAR_CITIES[3]); // Karachi

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sehriDua = {
    id: 'sehri',
    titleEn: 'Dua for Fasting (Niyyah for Sehri)',
    titleUr: 'روزہ رکھنے کی نیت (سحری کی دعا)',
    arabic: 'وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
    transliteration: 'Wa bisawmi ghadin nawaytu min shahri Ramadan',
    translationEn: 'I intend to keep the fast tomorrow for the month of Ramadan.',
    translationUr: 'اور میں نے ماہِ رمضان کے کل کے روزے کی نیت کی۔'
  };

  const iftarDua = {
    id: 'iftar',
    titleEn: 'Dua for Breaking Fast (Iftar)',
    titleUr: 'افطار کرنے کی مسنون دعا',
    arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ • ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Allaahumma innee laka sumtu wa bika aamantu wa \'alayka tawakkaltu wa \'alaa rizqika aftart. Zahabaz-zama\'u wabtallatil-\'urooqu wa thabatal-ajru in shaaa\' Allaah',
    translationEn: 'O Allah, I fasted for You and in You I believe and upon You I place my trust, and with Your provision I break my fast. The thirst has vanished, the veins are moistened, and the reward is guaranteed, if Allah wills.',
    translationUr: 'اے اللہ! میں نے تیرے ہی لیے روزہ رکھا اور تجھ ہی پر ایمان لایا اور تجھ ہی پر بھروسہ کیا اور تیرے ہی دیے ہوئے رزق سے افطار کیا۔ پیاس چلی گئی، رگیں تر ہو گئیں اور اجر ثابت ہو گیا اگر اللہ نے چاہا۔'
  };

  const handleToggleAudio = (id: string, text: string) => {
    if (playingDuaId === id) {
      soundManager.stopAudio();
      setPlayingDuaId(null);
      return;
    }

    setPlayingDuaId(id);
    soundManager.speakText(text, 'ar-SA', () => {
      setPlayingDuaId(null);
    });
  };

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

        <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
          <Moon className="w-4 h-4" />
          <span>Ramadan Mubarak</span>
        </span>
      </div>

      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-emerald-950 to-teal-950 border border-emerald-600/40 p-5 shadow-xl text-center text-white">
        <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
          شَهْرُ رَمَضَانَ الْمُبَارَكُ
        </h2>
        <p className="text-xs text-emerald-200/90 mt-0.5">
          Daily Sehri (Imsak) & Iftar timetable with authentic fasting supplications.
        </p>

        {/* Timetable Cards */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[11px] font-bold text-amber-400 block uppercase">
              Sehri Ends (Imsak)
            </span>
            <div className="text-2xl font-extrabold font-mono text-white mt-1">
              {times.imsak}
            </div>
            <span className="text-[10px] text-slate-400">10 mins before Fajr</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[11px] font-bold text-amber-400 block uppercase">
              Iftar Time (Maghrib)
            </span>
            <div className="text-2xl font-extrabold font-mono text-emerald-300 mt-1">
              {times.maghrib}
            </div>
            <span className="text-[10px] text-slate-400">At Sunset Adhan</span>
          </div>
        </div>
      </div>

      {/* Fasting Niyyah (Sehri Dua) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-white text-sm">{sehriDua.titleEn}</h4>
            <p className="font-arabic text-amber-300 text-xs">{sehriDua.titleUr}</p>
          </div>

          <button
            onClick={() => handleToggleAudio(sehriDua.id, sehriDua.arabic)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow ${
              playingDuaId === sehriDua.id ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            {playingDuaId === sehriDua.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
            <span>{playingDuaId === sehriDua.id ? 'Stop' : 'Recite'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-quran text-xl text-amber-100 font-bold leading-relaxed">
          {sehriDua.arabic}
        </div>

        <p className="text-xs italic text-emerald-300 font-sans">{sehriDua.transliteration}</p>

        <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-slate-800">
          <p>{sehriDua.translationEn}</p>
          <p className="font-arabic text-amber-200/90 text-right">{sehriDua.translationUr}</p>
        </div>
      </div>

      {/* Iftar Dua */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-white text-sm">{iftarDua.titleEn}</h4>
            <p className="font-arabic text-amber-300 text-xs">{iftarDua.titleUr}</p>
          </div>

          <button
            onClick={() => handleToggleAudio(iftarDua.id, iftarDua.arabic)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow ${
              playingDuaId === iftarDua.id ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            {playingDuaId === iftarDua.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
            <span>{playingDuaId === iftarDua.id ? 'Stop' : 'Recite'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-quran text-lg sm:text-xl text-amber-100 font-bold leading-relaxed">
          {iftarDua.arabic}
        </div>

        <p className="text-xs italic text-emerald-300 font-sans">{iftarDua.transliteration}</p>

        <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-slate-800">
          <p>{iftarDua.translationEn}</p>
          <p className="font-arabic text-amber-200/90 text-right">{iftarDua.translationUr}</p>
        </div>
      </div>
    </div>
  );
};
