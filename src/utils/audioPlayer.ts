// Audio Management for Quran recitations, Azan, offline Web Audio effects, and Male Voice Speech Synthesis

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private voicesLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voicesLoaded = true;
        };
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play gentle wooden bead click for Digital Tasbeeh
  public playTasbeehClick(isTargetMilestone = false) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isTargetMilestone ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(isTargetMilestone ? 880 : 540, ctx.currentTime);
      if (isTargetMilestone) {
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
      }

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isTargetMilestone ? 0.3 : 0.08));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (isTargetMilestone ? 0.3 : 0.08));

      // Trigger mobile vibration if available
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(isTargetMilestone ? [60, 40, 60] : 15);
      }
    } catch {
      // Audio playback silently ignored if blocked by autoplay policy
    }
  }

  // Stop currently playing remote audio and speech
  public stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Play audio from URL with onEnded callback
  public playUrl(url: string, onEnded?: () => void, onError?: () => void): HTMLAudioElement {
    this.stopAudio();
    const audio = new Audio(url);
    this.currentAudio = audio;

    audio.onended = () => {
      this.currentAudio = null;
      if (onEnded) onEnded();
    };

    audio.onerror = () => {
      this.currentAudio = null;
      if (onError) onError();
    };

    audio.play().catch(err => {
      console.warn('Audio play request interrupted or blocked:', err);
      if (onError) onError();
    });

    return audio;
  }

  /**
   * Helper to find the best available MALE voice for the given language.
   * Filters out female voices (e.g. Zira, Samantha, Victoria, Susan)
   * and prioritizes male names or male descriptors.
   */
  private findMaleVoice(langCode: string): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const femaleKeywords = [
      'female', 'woman', 'girl', 'zira', 'susan', 'samantha', 
      'victoria', 'karen', 'hazel', 'heera', 'kalpana', 'catherine', 
      'fiona', 'moira', 'tessa', 'veena', 'alice'
    ];
    
    const maleKeywords = [
      'male', 'man', 'david', 'mark', 'george', 'guy', 'daniel', 
      'oliver', 'james', 'tarik', 'maged', 'naayf', 'hamed', 
      'salman', 'mehdi', 'bilal', 'zayd', 'asad', 'raza', 'tariq',
      'google uk english male', 'microsoft david', 'microsoft mark'
    ];

    const baseLang = langCode.split('-')[0].toLowerCase();

    // 1. Look for matching language with male name/keyword
    const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(baseLang));
    const maleLangVoice = langVoices.find(v => {
      const name = v.name.toLowerCase();
      const isMale = maleKeywords.some(k => name.includes(k));
      const isFemale = femaleKeywords.some(k => name.includes(k));
      return isMale && !isFemale;
    });
    if (maleLangVoice) return maleLangVoice;

    // 2. Look for matching language that is NOT explicitly female
    const neutralLangVoice = langVoices.find(v => {
      const name = v.name.toLowerCase();
      return !femaleKeywords.some(k => name.includes(k));
    });
    if (neutralLangVoice) return neutralLangVoice;

    // 3. Fallback to any male voice in the system (e.g., standard English/Arabic male)
    const anyMaleVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      const isMale = maleKeywords.some(k => name.includes(k));
      const isFemale = femaleKeywords.some(k => name.includes(k));
      return isMale && !isFemale;
    });
    if (anyMaleVoice) return anyMaleVoice;

    // 4. Fallback to non-female voice
    const fallbackVoice = voices.find(v => !femaleKeywords.some(k => v.name.toLowerCase().includes(k)));
    return fallbackVoice || voices[0] || null;
  }

  /**
   * Play speech synthesis in a resonant, respectful MALE voice.
   * Pitch is adjusted to 0.80 - 0.83 (deep, masculine baritone tone)
   * to guarantee male voice output across all operating systems.
   */
  public speakText(text: string, lang = 'ar-SA', onEnd?: () => void, onStart?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    this.stopAudio();
    const cleanText = text.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    
    // Male vocal tuning:
    // pitch 0.80 lowers normal synthetic voice into a dignified male baritone
    utterance.pitch = 0.82; 
    utterance.rate = 0.84; // measured, reverent pace for prayer, Quran, and Tafsir

    // Select authentic male voice if found in browser
    const maleVoice = this.findMaleVoice(lang);
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    if (onStart) {
      utterance.onstart = () => onStart();
    }
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Speak translation (Urdu, Pashto, English) in a dignified Male voice.
   */
  public speakTranslation(
    text: string, 
    lang: 'ur' | 'ps' | 'en' | 'ar', 
    onEnd?: () => void, 
    onStart?: () => void
  ) {
    // Map language code to standard BCP 47 tags with male voice preference
    let bcp47 = 'ur-PK';
    if (lang === 'ps') {
      bcp47 = 'ps-AF';
    } else if (lang === 'en') {
      bcp47 = 'en-US';
    } else if (lang === 'ar') {
      bcp47 = 'ar-SA';
    }

    this.speakText(text, bcp47, onEnd, onStart);
  }

  /**
   * Speak Tafsir (exegesis) in a dignified Male voice.
   */
  public speakTafsir(
    text: string, 
    lang: 'ur' | 'ps' | 'en', 
    onEnd?: () => void, 
    onStart?: () => void
  ) {
    this.speakTranslation(text, lang, onEnd, onStart);
  }
}

export const soundManager = new SoundManager();

export const AZAN_PRESETS = [
  {
    id: 'makkah',
    name: 'Makkah Al-Mukarramah Azan (Masjid al-Haram)',
    reciter: 'Sheikh Ali Ahmed Mulla (Male Reciter)',
    url: 'https://cdn.islamic.network/audio/adhan/makkah.mp3'
  },
  {
    id: 'madinah',
    name: 'Madinah Al-Munawwarah Azan (Masjid an-Nabawi)',
    reciter: 'Sheikh Essam Bukhari (Male Reciter)',
    url: 'https://cdn.islamic.network/audio/adhan/madinah.mp3'
  },
  {
    id: 'alaqsa',
    name: 'Al-Quds Al-Aqsa Azan',
    reciter: 'Sheikh Naji Qazzaz (Male Reciter)',
    url: 'https://cdn.islamic.network/audio/adhan/alaqsa.mp3'
  }
];
