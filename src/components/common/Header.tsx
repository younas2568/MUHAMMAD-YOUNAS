import React from 'react';
import { TabType, Language } from '../../types';
import { 
  BookOpen, 
  Compass, 
  HelpCircle, 
  Smartphone, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun,
  ShieldCheck,
  Languages,
  Download
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenPlayStoreGuide: () => void;
  onOpenCreatorModal: () => void;
  onOpenDownloadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
  isMobileFrame,
  setIsMobileFrame,
  onOpenPlayStoreGuide,
  onOpenCreatorModal,
  onOpenDownloadModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border-b border-emerald-800/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-amber-300/40 transform group-hover:scale-105 transition">
            <span className="font-arabic text-xl font-bold text-emerald-950">ن</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
                Noor-ul-Quran
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-amber-200/90 font-medium leading-none -mt-0.5">
              By Muhammad Younas • Upper Dir
            </p>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Download Center Button */}
          <button
            onClick={onOpenDownloadModal}
            title="Download App, Offline Quran & Resources"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 text-xs font-bold shadow-md transition"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden text-[11px]">Download</span>
          </button>

          {/* Creator Profile Button */}
          <button
            onClick={onOpenCreatorModal}
            title="App Creator: Muhammad Younas (Upper Dir)"
            className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-sm transition"
          >
            <img
              src="/creator-photo.jpg"
              alt="Muhammad Younas"
              className="w-4 h-4 rounded-full object-cover object-top ring-1 ring-amber-400 shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="hidden sm:inline">Creator</span>
            <span className="sm:hidden text-[11px]">M. Younas</span>
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Google Play Store Publishing Guide */}
          <button
            onClick={onOpenPlayStoreGuide}
            title="Google Play Store Publishing & APK Guide"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700/60 border border-emerald-600/40 text-emerald-200 text-xs font-semibold shadow-sm transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Play Store Guide</span>
            <span className="sm:hidden">APK</span>
          </button>

          {/* Language Switcher */}
          <div className="relative flex items-center bg-emerald-950/60 border border-emerald-700/50 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded font-medium transition ${language === 'en' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2 py-1 rounded font-arabic transition ${language === 'ur' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage('ps')}
              className={`px-2 py-1 rounded font-arabic transition ${language === 'ps' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              پښتو
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 rounded font-arabic transition ${language === 'ar' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              عربي
            </button>
          </div>

          {/* Mobile Frame Toggle (Desktop preview helper) */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? "Switch to Full Screen View" : "Switch to Mobile Device Frame"}
            className="hidden lg:flex p-2 rounded-lg bg-emerald-800/40 hover:bg-emerald-700/50 text-emerald-200 border border-emerald-700/40 transition"
          >
            {isMobileFrame ? <Monitor className="w-4 h-4 text-emerald-300" /> : <Smartphone className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-lg bg-emerald-800/40 hover:bg-emerald-700/50 text-emerald-200 border border-emerald-700/40 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
