import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { 
  calculatePrayerTimes, 
  getHijriDate, 
  POPULAR_CITIES, 
  Coordinates, 
  JuristicMethod, 
  CalculationMethod,
  ISLAMIC_EVENTS 
} from '../../utils/prayerTimes';
import { soundManager, AZAN_PRESETS } from '../../utils/audioPlayer';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Check, 
  Play, 
  Pause,
  Compass,
  Layers,
  Moon
} from 'lucide-react';

interface PrayerTimesViewProps {
  language: Language;
  onOpenQibla: () => void;
  onOpenTasbeeh: () => void;
  onOpenRamadan: () => void;
}

export const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({
  language,
  onOpenQibla,
  onOpenTasbeeh,
  onOpenRamadan
}) => {
  const [selectedCity, setSelectedCity] = useState<Coordinates>(POPULAR_CITIES[3]); // Karachi default
  const [juristic, setJuristic] = useState<JuristicMethod>('hanafi');
  const [method, setMethod] = useState<CalculationMethod>('Karachi');
  const [hijriAdjust, setHijriAdjust] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playingAzanId, setPlayingAzanId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const times = calculatePrayerTimes(currentTime, selectedCity, juristic, method);
  const hijri = getHijriDate(currentTime, hijriAdjust);

  // Live timer update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAzan = (azanId: string, url: string) => {
    if (playingAzanId === azanId) {
      soundManager.stopAudio();
      setPlayingAzanId(null);
      return;
    }

    setPlayingAzanId(azanId);
    soundManager.playUrl(
      url,
      () => setPlayingAzanId(null),
      () => setPlayingAzanId(null)
    );
  };

  const handleDetectGPS = () => {
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
        (err) => {
          alert('Unable to retrieve GPS coordinates. Please select your nearest city from the list.');
        }
      );
    }
  };

  const prayersList = [
    { name: 'Fajr', time: times.fajr, arabic: 'الفجر', desc: 'True Dawn to Sunrise' },
    { name: 'Sunrise', time: times.sunrise, arabic: 'الشروق', desc: 'Solar Horizon Rise' },
    { name: 'Dhuhr', time: times.dhuhr, arabic: 'الظهر', desc: 'Solar Noon / Midday' },
    { name: 'Asr', time: times.asr, arabic: 'العصر', desc: juristic === 'hanafi' ? 'Hanafi (Shadow x2)' : 'Standard (Shadow x1)' },
    { name: 'Maghrib', time: times.maghrib, arabic: 'المغرب', desc: 'Sunset / Fast Breaking' },
    { name: 'Isha', time: times.isha, arabic: 'العشاء', desc: 'Nightfall' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Quick Navigation to Other Tools */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onOpenQibla}
          className="p-3 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-700/50 flex flex-col items-center justify-center text-center shadow hover:border-amber-400 transition"
        >
          <Compass className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-xs font-bold text-white">Qibla Compass</span>
          <span className="text-[10px] text-emerald-300">Kaaba Bearing</span>
        </button>

        <button
          onClick={onOpenTasbeeh}
          className="p-3 rounded-2xl bg-gradient-to-br from-amber-900/60 to-slate-900 border border-amber-600/40 flex flex-col items-center justify-center text-center shadow hover:border-amber-400 transition"
        >
          <Layers className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-xs font-bold text-white">Digital Tasbeeh</span>
          <span className="text-[10px] text-amber-300">Zikr Counter</span>
        </button>

        <button
          onClick={onOpenRamadan}
          className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-700/50 flex flex-col items-center justify-center text-center shadow hover:border-amber-400 transition"
        >
          <Moon className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-xs font-bold text-white">Ramadan</span>
          <span className="text-[10px] text-indigo-300">Sehri & Iftar</span>
        </button>
      </div>

      {/* Main Prayer Times Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border border-emerald-600/40 p-5 sm:p-6 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white">
              {selectedCity.city}, {selectedCity.country}
            </span>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950 border border-emerald-700/60 text-xs text-amber-300 font-semibold"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Next Prayer Countdown Display */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Next Prayer: <strong className="text-amber-300 text-sm font-sans">{times.nextPrayer}</strong>
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-0.5">
              {times.timeToNext}
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Hijri: <strong>{hijri.formattedEn}</strong> ({hijri.formattedUr})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDetectGPS}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200 hover:text-white transition"
            >
              Detect GPS
            </button>
          </div>
        </div>
      </div>

      {/* Calculation & Fiqh Settings Drawer (if toggled) */}
      {showSettings && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 text-xs text-slate-200 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="font-bold text-amber-300">Prayer Calculation Configuration</h4>
            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          {/* City Selector */}
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Select City Worldwide:</label>
            <select
              value={selectedCity.city}
              onChange={(e) => {
                const found = POPULAR_CITIES.find(c => c.city === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              {POPULAR_CITIES.map(c => (
                <option key={c.city} value={c.city}>{c.city}, {c.country}</option>
              ))}
            </select>
          </div>

          {/* Asr Juristic Method */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Asr Juristic Method:</label>
              <select
                value={juristic}
                onChange={(e) => setJuristic(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              >
                <option value="hanafi">Hanafi (Shadow x2)</option>
                <option value="standard">Standard (Shafi'i/Maliki/Hanbali, Shadow x1)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Calculation Method:</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              >
                <option value="Karachi">Univ. of Islamic Sciences, Karachi</option>
                <option value="MWL">Muslim World League (MWL)</option>
                <option value="ISNA">ISNA (North America)</option>
                <option value="Makkah">Umm al-Qura (Makkah)</option>
                <option value="Egypt">Egyptian General Authority</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 5 Daily Prayers Schedule Cards */}
      <div className="space-y-2">
        {prayersList.map((p, idx) => {
          const isNext = times.nextPrayer === p.name;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl flex items-center justify-between border transition ${
                isNext 
                  ? 'bg-emerald-950/80 border-amber-400 ring-1 ring-amber-400/40 shadow-lg' 
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isNext ? 'bg-amber-500 text-emerald-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    {isNext && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400 text-emerald-950 font-bold uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{p.desc}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base sm:text-lg font-bold font-mono text-amber-300">
                  {p.time}
                </span>
                <span className="font-arabic text-xs text-slate-400 block -mt-0.5">
                  {p.arabic}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Azan Audio Player */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Volume2 className="w-4 h-4" />
          <span>Authentic Holy Sanctuary Azan Audio</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {AZAN_PRESETS.map(azan => {
            const isPlaying = playingAzanId === azan.id;
            return (
              <div key={azan.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-white">{azan.name}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">{azan.reciter}</p>
                </div>

                <button
                  onClick={() => handleToggleAzan(azan.id, azan.url)}
                  className={`mt-2 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    isPlaying 
                      ? 'bg-amber-400 text-emerald-950 animate-pulse' 
                      : 'bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/40'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Play Azan'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Islamic Calendar Upcoming Events */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Major Islamic Calendar Dates & Events</span>
        </h4>

        <div className="space-y-1.5 text-xs text-slate-300">
          {ISLAMIC_EVENTS.slice(0, 5).map((ev, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
              <div>
                <span className="font-semibold text-white">{ev.nameEn}</span>
                <span className="font-arabic text-amber-300 text-xs ml-2">({ev.nameUr})</span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-[11px]">{ev.hijriDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
