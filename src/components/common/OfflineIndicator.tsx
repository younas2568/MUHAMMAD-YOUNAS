import React from 'react';
import { useOnlineStatus } from '../../hooks/usePWAInstall';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-18 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-amber-600/95 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white shadow-xl border border-amber-400/50 animate-bounce">
      <WifiOff className="w-3.5 h-3.5 text-amber-200" />
      <span>Offline Mode — Quran & prayer data cached</span>
    </div>
  );
};
