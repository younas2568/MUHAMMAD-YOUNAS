import React from 'react';
import { TabType } from '../../types';
import { 
  Home, 
  BookOpen, 
  Clock, 
  HeartHandshake, 
  Sparkles, 
  Compass, 
  Layers,
  ScrollText,
  FileText
} from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }>; arabic: string }[] = [
    { id: 'home', label: 'Home', icon: Home, arabic: 'الرئيسية' },
    { id: 'quran', label: 'Quran', icon: BookOpen, arabic: 'القرآن' },
    { id: 'tafsir', label: 'Tafsir', icon: FileText, arabic: 'التفسير' },
    { id: 'namaz', label: 'Namaz', icon: Clock, arabic: 'الصلاة' },
    { id: 'hadith', label: 'Hadith', icon: ScrollText, arabic: 'الحديث' },
    { id: 'prayer-times', label: 'Tools', icon: Compass, arabic: 'الأدوات' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-emerald-900/40 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'prayer-times' && ['qibla', 'tasbeeh', 'ramadan'].includes(activeTab));
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition duration-200 ${
                isActive 
                  ? 'text-amber-400 font-bold' 
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              <div className={`p-1 rounded-lg transition ${isActive ? 'bg-emerald-900/60 ring-1 ring-amber-400/30' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400 scale-110' : 'text-slate-400'} transition-transform`} />
              </div>
              <span className="text-[10px] mt-0.5 font-medium leading-none">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
