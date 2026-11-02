import React from 'react';
import { X, User, MapPin, Mail, Award, Heart, ShieldCheck, Sparkles } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-600/60 p-6 shadow-2xl text-slate-100 my-8 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center font-bold shadow-lg">
              <User className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">App Creator & Developer</h3>
              <p className="text-xs text-emerald-300 font-arabic">مطور التطبيق والمنشئ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Creator Identity Card with Real Photo */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 border border-emerald-600/50 p-5 text-center space-y-3 relative overflow-hidden shadow-inner">
          <div className="relative w-28 h-28 mx-auto">
            <img 
              src="/creator-photo.jpg" 
              alt="Muhammad Younas - Creator of Noor-ul-Quran" 
              className="w-28 h-28 object-cover rounded-2xl mx-auto shadow-2xl ring-4 ring-amber-400 border-2 border-emerald-950"
              onError={(e) => {
                // Fallback to stylized monogram if image load fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-500 border-2 border-slate-900 flex items-center justify-center text-emerald-950 shadow">
              <Sparkles className="w-4 h-4 fill-emerald-950" />
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
              LEAD DEVELOPER & CREATOR
            </span>
            <h4 className="text-xl font-extrabold text-white mt-1.5 tracking-wide">
              MUHAMMAD YOUNAS
            </h4>
            <p className="font-arabic text-sm text-emerald-300 font-bold mt-0.5">
              محمد یونس
            </p>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-700/60 text-xs font-semibold text-amber-300 shadow">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>UPPER DIR (دیر بالا)</span>
          </div>
        </div>

        {/* Details & Mission */}
        <div className="space-y-2.5 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Creator Name:</span>
            <strong className="text-white font-mono text-xs">MUHAMMAD YOUNAS</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Address / Location:</span>
            <strong className="text-amber-300 font-semibold">UPPER DIR, KPK, PAKISTAN</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Contact Email:</span>
            <span className="text-emerald-300 font-mono text-xs select-all">younas889700@gmail.com</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-700/40 text-xs text-slate-200 leading-relaxed space-y-1">
            <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Sadaqah Jariyah Dedication:</span>
            </strong>
            <p>
              "This application was crafted with sincere dedication by Muhammad Younas from Upper Dir as a continuous charity (Sadaqah Jariyah) for the benefit of the Muslim Ummah worldwide."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:brightness-110 shadow-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
