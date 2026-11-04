import React, { useState } from 'react';
import { Language, NamazStep, PrayerTypeInfo } from '../../types';
import { PRAYERS_INFO, STEP_BY_STEP_PRAYER, WUDU_GUIDE, GHUSL_GUIDE } from '../../data/namazData';
import { 
  Clock, 
  HelpCircle, 
  Droplet, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Layers
} from 'lucide-react';
import { soundManager } from '../../utils/audioPlayer';

interface NamazViewProps {
  language: Language;
}

export const NamazView: React.FC<NamazViewProps> = ({ language }) => {
  const [subTab, setSubTab] = useState<'step_by_step' | 'prayers' | 'wudu' | 'ghusl'>('step_by_step');
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTypeInfo>(PRAYERS_INFO[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingAudioType, setPlayingAudioType] = useState<'arabic' | 'urdu' | 'english' | null>(null);

  const currentStep = STEP_BY_STEP_PRAYER[selectedStepIndex];

  const handlePlayVoice = (text: string, type: 'arabic' | 'urdu' | 'english' = 'arabic') => {
    if (isPlayingAudio && playingAudioType === type) {
      soundManager.stopAudio();
      setIsPlayingAudio(false);
      setPlayingAudioType(null);
      return;
    }

    setIsPlayingAudio(true);
    setPlayingAudioType(type);
    
    if (type === 'arabic') {
      soundManager.speakText(text, 'ar-SA', () => {
        setIsPlayingAudio(false);
        setPlayingAudioType(null);
      });
    } else if (type === 'urdu') {
      soundManager.speakTranslation(text, 'ur', () => {
        setIsPlayingAudio(false);
        setPlayingAudioType(null);
      });
    } else {
      soundManager.speakTranslation(text, 'en', () => {
        setIsPlayingAudio(false);
        setPlayingAudioType(null);
      });
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border border-emerald-600/40 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-700/50 mb-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>The Second Pillar of Islam</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              كِتَابُ الصَّلَاةِ وَالطَّهَارَةِ
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              Comprehensive Namaz guide, five daily prayers, step-by-step postures, Wudu & Ghusl.
            </p>
          </div>
          <div className="hidden sm:block font-arabic text-4xl text-amber-300/30">
            صلوة
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1.5 border-b border-emerald-900/50 pb-2 overflow-x-auto no-scrollbar text-xs font-semibold">
        {[
          { id: 'step_by_step', label: 'Step-by-Step Prayer', icon: Layers },
          { id: 'prayers', label: '5 Daily Prayers & Rakats', icon: Clock },
          { id: 'wudu', label: 'Wudu (Ablution) Guide', icon: Droplet },
          { id: 'ghusl', label: 'Ghusl (Bath) Guide', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSubTab(tab.id as any);
                soundManager.stopAudio();
                setIsPlayingAudio(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                isActive 
                  ? 'bg-amber-500 text-emerald-950 font-bold shadow-md' 
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Step-by-Step Prayer Tutorial */}
      {subTab === 'step_by_step' && (
        <div className="space-y-4">
          {/* Posture Carousel Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {STEP_BY_STEP_PRAYER.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setSelectedStepIndex(idx);
                  soundManager.stopAudio();
                  setIsPlayingAudio(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-2 border ${
                  selectedStepIndex === idx 
                    ? 'bg-emerald-800 text-amber-300 border-amber-400 font-bold shadow-md' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center font-mono text-[10px]">
                  {step.stepNumber}
                </span>
                <span>{step.arabicName}</span>
              </button>
            ))}
          </div>

          {/* Current Posture Card */}
          <div className="rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 shadow-xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center font-bold text-sm shadow">
                  {currentStep.stepNumber}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {currentStep.titleEn}
                  </h3>
                  <p className="font-arabic text-xs text-amber-300">
                    {currentStep.titleUr}
                  </p>
                </div>
              </div>

              {currentStep.arabicText && (
                <div className="flex items-center gap-1.5">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-amber-300 font-bold bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-700/60">
                    🎙️ مردانہ آواز (Male Qari)
                  </span>
                  <button
                    onClick={() => handlePlayVoice(currentStep.audioVoiceText || currentStep.arabicText || '', 'arabic')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow ${
                      isPlayingAudio && playingAudioType === 'arabic'
                        ? 'bg-amber-400 text-emerald-950 animate-pulse' 
                        : 'bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-200'
                    }`}
                  >
                    {isPlayingAudio && playingAudioType === 'arabic' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{isPlayingAudio && playingAudioType === 'arabic' ? 'Stop' : 'قراءت سنیں'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Posture Description */}
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Physical Posture & Method:</strong>
                {currentStep.postureDescription}
              </div>
            </div>

            {/* Arabic Recitation */}
            {currentStep.arabicText && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-950 border border-emerald-800/60 text-right space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    Arabic Recitation {currentStep.repetitionCount ? `(${currentStep.repetitionCount}x)` : ''}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold font-arabic">
                    🎙️ مردانہ آواز میں قراءت
                  </span>
                </div>
                <div className="clear-both font-quran text-xl sm:text-2xl text-amber-100 font-bold leading-loose select-text py-1">
                  {currentStep.arabicText}
                </div>

                {currentStep.transliterationEn && (
                  <p className="text-left text-xs italic text-emerald-300/90 font-sans pt-1">
                    {currentStep.transliterationEn}
                  </p>
                )}
              </div>
            )}

            {/* Translations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              {currentStep.translationUr && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-right space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePlayVoice(currentStep.translationUr || '', 'urdu')}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold transition border ${
                        isPlayingAudio && playingAudioType === 'urdu'
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950/80 text-amber-300 border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {isPlayingAudio && playingAudioType === 'urdu' ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{isPlayingAudio && playingAudioType === 'urdu' ? 'Stop' : 'ترجمہ سنیں (مردانہ آواز)'}</span>
                    </button>
                    <span className="text-[10px] font-bold text-amber-400">ترجمہ (اردو):</span>
                  </div>
                  <p className="font-arabic text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentStep.translationUr}
                  </p>
                </div>
              )}

              {currentStep.translationEn && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400">English Translation:</span>
                    <button
                      onClick={() => handlePlayVoice(currentStep.translationEn || '', 'english')}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold transition border ${
                        isPlayingAudio && playingAudioType === 'english'
                          ? 'bg-amber-400 text-emerald-950 border-amber-300'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {isPlayingAudio && playingAudioType === 'english' ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{isPlayingAudio && playingAudioType === 'english' ? 'Stop' : 'Listen (Male Voice)'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentStep.translationEn}
                  </p>
                </div>
              )}
            </div>

            {/* Jurisprudence Note */}
            {currentStep.juridicalNote && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-0.5">Fiqh & Madhab Notes:</strong>
                  {currentStep.juridicalNote}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                disabled={selectedStepIndex === 0}
                onClick={() => {
                  setSelectedStepIndex(Math.max(0, selectedStepIndex - 1));
                  soundManager.stopAudio();
                  setIsPlayingAudio(false);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <span className="text-xs text-slate-400 font-mono">
                {selectedStepIndex + 1} / {STEP_BY_STEP_PRAYER.length}
              </span>

              <button
                disabled={selectedStepIndex === STEP_BY_STEP_PRAYER.length - 1}
                onClick={() => {
                  setSelectedStepIndex(Math.min(STEP_BY_STEP_PRAYER.length - 1, selectedStepIndex + 1));
                  soundManager.stopAudio();
                  setIsPlayingAudio(false);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white disabled:opacity-40 transition"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Five Daily Prayers Overview & Rakats */}
      {subTab === 'prayers' && (
        <div className="space-y-4">
          {/* Prayer Selection Pill */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {PRAYERS_INFO.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPrayer(p)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-2 border ${
                  selectedPrayer.id === p.id 
                    ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-md' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <span>{p.nameEn}</span>
                <span className="font-arabic text-xs">({p.nameUr})</span>
              </button>
            ))}
          </div>

          {/* Detailed Prayer Card */}
          <div className="rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedPrayer.nameEn} ({selectedPrayer.nameAr})
                </h3>
                <p className="font-arabic text-sm text-amber-300">
                  {selectedPrayer.nameUr}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-amber-400 font-mono">
                  {selectedPrayer.totalRakats}
                </span>
                <span className="text-xs text-slate-400 block -mt-1">Total Rakats</span>
              </div>
            </div>

            {/* Timing & Significance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-400 block mb-1">Prescribed Time:</strong>
                <p className="text-slate-300">{selectedPrayer.timing}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">Spiritual Significance:</strong>
                <p className="text-slate-300">{selectedPrayer.importance}</p>
              </div>
            </div>

            {/* Rakats Breakdown Table */}
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Rakats Structure & Order of Performance
              </h4>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 text-amber-300 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Rakats</th>
                      <th className="p-2.5">Status & Ruling</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {selectedPrayer.breakdown.sunnahGhairMuakkadah && (
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Sunnah Ghair Mu'akkadah</td>
                        <td className="p-2.5 font-mono font-bold text-amber-300">{selectedPrayer.breakdown.sunnahGhairMuakkadah}</td>
                        <td className="p-2.5 text-slate-400">Prayed before Fard (Recommended)</td>
                      </tr>
                    )}
                    {selectedPrayer.breakdown.sunnahMuakkadah && (
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Sunnah Mu'akkadah (Prior)</td>
                        <td className="p-2.5 font-mono font-bold text-amber-300">{selectedPrayer.breakdown.sunnahMuakkadah}</td>
                        <td className="p-2.5 text-emerald-400 font-medium">Emphasized Sunnah (Strongly encouraged)</td>
                      </tr>
                    )}
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Fard (Obligatory)</td>
                      <td className="p-2.5 font-mono font-bold text-amber-400 text-sm">{selectedPrayer.breakdown.fard}</td>
                      <td className="p-2.5 text-rose-400 font-bold">Strictly Obligatory Pillar</td>
                    </tr>
                    {(selectedPrayer.breakdown as any).sunnahMuakkadahAfter && (
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Sunnah Mu'akkadah (After)</td>
                        <td className="p-2.5 font-mono font-bold text-amber-300">{(selectedPrayer.breakdown as any).sunnahMuakkadahAfter}</td>
                        <td className="p-2.5 text-emerald-400">Prayed after Fard</td>
                      </tr>
                    )}
                    {selectedPrayer.breakdown.witr !== undefined && selectedPrayer.breakdown.witr > 0 && (
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Witr (with Dua Qunoot)</td>
                        <td className="p-2.5 font-mono font-bold text-amber-300">{selectedPrayer.breakdown.witr}</td>
                        <td className="p-2.5 text-amber-400 font-semibold">Wajib (Hanafi) / Sunnah Mu'akkadah</td>
                      </tr>
                    )}
                    {selectedPrayer.breakdown.nafl && (
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Nafl (Voluntary)</td>
                        <td className="p-2.5 font-mono font-bold text-amber-300">{selectedPrayer.breakdown.nafl}</td>
                        <td className="p-2.5 text-slate-400">Voluntary reward</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed italic">
              {selectedPrayer.description}
            </p>
          </div>
        </div>
      )}

      {/* 3. Wudu (Ablution) Guide */}
      {subTab === 'wudu' && (
        <div className="space-y-4">
          {/* Fard Actions Card */}
          <div className="rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Droplet className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                The 4 Fard (Obligatory) Pillars of Wudu
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              According to Surah Al-Ma'idah (5:6), these 4 acts are strictly obligatory for Wudu to be valid:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WUDU_GUIDE.fardSteps.map(fard => (
                <div key={fard.number} className="p-3 rounded-xl bg-slate-950 border border-emerald-800/40">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-900 text-amber-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      {fard.number}
                    </span>
                    <h5 className="font-bold text-xs text-white">{fard.title}</h5>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">{fard.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete 10 Sunnah Steps */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Complete Step-by-Step Sunnah Ablution Method</span>
            </h4>

            <div className="space-y-2">
              {WUDU_GUIDE.sunnahSteps.map(s => (
                <div key={s.number} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-emerald-950 text-amber-300 border border-emerald-700/40 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {s.number}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{s.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dua After Wudu */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-950 border border-emerald-600/50 p-4 shadow-xl text-right space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                Supplication Upon Completing Wudu
              </span>
              <button
                onClick={() => handlePlayVoice(WUDU_GUIDE.wuduDua.arabic, 'arabic')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-200 text-xs font-bold transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>دعا سنیں (مردانہ آواز)</span>
              </button>
            </div>
            <div className="clear-both font-quran text-lg sm:text-xl text-amber-100 font-bold leading-relaxed py-1">
              {WUDU_GUIDE.wuduDua.arabic}
            </div>
            <p className="text-left text-xs italic text-emerald-300 font-sans">
              {WUDU_GUIDE.wuduDua.transliteration}
            </p>
            <p className="text-xs text-slate-300 text-left pt-1 border-t border-emerald-900/40">
              "{WUDU_GUIDE.wuduDua.translationEn}"
            </p>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => handlePlayVoice(WUDU_GUIDE.wuduDua.translationUr, 'urdu')}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline font-arabic"
              >
                🔊 اردو ترجمہ سنیں
              </button>
              <p className="font-arabic text-xs text-amber-200/90 text-right">
                {WUDU_GUIDE.wuduDua.translationUr}
              </p>
            </div>
          </div>

          {/* Nullifiers of Wudu */}
          <div className="rounded-2xl bg-slate-900 border border-rose-900/40 p-5 shadow-xl space-y-2.5">
            <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Nawaqid al-Wudu (Actions that Invalidate Wudu)</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {WUDU_GUIDE.nullifiers.map((nullifier, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{nullifier}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 4. Ghusl (Full Bath) Guide */}
      {subTab === 'ghusl' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 shadow-xl space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>The 3 Fard (Obligatory) Pillars of Ghusl</span>
            </h3>
            <p className="text-xs text-slate-300">
              Missing any of these 3 actions leaves the Ghusl incomplete and ritual impurity intact:
            </p>

            <div className="space-y-2">
              {GHUSL_GUIDE.fardSteps.map(f => (
                <div key={f.number} className="p-3 rounded-xl bg-slate-950 border border-emerald-800/40 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-900 text-amber-300 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                    {f.number}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-white">{f.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-amber-300">
              Step-by-Step Sunnah Manner of Ghusl
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              {GHUSL_GUIDE.sunnahMethod.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
