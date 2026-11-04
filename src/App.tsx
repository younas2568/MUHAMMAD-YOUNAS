import React, { useState, useEffect } from 'react';
import { TabType, Language, BookmarkItem } from './types';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { PlayStoreGuideModal } from './components/common/PlayStoreGuideModal';
import { CreatorModal } from './components/common/CreatorModal';
import { DownloadCenterModal } from './components/common/DownloadCenterModal';

import { HomeView } from './components/home/HomeView';
import { QuranView } from './components/quran/QuranView';
import { TafsirView } from './components/tafsir/TafsirView';
import { NamazView } from './components/namaz/NamazView';
import { KalmasView } from './components/kalmas/KalmasView';
import { HadithView } from './components/hadith/HadithView';
import { SunnahView } from './components/sunnah/SunnahView';
import { KnowledgeView } from './components/knowledge/KnowledgeView';
import { DuasView } from './components/duas/DuasView';
import { PrayerTimesView } from './components/tools/PrayerTimesView';
import { QiblaView } from './components/tools/QiblaView';
import { TasbeehView } from './components/tools/TasbeehView';
import { RamadanView } from './components/tools/RamadanView';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [isPlayStoreGuideOpen, setIsPlayStoreGuideOpen] = useState<boolean>(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  // Bookmarks in LocalStorage
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Last Read Position
  const [lastRead, setLastRead] = useState<BookmarkItem | null>(() => {
    try {
      const saved = localStorage.getItem('quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleAddBookmark = (item: BookmarkItem) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.surahNumber === item.surahNumber && b.verseNumber === item.verseNumber);
      const updated = exists 
        ? prev.filter(b => !(b.surahNumber === item.surahNumber && b.verseNumber === item.verseNumber))
        : [item, ...prev];
      try {
        localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id);
      try {
        localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSaveLastRead = (item: BookmarkItem) => {
    setLastRead(item);
    try {
      localStorage.setItem('quran_last_read', JSON.stringify(item));
    } catch {}
  };

  const handleOpenSurah = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    setActiveTab('quran');
  };

  // Render view based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            setActiveTab={setActiveTab}
            language={language}
            onOpenSurah={handleOpenSurah}
            lastRead={lastRead}
            onOpenPlayStoreGuide={() => setIsPlayStoreGuideOpen(true)}
            onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        );
      case 'quran':
        return (
          <QuranView
            language={language}
            selectedSurahNumber={selectedSurahNumber}
            onSelectSurah={setSelectedSurahNumber}
            bookmarks={bookmarks}
            onBookmark={handleAddBookmark}
            onRemoveBookmark={handleRemoveBookmark}
            lastRead={lastRead}
            onSaveLastRead={handleSaveLastRead}
          />
        );
      case 'tafsir':
        return (
          <TafsirView
            initialSurahNumber={selectedSurahNumber || 1}
            onOpenQuranReader={handleOpenSurah}
          />
        );
      case 'namaz':
        return <NamazView language={language} />;
      case 'kalmas':
        return <KalmasView language={language} />;
      case 'hadith':
        return <HadithView language={language} />;
      case 'sunnah':
        return <SunnahView language={language} />;
      case 'knowledge':
        return <KnowledgeView language={language} />;
      case 'duas':
        return <DuasView language={language} />;
      case 'prayer-times':
        return (
          <PrayerTimesView
            language={language}
            onOpenQibla={() => setActiveTab('qibla')}
            onOpenTasbeeh={() => setActiveTab('tasbeeh')}
            onOpenRamadan={() => setActiveTab('ramadan')}
          />
        );
      case 'qibla':
        return <QiblaView onBack={() => setActiveTab('prayer-times')} />;
      case 'tasbeeh':
        return <TasbeehView onBack={() => setActiveTab('prayer-times')} />;
      case 'ramadan':
        return <RamadanView onBack={() => setActiveTab('prayer-times')} />;
      default:
        return (
          <HomeView
            setActiveTab={setActiveTab}
            language={language}
            onOpenSurah={handleOpenSurah}
            lastRead={lastRead}
            onOpenPlayStoreGuide={() => setIsPlayStoreGuideOpen(true)}
            onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        );
    }
  };

  const appBody = (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isDarkMode ? 'dark' : ''}`}>
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        onOpenPlayStoreGuide={() => setIsPlayStoreGuideOpen(true)}
        onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-5 pt-4">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Connectivity Banner */}
      <OfflineIndicator />

      {/* Play Store Publishing Guide Modal */}
      <PlayStoreGuideModal
        isOpen={isPlayStoreGuideOpen}
        onClose={() => setIsPlayStoreGuideOpen(false)}
      />

      {/* Creator & Developer Profile Modal */}
      <CreatorModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
      />

      {/* Download Center & Offline Management Modal */}
      <DownloadCenterModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onOpenPlayStoreGuide={() => {
          setIsDownloadModalOpen(false);
          setIsPlayStoreGuideOpen(true);
        }}
      />
    </div>
  );

  // If user has activated desktop Mobile Device Frame preview
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-3 sm:p-6">
        {/* Device Frame Top Label */}
        <div className="mb-2 flex items-center justify-between w-full max-w-[430px] px-2 text-xs text-slate-400">
          <span className="font-semibold text-emerald-400">Android Mobile Simulation (Pixel / Galaxy)</span>
          <button
            onClick={() => setIsMobileFrame(false)}
            className="text-amber-400 hover:underline font-bold"
          >
            Exit Frame
          </button>
        </div>

        {/* Realistic Android Phone Mockup Casing */}
        <div className="relative w-full max-w-[430px] h-[880px] max-h-[92vh] rounded-[48px] border-[10px] border-slate-800 bg-slate-950 shadow-2xl overflow-hidden ring-4 ring-slate-700/60 flex flex-col">
          {/* Simulated Android Status Bar */}
          <div className="bg-emerald-950 text-slate-300 px-6 py-2 flex items-center justify-between text-[11px] font-mono z-50 select-none border-b border-emerald-900/50">
            <span>09:41</span>
            {/* Camera Notch Hole */}
            <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-800" />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Embedded App View with Scrolling */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {appBody}
          </div>

          {/* Bottom Android Gesture Bar */}
          <div className="bg-slate-950 py-1.5 flex justify-center items-center z-50">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return appBody;
}
