import React, { useState } from 'react';
import { Language } from '../../types';
import { 
  FIVE_PILLARS, 
  SIX_ARTICLES_OF_FAITH, 
  JURISPRUDENCE_CATEGORIES, 
  JURISPRUDENCE_SCHOOLS 
} from '../../data/islamicKnowledgeData';
import { QuizModal } from './QuizModal';
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  ShieldCheck, 
  Scale, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface KnowledgeViewProps {
  language: Language;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'pillars' | 'faith' | 'rulings' | 'madhabs' | 'halal'>('pillars');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border border-purple-700/50 p-5 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950 text-amber-300 text-xs font-bold border border-purple-700/50 mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Foundations of Deen</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-arabic text-amber-300">
              مَعْلُومَاتٌ إِسْلَامِيَّةٌ وَفِقْهِيَّةٌ
            </h2>
            <p className="text-xs text-purple-200/90 mt-0.5">
              The Five Pillars, Six Articles of Faith, Jurisprudence (Fiqh), Halal & Haram guides, and Quizzes.
            </p>
          </div>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold text-xs shadow-lg hover:brightness-110 shrink-0 transition"
          >
            <Award className="w-4 h-4" />
            <span>Play Quiz</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-purple-900/40 text-xs font-semibold">
        {[
          { id: 'pillars', label: '5 Pillars of Islam' },
          { id: 'faith', label: '6 Articles of Faith' },
          { id: 'rulings', label: 'Fard, Wajib & Sunnah' },
          { id: 'madhabs', label: '4 Fiqh Schools' },
          { id: 'halal', label: 'Halal & Haram Guide' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap border ${
              activeSubTab === tab.id 
                ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-md' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Five Pillars */}
      {activeSubTab === 'pillars' && (
        <div className="space-y-3">
          {FIVE_PILLARS.map(p => (
            <div key={p.number} className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-lg space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-purple-950 text-amber-300 border border-purple-700/50 font-mono font-bold text-xs flex items-center justify-center">
                    {p.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.nameEn}</h4>
                    <p className="font-arabic text-xs text-amber-300">{p.nameUr}</p>
                  </div>
                </div>
                <span className="font-arabic text-base font-bold text-emerald-300">
                  {p.nameAr}
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-300">{p.summary}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{p.details}</p>
            </div>
          ))}
        </div>
      )}

      {/* 2. Six Articles of Faith */}
      {activeSubTab === 'faith' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 text-xs text-slate-200">
            <strong className="text-amber-300 block mb-1">Iman-e-Mufassal:</strong>
            The comprehensive articles of belief required of every Muslim heart, based on the famous Hadith of Jibril (AS).
          </div>

          {SIX_ARTICLES_OF_FAITH.map(item => (
            <div key={item.number} className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-lg space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-emerald-900 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                  {item.number}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.titleEn}</h4>
                  <p className="font-arabic text-xs text-amber-300">{item.titleUr}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-8.5">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* 3. Jurisprudence Rulings (Fard, Wajib, etc.) */}
      {activeSubTab === 'rulings' && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            Islamic Shariah categorizes human actions into distinct legal rulings (Al-Ahkam al-Khamsah). Below is the authentic breakdown including classical Hanafi and general majority distinctions:
          </div>

          {JURISPRUDENCE_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-lg space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <h4 className="text-sm font-bold text-amber-400">{cat.term}</h4>
                <span className="font-arabic text-xs font-bold text-emerald-300">{cat.arabic}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{cat.meaning}</p>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-white">Examples: </strong>{cat.examples}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Four Jurisprudence Schools */}
      {activeSubTab === 'madhabs' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-800/50 text-xs text-slate-300 leading-relaxed">
            All four orthodox Sunni schools of jurisprudence (Hanafi, Shafi'i, Maliki, Hanbali) are valid, respected expressions of the Sunnah. Their differences arise from scholarly ijtihad upon linguistic nuances and transmission methodologies.
          </div>

          {JURISPRUDENCE_SCHOOLS.map((school, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-lg space-y-2">
              <h4 className="text-sm font-bold text-amber-400">{school.name}</h4>
              <div className="text-xs text-emerald-300">
                <strong>Primary Regions: </strong>{school.primaryRegions}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <strong className="text-white block mb-0.5">Distinctive Juristic Notes:</strong>
                {school.distinctRules}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 5. Halal & Haram Guide */}
      {activeSubTab === 'halal' && (
        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>Earnings, Finance & Prohibition of Riba (Interest)</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Consuming or charging usury/interest (Riba) is unequivocally declared war against Allah and His Messenger in Surah Al-Baqarah (2:278-279). Muslims are obligated to seek lawful (Halal) pure livelihood through honest trade, labor, and ethical enterprise.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Halal Dietary Foundations</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              All wholesome foods, fruits, grains, seafood, and cattle slaughtered mentioning the name of Allah (Zabiha) are lawful. Prohibited (Haram) foods include carrion, flowing blood, swine/pork, carnivorous animals with fangs, birds of prey with talons, and all intoxicants/alcohol.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
};
