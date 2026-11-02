import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Terminal, 
  Key, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface PlayStoreGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStoreGuideModal: React.FC<PlayStoreGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'capacitor' | 'bubblewrap' | 'checklist' | 'privacy'>('capacitor');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const capacitorCommands = [
    { title: '1. Install Capacitor Android packages', cmd: 'npm install @capacitor/core @capacitor/cli @capacitor/android' },
    { title: '2. Initialize Capacitor Project', cmd: 'npx cap init "Noor-ul-Quran" "com.noorulquran.islamicapp" --web-dir dist' },
    { title: '3. Build the Production Web Assets', cmd: 'npm run build' },
    { title: '4. Add the Android Platform', cmd: 'npx cap add android' },
    { title: '5. Sync Web Code into Android Project', cmd: 'npx cap sync' },
    { title: '6. Open in Android Studio to Build APK / AAB', cmd: 'npx cap open android' }
  ];

  const bubblewrapCommands = [
    { title: '1. Install Google Bubblewrap CLI (TWA)', cmd: 'npm install -g @bubblewrap/cli' },
    { title: '2. Initialize Android Project from Live URL', cmd: 'bubblewrap init --manifest=https://YOUR_APP_URL/manifest.webmanifest' },
    { title: '3. Build Signed Android App Bundle (AAB)', cmd: 'bubblewrap build' }
  ];

  const keystoreCommand = `keytool -genkey -v -keystore noor-ul-quran-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias noorquran`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-emerald-700/60 p-5 sm:p-6 shadow-2xl text-slate-100 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 shadow-md">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Google Play Store Publishing Center
              </h2>
              <p className="text-xs text-emerald-300">
                Official guide to build APK & signed AAB for Google Play Store release
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 pt-4 pb-3 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('capacitor')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${activeSubTab === 'capacitor' ? 'bg-amber-500 text-emerald-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Method 1: Capacitor (Recommended)
          </button>
          <button
            onClick={() => setActiveSubTab('bubblewrap')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${activeSubTab === 'bubblewrap' ? 'bg-amber-500 text-emerald-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Method 2: Bubblewrap (TWA)
          </button>
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${activeSubTab === 'checklist' ? 'bg-amber-500 text-emerald-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Play Store Checklist
          </button>
          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${activeSubTab === 'privacy' ? 'bg-amber-500 text-emerald-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm">
          {activeSubTab === 'capacitor' && (
            <div className="space-y-3">
              <div className="bg-emerald-950/60 border border-emerald-700/50 p-3 rounded-xl">
                <h4 className="font-bold text-amber-300 text-sm mb-1">Building Native APK & AAB with Capacitor</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Capacitor wraps Noor-ul-Quran into an Android Studio project that compiles natively to a release APK (for direct sideloading) and an Android App Bundle (.aab) for Google Play Store upload.
                </p>
              </div>

              {capacitorCommands.map((item, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
                  <div className="text-xs font-semibold text-slate-200 mb-1.5">{item.title}</div>
                  <div className="flex items-center justify-between bg-black/50 rounded-lg px-3 py-2 border border-slate-700/50 font-mono text-xs text-emerald-300">
                    <span className="truncate mr-2">{item.cmd}</span>
                    <button
                      onClick={() => copyToClipboard(item.cmd, idx)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
                <div className="text-xs font-semibold text-amber-300 mb-1">Generate Android Release Keystore</div>
                <p className="text-xs text-slate-300 mb-2">Run this in your terminal to create your signing certificate for the Google Play Store:</p>
                <div className="flex items-center justify-between bg-black/50 rounded-lg px-3 py-2 border border-slate-700/50 font-mono text-xs text-emerald-300">
                  <span className="truncate mr-2">{keystoreCommand}</span>
                  <button
                    onClick={() => copyToClipboard(keystoreCommand, 99)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'bubblewrap' && (
            <div className="space-y-3">
              <div className="bg-emerald-950/60 border border-emerald-700/50 p-3 rounded-xl">
                <h4 className="font-bold text-amber-300 text-sm mb-1">Quickest Path: Google Bubblewrap (TWA)</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Bubblewrap is Google's official command-line tool that wraps modern installable PWAs into a production-ready Android App Bundle (.aab) with automatic Digital Asset Links verification.
                </p>
              </div>

              {bubblewrapCommands.map((item, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
                  <div className="text-xs font-semibold text-slate-200 mb-1.5">{item.title}</div>
                  <div className="flex items-center justify-between bg-black/50 rounded-lg px-3 py-2 border border-slate-700/50 font-mono text-xs text-emerald-300">
                    <span className="truncate mr-2">{item.cmd}</span>
                    <button
                      onClick={() => copyToClipboard(item.cmd, 100 + idx)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {copiedIndex === 100 + idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'checklist' && (
            <div className="space-y-2.5">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">Google Play Console Submission Requirements</h4>
                
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">App Identity:</span> Package name <code className="text-amber-300">com.noorulquran.islamicapp</code>, App Name "Noor-ul-Quran", Default Language: English.
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Target Android SDK:</span> Target Android 14+ (API Level 34/35) as required by Google Play policies.
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">App Icons & Graphics:</span> High-res icon (512x512 PNG, provided in <code className="text-amber-300">/public/pwa-512x512.png</code>), Feature Graphic (1024x500 PNG), at least 2 phone screenshots.
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Content Rating Questionnaire:</span> Select "Reference / Education / News / Religion". Rating yields PEGI 3 / Everyone (All ages).
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Data Safety Declaration:</span> Geolocation data is used strictly for on-device calculation of Prayer Times and Qibla Direction; no personal data or coordinates are transmitted or sold to third parties.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'privacy' && (
            <div className="space-y-3 bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-amber-300 text-sm">Privacy Policy Template for Google Play Console</h4>
              <p>
                <strong>Noor-ul-Quran</strong> respects the privacy of all users. This application does not collect, sell, or track personal identification information.
              </p>
              <p>
                <strong>Device Location:</strong> Location permissions are requested purely to compute accurate local prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) and the trigonometric compass angle to the Kaaba in Makkah. Calculations occur directly on the device, and coordinates are never uploaded to any remote tracking server.
              </p>
              <p>
                <strong>Storage:</strong> Quran reading history, bookmarks, and Tasbeeh tallies are saved solely inside your device's local storage (IndexedDB/localStorage) and remain private to the user.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white hover:brightness-110 shadow-lg text-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
