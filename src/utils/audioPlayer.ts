// Audio Management for Quran recitations, Azan, and offline Web Audio effects

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;

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

  // Stop currently playing remote audio
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

  // Play speech synthesis in Arabic or English
  public speakText(text: string, lang = 'ar-SA', onEnd?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    this.stopAudio();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // deliberate measured pace for Quran/Dua
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const soundManager = new SoundManager();

export const AZAN_PRESETS = [
  {
    id: 'makkah',
    name: 'Makkah Al-Mukarramah Azan (Masjid al-Haram)',
    reciter: 'Sheikh Ali Ahmed Mulla',
    url: 'https://cdn.islamic.network/audio/adhan/makkah.mp3'
  },
  {
    id: 'madinah',
    name: 'Madinah Al-Munawwarah Azan (Masjid an-Nabawi)',
    reciter: 'Sheikh Essam Bukhari',
    url: 'https://cdn.islamic.network/audio/adhan/madinah.mp3'
  },
  {
    id: 'alaqsa',
    name: 'Al-Quds Al-Aqsa Azan',
    reciter: 'Sheikh Naji Qazzaz',
    url: 'https://cdn.islamic.network/audio/adhan/alaqsa.mp3'
  }
];
