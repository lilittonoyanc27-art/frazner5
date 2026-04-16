import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Waves, 
  Anchor, 
  Compass, 
  Fish, 
  Ship, 
  Trophy, 
  Sparkles,
  Zap,
  RotateCcw,
  Shell,
  Navigation
} from 'lucide-react';

// --- Types ---
interface NumberExercise {
  id: number;
  number: number;
  options: string[];
  correct: string;
  translation: string;
}

// --- Data (20 Exercises) ---
const EXERCISES: NumberExercise[] = [
  { id: 1, number: 1, options: ["Uno", "Dos", "Tres"], correct: "Uno", translation: "Մեկ" },
  { id: 2, number: 7, options: ["Siete", "Seis", "Ocho"], correct: "Siete", translation: "Յոթ" },
  { id: 3, number: 11, options: ["Once", "Doce", "Diez"], correct: "Once", translation: "Տասնմեկ" },
  { id: 4, number: 15, options: ["Quince", "Cincuenta", "Cinco"], correct: "Quince", translation: "Տասնհինգ" },
  { id: 5, number: 20, options: ["Veinte", "Treinta", "Diez"], correct: "Veinte", translation: "Քսան" },
  { id: 6, number: 25, options: ["Veinticinco", "Quince", "Treinta"], correct: "Veinticinco", translation: "Քսանհինգ" },
  { id: 7, number: 30, options: ["Treinta", "Trece", "Treinta y uno"], correct: "Treinta", translation: "Երեսուն" },
  { id: 8, number: 40, options: ["Cuarenta", "Cincuenta", "Cuatro"], correct: "Cuarenta", translation: "Քառասուն" },
  { id: 9, number: 50, options: ["Cincuenta", "Cinco", "Cuarenta"], correct: "Cincuenta", translation: "Հիսուն" },
  { id: 10, number: 14, options: ["Catorce", "Cuatro", "Diez"], correct: "Catorce", translation: "Տասնչորս" },
  { id: 11, number: 60, options: ["Sesenta", "Setenta", "Ochenta"], correct: "Sesenta", translation: "Վաթսուն" },
  { id: 12, number: 70, options: ["Setenta", "Sesenta", "Siete"], correct: "Setenta", translation: "Յոթանասուն" },
  { id: 13, number: 80, options: ["Ochenta", "Ocho", "Noventa"], correct: "Ochenta", translation: "Ութսուն" },
  { id: 14, number: 90, options: ["Noventa", "Nueve", "Noventa y nueve"], correct: "Noventa", translation: "Իննսուն" },
  { id: 15, number: 100, options: ["Cien", "Mil", "Cincuenta"], correct: "Cien", translation: "Հարյուր" },
  { id: 16, number: 2, options: ["Dos", "Doce", "Dos mil"], correct: "Dos", translation: "Երկու" },
  { id: 17, number: 33, options: ["Treinta y tres", "Trece", "Tres"], correct: "Treinta y tres", translation: "Երեսուն երեք" },
  { id: 18, number: 45, options: ["Cuarenta y cinco", "Cincuenta", "Cuatro"], correct: "Cuarenta y cinco", translation: "Քառասունհինգ" },
  { id: 19, number: 16, options: ["Dieciséis", "Diez", "Seis"], correct: "Dieciséis", translation: "Տասնվեց" },
  { id: 20, number: 0, options: ["Cero", "Cien", "Cero mil"], correct: "Cero", translation: "Զրո" }
];

