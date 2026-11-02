import React, { useState } from 'react';
import { ISLAMIC_QUIZ_QUESTIONS } from '../../data/islamicKnowledgeData';
import { 
  X, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = ISLAMIC_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < ISLAMIC_QUIZ_QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-700/60 p-6 shadow-2xl text-slate-100 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-900 text-purple-300 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Islamic Knowledge Quiz</h3>
              <p className="text-xs text-slate-400">Test your understanding of Quran, Prophets & Sunnah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          <div className="mt-4 space-y-4">
            {/* Progress & Category */}
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 font-bold border border-emerald-700/50">
                Category: {currentQ.category}
              </span>
              <span className="font-mono text-slate-400 font-semibold">
                Question {currentIndex + 1} of {ISLAMIC_QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;

                let btnStyle = "bg-slate-950/70 border-slate-800 hover:border-emerald-600 text-slate-200";
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-950 border-rose-500 text-rose-200 font-bold";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-emerald-900/60 border-amber-400 text-amber-300 font-bold shadow";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when submitted */}
            {isAnswerSubmitted && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-800/60 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-200">
                <strong className="text-amber-300 block mb-1">Authentic Explanation:</strong>
                {currentQ.explanation}
              </div>
            )}

            {/* Action Button */}
            <div className="pt-2 flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-40 transition shadow"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1 px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition shadow"
                >
                  <span>{currentIndex + 1 < ISLAMIC_QUIZ_QUESTIONS.length ? 'Next Question' : 'See Results'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Final Results Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mx-auto shadow-xl">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">Quiz Completed!</h4>
              <p className="text-xs text-slate-400">May Allah bless you with increase in beneficial knowledge.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-block font-mono">
              <span className="text-3xl font-extrabold text-amber-400">{score}</span>
              <span className="text-sm text-slate-400"> / {ISLAMIC_QUIZ_QUESTIONS.length}</span>
              <p className="text-xs text-emerald-400 mt-1 font-sans">
                {Math.round((score / ISLAMIC_QUIZ_QUESTIONS.length) * 100)}% Accuracy
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
