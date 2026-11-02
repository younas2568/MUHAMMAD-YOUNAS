import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Share2, PlusSquare, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-1.5 text-xs font-bold text-emerald-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition animate-pulse"
        title="Install Noor-ul-Quran on your Android device"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-800/60 border border-emerald-600/40 px-2.5 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-700/60 transition"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Install iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-400 font-bold">
                    ن
                  </div>
                  <h3 className="text-base font-bold text-white">Install on iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <div className="p-1.5 rounded-lg bg-emerald-950 text-amber-400">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">1. Tap Share in Safari</p>
                    <p className="text-xs text-slate-400">Tap the Share icon on the Safari bottom bar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <div className="p-1.5 rounded-lg bg-emerald-950 text-amber-400">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">2. Add to Home Screen</p>
                    <p className="text-xs text-slate-400">Scroll down and tap "Add to Home Screen".</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-sm font-bold text-white hover:brightness-110 shadow-lg transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