export default function OceanNumberAdventure() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [progress, setProgress] = useState(0); // For ship position

  const currentTask = EXERCISES[currentIndex];

  const handleAnswer = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentTask.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex === EXERCISES.length - 1) {
        setGameState('won');
      } else {
        setCurrentIndex(prev => prev + 1);
        setProgress(((currentIndex + 1) / EXERCISES.length) * 100);
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#075985] text-white font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Ocean Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Waves */}
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-20"
        >
          <Waves className="w-full h-full text-white/10" />
        </motion.div>
        
        {/* Falling Shells/Fish */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, x: Math.random() * 100 + '%' }}
            animate={{ y: '110vh', rotate: 360 }}
            transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: 'linear' }}
            className="absolute opacity-10"
          >
            {i % 2 === 0 ? <Fish className="w-8 h-8" /> : <Shell className="w-6 h-6" />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-10 space-y-8 max-w-xl bg-[#0c4a6e]/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/10"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.4)] border-4 border-white/20">
                  <Ship className="w-14 h-14 text-white" />
                </div>
              </motion.div>
              <Anchor className="absolute -bottom-4 -right-4 w-10 h-10 text-slate-300 animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-500">
                Ocean <span className="text-white">Numbers</span>
              </h1>
              <p className="text-blue-300 font-bold uppercase tracking-[0.4em] text-sm">
                20 Challenges Underwater
              </p>
            </div>

            <p className="text-blue-100 font-medium leading-relaxed text-lg">
              Սուզվիր օվկիանոսի խորքերը և սովորիր իսպաներեն թվերը: 
              Պատասխանիր 20 հարցի և հասիր գանձերի կղզուն:
            </p>

            <button
              onClick={() => setGameState('playing')}
              className="group relative w-full py-6 bg-blue-500 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-blue-400 transition-all active:scale-95 shadow-2xl overflow-hidden border-b-8 border-blue-700"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                Սկսել Արկածը
                <Navigation className="w-7 h-7" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8 z-10"
          >
            {/* Sidebar: Navigation & Progress */}
            <div className="space-y-4 lg:col-span-1">
              <div className="bg-[#0c4a6e]/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-xl relative overflow-hidden">
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">Voyage Progress</div>
                
                <div className="relative h-64 flex flex-col justify-between items-center py-4">
                  {/* Vertical Path */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-2 h-full bg-white/10 rounded-full" />
                  
                  {/* Ship Indicator */}
                  <motion.div 
                    animate={{ y: `${100 - progress}%`, rotate: [-5, 5, -5] }}
                    className="absolute left-1/2 -translate-x-1/2 z-20"
                    style={{ bottom: `${progress}%` }}
                  >
                    <Ship className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </motion.div>

                  <Trophy className={`w-8 h-8 ${progress === 100 ? 'text-yellow-400' : 'text-white/20'}`} />
                  <Anchor className="w-8 h-8 text-blue-500" />
                </div>

                <div className="mt-6 text-center">
                  <div className="text-2xl font-black">{currentIndex + 1} / {EXERCISES.length}</div>
                  <div className="text-[10px] uppercase font-bold text-blue-400">Exercise</div>
                </div>
              </div>

              <div className="bg-[#0c4a6e]/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <span className="font-black uppercase tracking-widest text-[10px]">Current Depth</span>
                </div>
                <div className="text-3xl font-black text-white">{score * 100}m</div>
              </div>
            </div>

            {/* Main: Question Card */}
            <div className="lg:col-span-3">
              <motion.div
                key={currentIndex}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white text-[#0c4a6e] rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative border-8 border-white/10 h-full flex flex-col justify-center"
              >
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs text-blue-500">
                      <Zap className="w-4 h-4" />
                      Underwater Challenge
                    </div>
                    <div className="px-4 py-1 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 border border-blue-100">
                      Exercise {currentIndex + 1}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center">
                      <motion.div 
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-indigo-600 leading-none tracking-tighter"
                      >
                        {currentTask.number}
                      </motion.div>
                      <p className="text-slate-400 font-bold uppercase tracking-[0.5em] mt-4">
                        {currentTask.translation}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentTask.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(opt)}
                        className={`py-6 rounded-3xl font-black text-2xl md:text-3xl transition-all border-b-8 active:translate-y-2 active:border-b-0 ${
                          feedback === 'correct' && opt === currentTask.correct
                            ? 'bg-emerald-500 border-emerald-700 text-white'
                            : feedback === 'wrong' && opt === currentTask.correct
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                            : feedback === 'wrong' && opt !== currentTask.correct
                            ? 'bg-slate-100 border-slate-200 text-slate-300 opacity-50'
                            : 'bg-slate-100 border-slate-300 text-[#0c4a6e] hover:bg-blue-500 hover:text-white hover:border-blue-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex items-center justify-center gap-4 p-6 rounded-[2rem] font-black uppercase text-xl ${feedback === 'correct' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}
                      >
                        {feedback === 'correct' ? <Sparkles className="w-8 h-8 fill-emerald-600" /> : <RotateCcw className="w-8 h-8" />}
                        {feedback === 'correct' ? 'ՃԻՇՏ Է! ԴՈՒ ԼԱՎ ԵՍ ՍՈՒԶՎՈՒՄ' : `ՍԽԱԼ Է! ՃԻՇՏԸ՝ "${currentTask.correct}"`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {gameState === 'won' && (
          <motion.div
            key="won"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 z-10 bg-[#0c4a6e]/90 backdrop-blur-2xl p-20 rounded-[4rem] shadow-2xl border-4 border-white/20 max-w-2xl"
          >
            <div className="relative inline-block">
              <Trophy className="w-40 h-40 text-yellow-400 mx-auto drop-shadow-[0_0_60px_rgba(251,191,36,0.6)]" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-blue-400/30 blur-[100px] rounded-full"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white">
                ¡TESORO gANADO!
              </h2>
              <div className="inline-block px-10 py-4 bg-yellow-500 text-[#0c4a6e] rounded-full font-black text-3xl shadow-xl">
                Score: {score} / {EXERCISES.length}
              </div>
              <p className="text-blue-200 font-bold text-2xl mt-8 leading-relaxed">
                Դուք հաղթահարեցիք օվկիանոսի բոլոր 20 փորձությունները: <br/>
                Գանձը ձերն է:
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-7 bg-white text-[#0c4a6e] rounded-full font-black text-2xl uppercase tracking-widest hover:bg-blue-200 transition-all active:scale-95 shadow-2xl"
            >
              Նորից Սկսել Արկածը
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Underwater Bubbles (Optional for extra feel) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ bottom: -20, left: Math.random() * 100 + '%' }}
            animate={{ bottom: '110%' }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'easeIn', delay: Math.random() * 5 }}
            className="absolute w-2 h-2 md:w-4 md:h-4 bg-white/20 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
}
